import { SideBarIcon } from './icons/SideBarIcon';
import { Button } from '@radix-ui/themes';

export default function TopNavSideBarButton() {
  return (
    <Button size="1" variant="ghost" radius="full" color="gray">
      <SideBarIcon />
    </Button>
  );
}
