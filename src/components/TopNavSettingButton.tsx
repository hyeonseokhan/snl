import { Button } from '@radix-ui/themes';
import { TreeDotVerticalIcon } from './icons/TreeDotVertical';

export default function TopNavSettingButton() {
  return (
    <Button size="1" variant="ghost" color="gray" radius="full">
      <TreeDotVerticalIcon />
    </Button>
  );
}
