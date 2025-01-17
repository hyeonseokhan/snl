import { AccessibleIcon } from '@radix-ui/react-accessible-icon';

export const RaidIcon = ({ viewPage, target }) => {
  return (
    <AccessibleIcon label="RaidIcon">
      <RaidIconSVG isActive={viewPage === target} />
    </AccessibleIcon>
  );
};

const RaidIconSVG = ({ isActive }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${isActive ? 'fill-[var(--gray-12)] stroke-[var(--gray-12)]' : 'fill-[var(--gray-10)] stroke-[var(--gray-10)]'} h-8 w-8 transition-all duration-150`}
    >
      <polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"></polyline>
      <line x1="13" x2="19" y1="19" y2="13"></line>
      <line x1="16" x2="20" y1="16" y2="20"></line>
      <line x1="19" x2="21" y1="21" y2="19"></line>
      <polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5"></polyline>
      <line x1="5" x2="9" y1="14" y2="18"></line>
      <line x1="7" x2="4" y1="17" y2="20"></line>
      <line x1="3" x2="5" y1="19" y2="21"></line>
    </svg>
  );
};
