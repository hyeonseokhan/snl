import Link from 'next/link';

export default function Logo() {
  return (
    <div className="mx-3 select-none font-bold">
      <Link href="/" className="font-sans text-xl">
        SNL
      </Link>
    </div>
  );
}
