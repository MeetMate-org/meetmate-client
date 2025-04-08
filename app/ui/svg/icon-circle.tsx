import React from "react";

interface IconCircleProps {
  filled?: boolean;
  color?: string;
  strokeColor?: string;
  strokeWidth?: number;
}

export const IconCircle: React.FC<IconCircleProps> = ({
  filled = false,
  color = "#5E00FF",
  strokeColor = "#5E00FF",
  strokeWidth = 1,
}) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="15"
        cy="15"
        r="14"
        fill={filled ? color : "#fff"}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

IconCircle.displayName = "IconCircle";
