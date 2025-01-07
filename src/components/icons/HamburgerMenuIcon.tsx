import { AccessibleIcon } from '@radix-ui/react-accessible-icon';

export const HamburgerMenuIcon = () => (
  <button type="button">
    <AccessibleIcon label="HamburgerMenuIcon">
      <HamburgerMenuIconSVG />
    </AccessibleIcon>
  </button>
);

const HamburgerMenuIconSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-menu size-5 cursor-pointer text-foreground"
  >
    <line x1="4" x2="20" y1="12" y2="12"></line>
    <line x1="4" x2="20" y1="6" y2="6"></line>
    <line x1="4" x2="20" y1="18" y2="18"></line>
  </svg>
);
