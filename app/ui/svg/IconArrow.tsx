import React from "react";

interface IconArrowProps {
  direction?: "left" | "right" | "up" | "down";
  className?: string;
  strokeWidth?: number;
}

export const IconArrow: React.FC<IconArrowProps> = ({
  direction = "right",
  className,
  strokeWidth = 2,
}) => {
  let rotate = 0;
  switch (direction) {
    case "left":
      rotate = 180;
      break;
    case "right":
    default:
      rotate = 0;
  }

  return (
    <svg
      className={className}
      style={{ transform: `rotate(${rotate}deg)` }}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
};
