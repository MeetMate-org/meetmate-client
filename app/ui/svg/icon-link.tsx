import React from "react";

interface IconLinkProps {
  strokeColor?: string;
  strokeWidth?: number;
}

export const IconLink: React.FC<IconLinkProps> = ({
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
        d="M10.0503 13.9497C9.21653 13.116 8.75 12.1492 8.75 11.25C8.75 10.3508 9.21653 9.38397 10.0503 8.55025L13.0503 5.55025C14.717 3.88349 17.283 3.88349 18.9497 5.55025C20.6165 7.21651 20.6165 9.78349 18.9497 11.4503L17.5 12.9"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M13.9497 10.0503C14.7835 10.884 15.25 11.8508 15.25 12.75C15.25 13.6492 14.7835 14.616 13.9497 15.4497L10.9497 18.4497C9.28299 20.1165 6.71701 20.1165 5.05025 18.4497C3.38349 16.7835 3.38349 14.2165 5.05025 12.5497L6.5 11.1"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
};

IconLink.displayName = "IconLink";
