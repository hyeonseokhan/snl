import React from 'react';
import Badge from '../components/Badge';

export default function HomePage() {
  return (
    <div className={`relative flex w-full flex-row`}>
      <Badge isInvisible={true}>
        <span className={`text-lg font-semibold`}>홈 페이지</span>
      </Badge>
    </div>
  );
}
