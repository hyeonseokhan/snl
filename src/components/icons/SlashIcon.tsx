import { AccessibleIcon } from '@radix-ui/react-accessible-icon';

export const SlashIcon = () => {
  return (
    <AccessibleIcon label="SlashIcon">
      <SlashIconSVG />
    </AccessibleIcon>
  );
};

const SlashIconSVG = () => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      className="fill-[var(--gray-10)]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.10876 14L9.46582 1H10.8178L5.46074 14H4.10876Z"
        fillRule="evenodd"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};
