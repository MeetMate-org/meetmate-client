import React from "react";

interface IconClockProps {
  circleColor?: string;
  handColor?: string;
}

export const IconClock: React.FC<IconClockProps> = ({
  circleColor = "#1C274C",
  handColor = "white",
}) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.5 9C16.5 13.1421 13.1421 16.5 9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5C13.1421 1.5 16.5 4.85786 16.5 9Z"
        fill={circleColor}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 5.4375C9.31066 5.4375 9.5625 5.68934 9.5625 6V8.767L11.2727 10.4773C11.4924 10.6969 11.4924 11.0531 11.2727 11.2727C11.0531 11.4924 10.6969 11.4924 10.4773 11.2727L8.60225 9.39775C8.49676 9.29226 8.4375 9.14918 8.4375 9V6C8.4375 5.68934 8.68934 5.4375 9 5.4375Z"
        fill={handColor}
      />
    </svg>
  );
};

IconClock.displayName = "IconClock";
