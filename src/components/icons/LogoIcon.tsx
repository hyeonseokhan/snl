import { useThemeColors } from '../UseThemeColors';
import { siteConfig } from '../../config/global';

export const LogoIcon = () => {
  const colors = useThemeColors();
  return (
    <span
      className="font-sans text-xl font-bold"
      style={{
        color: colors.activateColor,
      }}
    >
      {siteConfig.name}
    </span>
  );
};
