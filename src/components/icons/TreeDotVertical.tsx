import { AccessibleIcon } from '@radix-ui/react-accessible-icon';

export const TreeDotVerticalIcon = () => (
  <AccessibleIcon label="TreeDotVerticalIcon">
    <TreeDotVertical />
  </AccessibleIcon>
);

const TreeDotVertical = () => (
  <svg
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    className="bi bi-three-dots-vertical h-6 w-6 shrink-0"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
        fill="currentColor"
      ></path>
    </g>
  </svg>
);
