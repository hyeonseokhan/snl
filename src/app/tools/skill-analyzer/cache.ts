'use client';

const CACHE_DB_NAME = 'lostarkCacheDB';
const CACHE_STORE = 'armories';
const CACHE_VERSION = 1;
const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes
const MAX_CACHE_ENTRIES = 50; // optional cap & prune

/**
 * IndexedDB 데이터베이스를 엽니다.
 * 데이터베이스나 객체 저장소(object store)가 없으면 생성합니다.
 * @returns IDBDatabase 인스턴스를 담은 Promise
 */
function openArmoryDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(CACHE_DB_NAME, CACHE_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(CACHE_STORE)) {
        const store = db.createObjectStore(CACHE_STORE, { keyPath: 'name' });
        store.createIndex('timestamp', 'timestamp', { unique: false });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

/**
 * IndexedDB에서 캐릭터 이름으로 캐시된 데이터를 조회합니다.
 * @param name 조회할 캐릭터 이름
 * @returns 캐시된 데이터 또는 null을 담은 Promise
 */
async function idbGetArmory(name: string): Promise<any | null> {
  const db = await openArmoryDB();
  return new Promise<any | null>((resolve, reject) => {
    const tx = db.transaction(CACHE_STORE, 'readonly');
    const store = tx.objectStore(CACHE_STORE);
    const getReq = store.get(name);
    getReq.onsuccess = () => resolve(getReq.result || null);
    getReq.onerror = () => reject(getReq.error);
  });
}

/**
 * 현재 저장된 캐시 항목의 총 개수를 반환합니다.
 * @param db IDBDatabase 인스턴스
 * @returns 캐시 항목 개수를 담은 Promise
 */
async function idbCountArmories(db: IDBDatabase): Promise<number> {
  return new Promise<number>((resolve) => {
    const tx = db.transaction(CACHE_STORE, 'readonly');
    const store = tx.objectStore(CACHE_STORE);
    const countReq = store.count();
    countReq.onsuccess = () => resolve(countReq.result || 0);
    countReq.onerror = () => resolve(0);
  });
}

/**
 * 캐시 항목의 개수가 최대치를 초과하면 가장 오래된 항목부터 삭제합니다.
 * @param db IDBDatabase 인스턴스
 */
async function idbPruneIfNeeded(db: IDBDatabase): Promise<void> {
  const total = await idbCountArmories(db);
  if (total < MAX_CACHE_ENTRIES) return;
  await new Promise<void>((resolve) => {
    const tx = db.transaction(CACHE_STORE, 'readwrite');
    const store = tx.objectStore(CACHE_STORE);
    const index = store.index('timestamp');
    const cursorReq = index.openCursor(); // ascending by timestamp (oldest first)
    let removed = 0;
    cursorReq.onsuccess = () => {
      const cursor = cursorReq.result;
      if (cursor && removed < total - (MAX_CACHE_ENTRIES - 1)) {
        cursor.delete();
        removed += 1;
        cursor.continue();
      } else {
        resolve();
      }
    };
    cursorReq.onerror = () => resolve();
  });
}

/**
 * IndexedDB에 캐릭터 데이터를 저장하기 전에, 최대 캐시 항목 수를 넘지 않도록 오래된 항목을 정리합니다.
 * @param name 저장할 캐릭터 이름
 * @param data 저장할 캐릭터 데이터
 */
async function idbPutArmory(name: string, data: any): Promise<void> {
  const db = await openArmoryDB();
  await idbPruneIfNeeded(db);
  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction(CACHE_STORE, 'readwrite');
    const store = tx.objectStore(CACHE_STORE);
    const putReq = store.put({ name, data, timestamp: Date.now() });
    putReq.onsuccess = () => resolve();
    putReq.onerror = () => reject(putReq.error);
  });
}

/**
 * IndexedDB에서 유효 기간이 지나지 않은 캐릭터 데이터를 조회합니다.
 * @param name 조회할 캐릭터 이름
 * @param maxAge 캐시의 최대 유효 시간 (밀리초)
 * @returns 유효한 캐시 데이터 또는 null을 담은 Promise
 */
export async function getCachedArmory(
  name: string,
  maxAge = CACHE_DURATION_MS,
): Promise<any | null> {
  try {
    const item = await idbGetArmory(name);
    if (item && typeof item.timestamp === 'number') {
      if (Date.now() - item.timestamp < maxAge) return item.data;
    }
  } catch (e) {
    console.warn('[cache] IndexedDB read failed', e);
  }
  return null;
}

/**
 * IndexedDB에 캐릭터 데이터를 저장(put)합니다.
 * @param name 저장할 캐릭터 이름
 * @param data 저장할 데이터
 */
export async function setCachedArmory(name: string, data: any): Promise<void> {
  try {
    await idbPutArmory(name, data);
  } catch (e) {
    console.warn('[cache] IndexedDB write failed (skip cache)', e);
  }
}
