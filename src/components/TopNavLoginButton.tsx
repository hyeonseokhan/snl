import { DiscordIcon } from './icons/DiscordIcon';
import { Button } from '@radix-ui/themes';

export default function TopNavLoginButton() {
  return (
    <Button size="2" variant="surface" color="gray" radius="full">
      <DiscordIcon />
      <span className="font-bold">디스코드 로그인</span>
    </Button>
  );
}
