import Link from 'next/link';
import { LogoIcon } from './icons/LogoIcon';

export default function LogoButton() {
  return (
    <div className="mx-3 select-none">
      <Link href="/">
        <LogoIcon />
      </Link>
    </div>
  );
}
