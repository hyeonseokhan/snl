import { siteConfig } from '../../config/global';

export const LogoIcon = () => {
  return (
    <span className="font-sans text-xl font-bold text-[var(--gray-12)]">
      {siteConfig.name}
    </span>
  );
};
