import React from 'react';

interface IconTeamProps {
  color?: string;
}

export const IconTeam: React.FC<IconTeamProps> = ({ color = '#6B7280' }) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 6C13 7.65685 11.6569 9 10 9C8.34315 9 7 7.65685 7 6C7 4.34315 8.34315 3 10 3C11.6569 3 13 4.34315 13 6Z" fill={color} />
      <path d="M18 8C18 9.10457 17.1046 10 16 10C14.8954 10 14 9.10457 14 8C14 6.89543 14.8954 6 16 6C17.1046 6 18 6.89543 18 8Z" fill={color} />
      <path d="M6 8C6 9.10457 5.10457 10 4 10C2.89543 10 2 9.10457 2 8C2 6.89543 2.89543 6 4 6C5.10457 6 6 6.89543 6 8Z" fill={color} />
      <path d="M14 15C14 12.7909 12.2091 11 10 11C7.79086 11 6 12.7909 6 15V17H14V15Z" fill={color} />
      <path d="M18 17V15C18 13.9459 17.7282 12.9527 17.2507 12.0909C17.7346 11.9074 18.2558 11.8 18.8 11.8C20.5673 11.8 22 13.2327 22 15V17H18Z" fill={color} />
      <path d="M2 17V15C2 13.9459 2.27182 12.9527 2.74926 12.0909C2.26539 11.9074 1.74422 11.8 1.2 11.8C-0.567316 11.8 -2 13.2327 -2 15V17H2Z" fill={color} />
    </svg>
  );
}; 