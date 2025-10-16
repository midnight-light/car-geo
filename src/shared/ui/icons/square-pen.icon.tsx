import * as React from 'react';
import { cn } from '@/shared/lib/cn';

export interface SquarePenIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  title?: string;
  strokeWidth?: number | string;
}

export const SquarePenIcon = React.forwardRef<SVGSVGElement, SquarePenIconProps>(
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
      <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
    </svg>
  ),
);

SquarePenIcon.displayName = 'SquareIcon';
