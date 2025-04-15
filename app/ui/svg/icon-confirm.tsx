import React from "react";

interface IconCheckCircleProps {
  color?: string;
  strokeColor?: string;
  strokeWidth?: number;
  flipped?: boolean;
}

export const IconCheckCircle: React.FC<IconCheckCircleProps> = ({
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
      style={{
        transition: "transform 0.2s ease",
      }}
    >
      <path
        d="M12 22C17.5229 22 22 17.5229 22 12C22 6.47714 17.5229 2 12 2C6.47714 2 2 6.47714 2 12C2 17.5229 6.47714 22 12 22Z"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
      <path
        d="M9 12L11 14L15 10"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

IconCheckCircle.displayName = "IconCheckCircle";
