import React from "react";

interface IconCalenderProps {
  color?: string;
  strokeColor?: string;
  strokeWidth?: number;
}

export const IconCalender: React.FC<IconCalenderProps> = ({ 
  color = "#1C274C", 
  strokeColor = "#1C274C", 
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
      <path
        d="M8.175 3.66667C8.175 3.29848 7.87279 3 7.5 3C7.12721 3 6.825 3.29848 6.825 3.66667V5.07045C5.5296 5.1729 4.67919 5.42433 4.05442 6.0414C3.42964 6.65846 3.17506 7.49837 3.07133 8.77778H20.9287C20.8249 7.49837 20.5704 6.65846 19.9456 6.0414C19.3208 5.42433 18.4704 5.1729 17.175 5.07045V3.66667C17.175 3.29848 16.8728 3 16.5 3C16.1272 3 15.825 3.29848 15.825 3.66667V5.01147C15.2263 5 14.5551 5 13.8 5H10.2C9.44487 5 8.77374 5 8.175 5.01147V3.66667Z"
        fill={color}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21 12.1111V13.8889C21 17.2411 21 18.9172 19.9456 19.9586C18.8912 21 17.1941 21 13.8 21H10.2C6.80589 21 5.10883 21 4.05442 19.9586C3 18.9172 3 17.2411 3 13.8889V12.1111C3 11.3653 3 10.7025 3.01161 10.1111H20.9884C21 10.7025 21 11.3653 21 12.1111ZM16.05 17.4444C16.7956 17.4444 17.4 16.8475 17.4 16.1111C17.4 15.3747 16.7956 14.7778 16.05 14.7778C15.3044 14.7778 14.7 15.3747 14.7 16.1111C14.7 16.8475 15.3044 17.4444 16.05 17.4444Z"
        fill={color}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

IconCalender.displayName = "IconCalender";