import React from "react";

interface IconUserMeetingProps {
  color?: string;
}

export const IconUserMeeting: React.FC<IconUserMeetingProps> = ({
  color = "#1C274C",
}) => {
  return (
    <svg
      style={{ width: 24, height: 24 }}
      viewBox="24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="6.75098" cy="4.5" r="3" fill={color} />
      <ellipse cx="6.75098" cy="12.751" rx="5.25" ry="3" fill={color} />
      <path
        d="M15.7498 12.7503C15.7498 13.9929 14.2232 15.0003 12.3592 15.0003C12.9084 14.4 13.286 13.6466 13.286 12.7513C13.286 11.855 12.9075 11.1009 12.3573 10.5003C14.2213 10.5003 15.7498 11.5076 15.7498 12.7503Z"
        fill={color}
      />
      <path
        d="M13.4998 4.50049C13.4998 5.74313 12.4925 6.75049 11.2498 6.75049C10.9789 6.75049 10.7191 6.70259 10.4785 6.6148C10.8333 5.99073 11.036 5.26885 11.036 4.49965C11.036 3.73102 10.8336 3.00964 10.4793 2.38589C10.7197 2.29828 10.9792 2.25049 11.2498 2.25049C12.4925 2.25049 13.4998 3.25785 13.4998 4.50049Z"
        fill={color}
      />
    </svg>
  );
};

IconUserMeeting.displayName = "IconUserMeeting";
