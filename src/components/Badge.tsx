import React from 'react';

type BadgeProps = {
  children: React.ReactNode | string | number;
  isInvisible?: boolean;
};

const Badge = ({ children, isInvisible = true }: BadgeProps) => {
  const _isInvisible = isInvisible ? '' : 'hidden';
  return (
    <div className="relative z-10">
      {children}
      <div
        className={`absolute ${_isInvisible} -right-[10px] top-[2px] h-2 w-2 rounded-full bg-red-600`}
      ></div>
    </div>
  );
};

export default Badge;
