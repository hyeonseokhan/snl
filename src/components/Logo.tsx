import Link from 'next/link';
import { useThemeColors } from './UseThemeColors';

export default function Logo() {
  const colors = useThemeColors();
  return (
    <div className="mx-3 select-none font-bold">
      <Link
        href="/"
        className="font-sans text-xl"
        style={{ color: colors.activateColor }}
      >
        SNL
      </Link>
    </div>
  );
}
