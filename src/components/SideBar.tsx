'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

const SideBarContext = createContext<{
  isOpen: boolean;
  toggleSideBar: () => void;
} | null>(null);

const SideBarRoot: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSideBar = () => setIsOpen((prev) => !prev);
  return (
    <SideBarContext.Provider value={{ isOpen, toggleSideBar }}>
      <div className="relative">{children}</div>
    </SideBarContext.Provider>
  );
};

const SideBarButton: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const context = useContext(SideBarContext);
  if (!context)
    throw new Error('SideBarButton must be used within SideBarRoot');
  const { toggleSideBar } = context;
  return (
    <div
      onClick={toggleSideBar}
      className="flex cursor-pointer items-center justify-center py-2 text-[var(--gray-12)]"
    >
      {children}
    </div>
  );
};

interface SideBarContentProps {
  children: React.ReactNode;
  position?: 'left' | 'right';
}

const SideBarContent: React.FC<SideBarContentProps> = ({
  children,
  position,
}) => {
  const [width, setWidth] = useState('w-64');
  const context = useContext(SideBarContext);
  if (!context)
    throw new Error('SideBarContent must be used within SideBarRoot');
  const { isOpen, toggleSideBar } = context;
  const target = useRef<HTMLDivElement>(null);
  // const width = window.innerWidth <= 768 ? 'w-3/4' : 'w-64';
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      setWidth('w-3/4');
    }
  }, []);
  const hidden = position === 'left' ? '-translate-x-full' : 'translate-x-full';
  const pos = position === 'left' ? 'left-0' : 'right-0';
  return (
    <>
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${
          isOpen ? 'opacity-30' : 'pointer-events-none opacity-0'
        } z-40`}
        onClick={() => toggleSideBar()}
      />
      <div
        ref={target}
        className={`fixed ${pos} top-0 z-50 h-full ${width} transform bg-[var(--color-background)] p-5 shadow-lg transition-all duration-300 ${
          isOpen ? 'opacity-100' : `${hidden} opacity-0`
        }`}
      >
        {children}
      </div>
    </>
  );
};

const SideBar = {
  Root: SideBarRoot,
  Button: SideBarButton,
  Content: SideBarContent,
};

export default SideBar;
