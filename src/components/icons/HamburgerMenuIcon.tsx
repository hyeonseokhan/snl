import { AccessibleIcon } from '@radix-ui/react-accessible-icon';

export const HamburgerMenuIcon = () => {
  return (
    <AccessibleIcon label="HamburgerMenuIcon">
      <HamburgerMenuIconSVG />
    </AccessibleIcon>
  );
};

const HamburgerMenuIconSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-8 w-8 fill-[var(--gray-10)] stroke-[var(--gray-10)]"
    >
      <line x1="4" x2="20" y1="12" y2="12"></line>
      <line x1="4" x2="20" y1="6" y2="6"></line>
      <line x1="4" x2="20" y1="18" y2="18"></line>
    </svg>
  );
};
