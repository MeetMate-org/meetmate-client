import React from "react";

interface IconLogoutProps {
  color?: string;
  strokeColor?: string;
  strokeWidth?: number;
}

export const IconLogout: React.FC<IconLogoutProps> = ({
  color = "#21334C",
  strokeColor = "#21334C",
  strokeWidth = 1.5,
}) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.75 15.75L19.5 12M19.5 12L15.75 8.25M19.5 12H10.5M12.75 4.5H6.375C5.75368 4.5 5.25 5.00368 5.25 5.625V18.375C5.25 18.9963 5.75368 19.5 6.375 19.5H12.75"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={color}
      />
    </svg>
  );
};

IconLogout.displayName = "IconLogout";
