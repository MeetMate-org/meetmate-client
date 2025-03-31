import React from "react";

interface IconUserMeetingProps {
  color?: string;
  strokeColor?: string;
  strokeWidth?: number;
}

export const IconUserMeeting: React.FC<IconUserMeetingProps> = ({
  color = "#1C274C",
  strokeColor = "#21334C", 
  strokeWidth = 1.5 
}) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="6.75" cy="4.5" r="3" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} />
      <ellipse cx="6.75" cy="12.75" rx="5.25" ry="3" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} />
      <path
        d="M15.75 12.75C15.75 13.993 14.223 15 12.359 15C12.908 14.4 13.286 13.647 13.286 12.751C13.286 11.855 12.908 11.101 12.357 10.5C14.221 10.5 15.75 11.508 15.75 12.75Z"
        fill={color}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
      <path
        d="M13.5 4.5C13.5 5.743 12.493 6.75 11.25 6.75C10.979 6.75 10.719 6.703 10.479 6.615C10.833 5.991 11.036 5.269 11.036 4.5C11.036 3.731 10.834 3.01 10.479 2.386C10.72 2.298 10.979 2.25 11.25 2.25C12.493 2.25 13.5 3.258 13.5 4.5Z"
        fill={color}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

IconUserMeeting.displayName = "IconUserMeeting";
