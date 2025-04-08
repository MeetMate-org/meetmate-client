import React from "react";

interface IconLogoProps {
  color?: string;
  width?: number | string;
  height?: number | string;
}

export const IconLogo: React.FC<IconLogoProps> = ({
  color = "#5E00FF",
  width = "50",
  height = "50",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <mask
        id="mask0_430_368"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="50"
        height="50"
      >
        <circle cx="25" cy="25" r="25" fill="url(#pattern0_430_368)" />
      </mask>
      <g mask="url(#mask0_430_368)">
        <circle cx="25" cy="25" r="25" fill={color} />
      </g>
      <defs>
        <pattern
          id="pattern0_430_368"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0_430_368"
            transform="matrix(0.00212288 0 0 0.0022534 -0.131884 0.0861163)"
          />
        </pattern>
        <image
          id="image0_430_368"
          width="572"
          height="336"
          preserveAspectRatio="none"
          xlinkHref="data:image/png;base64,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DhMenfnwq//H104QkSLaTQ3YHH+H0mEQnRITHh3aJP+EHrQqHQYRGYrEDvtfsb1xA6s7pEpMeHSo/sgqscr3G6XDICIDqbLfh1V7nmGyQ6rFhEenNje/zltbRBQTTdYPOG+HVI8nqM5dkPGCHCIWKB0GEelUi3kTnj04nWMJqR4rPDr3ryOLRausVToMItKhdlMD1sX/SukwiILChMcAnjkylg8lJKKI8gonNsYvwY6dG1ndIU1gwmMQfz9SwqSHiCLCJdqwIe4mbNr1CZMd0gwmPAayDNdyuToR9YpXOLEp7nauyCLN4QlrMIUZU+UZ+AeSRJ7SoRCRxjjEAWyMvw3rd/O1EaQ9PGkNanHmFzID45QOg4g0wiEOYF3CL3gbizSLJ66BMekhomC0mDdhXfyvOEGZNI0nr8Gdk/mILMHVSodBRCrVZP0Ar+9fyLGCNI8nMWFav9/K4eJHnNdDRN+Qwotd1tfwr6afcJwgXeCJTN9YnPmlzMBYpcMgIoW1mxqwMX4J5+uQrvBkpv8wIePHcry4A3akKx0KEcWYB91osD2LndZXULOrkuMD6QpPaPqOwoyp8izxKpMeIgNxiAPYav9vrN77LMcF0iWe2HRaF2S8IPPF2bAgXulQiChKPOjGXts/UWN9nFUd0jWe3BTQJZnvyjzMVjoMIoqwQ5bl2Gr/b2zbtZJjAekeT3IKyvCMeXKsuAV9MRomWJQOh4jCJIUXh82rUGf9BzbseYtjABkGT3YKyYSMH8sR4mdIQ5HSoRBRiNpNDai3PY0v9z7Eaz8ZDk96CktZxkJZKC5HNiZzjg+RinnQjWbLetRansLGvW/zmk+GxZOfeqUsY6EcIX6G48/v4elEpB4SLebNqLU8hTX7nuMfJxke/wgoIgozpsp8zEOumI50DGfVh0gBHnSj3VyDw6Y12Gt9B9W7V/EaT/Q1/jFQxPF2F1Fsnbht1WT+CMv3PczrOtEp8A+DoqosY6EcJM5DEvKQjlImQEQR4BJt6DTtQqtpO74yreYtK6Ig8I+EYqY8c5HMxjQMwBzEI4vL24lCIIUXHWIXjpjXMckhCgP/YEgx5ZmLpBUpSMZA2JCKJOTDjhRYkQIAiEcG7EgDT1PSMym86MZheIQDAOBGB1yiHQ5TE1w4hk6xFw7TfnSLw9i+ZzX/GIjCxD8eUp3SzHOk/eukJ1qEiMypH6ntRFIkY1Lj/gGRj0st23OJDi4dJyIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIqKw/X8ZS+JhP4QyBgAAAABJRU5ErkJggg=="
        />
      </defs>
    </svg>
  );
};
