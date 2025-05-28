import React from 'react'

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export const PlusIcon: React.FC<IconProps> = ({ className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M12 4v16m8-8H4" />
  </svg>
)