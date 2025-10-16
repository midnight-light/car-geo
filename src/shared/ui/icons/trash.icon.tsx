import * as React from 'react';
import { cn } from '@/shared/lib/cn';

export interface TrashIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  title?: string;
  strokeWidth?: number | string;
}

export const TrashIcon = React.forwardRef<SVGSVGElement, TrashIconProps>(
  ({ className, size = 24, title, strokeWidth = 2, ...props }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(className)}
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      focusable="false"
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
      <path d="M3 6h18" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  ),
);

TrashIcon.displayName = 'TrashIcon';
