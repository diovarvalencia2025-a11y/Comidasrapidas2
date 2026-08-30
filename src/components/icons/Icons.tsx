import React from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
}

/**
 * Signature Canger Burger Arc Glyph
 * Stylized iconic arc-top bun with grill layer and bottom bun
 */
export function BurgerGlyph({ className = 'w-6 h-6', size, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      {...props}
    >
      {/* Top Bun Arc */}
      <path
        d="M6 19C6 11.268 12.268 5 20 5C27.732 5 34 11.268 34 19C34 19.5523 33.5523 20 33 20H7C6.44772 20 6 19.5523 6 19Z"
        fill="currentColor"
      />
      {/* Grill Patty Layer with crisp edges */}
      <path
        d="M5 23.5C5 22.6716 5.67157 22 6.5 22H33.5C34.3284 22 35 22.6716 35 23.5C35 24.3284 34.3284 25 33.5 25H6.5C5.67157 25 5 24.3284 5 23.5Z"
        fill="currentColor"
      />
      {/* Bottom Bun */}
      <path
        d="M7 27.5C7 26.9477 7.44772 26.5 8 26.5H32C32.5523 26.5 33 26.9477 33 27.5C33 31.0899 30.0899 34 26.5 34H13.5C9.91015 34 7 31.0899 7 27.5Z"
        fill="currentColor"
      />
      {/* Sesame Seeds / Crisp Specks */}
      <circle cx="14" cy="11.5" r="1" fill="#009ca6" />
      <circle cx="20" cy="9.5" r="1.1" fill="#009ca6" />
      <circle cx="26" cy="12" r="1" fill="#009ca6" />
    </svg>
  );
}

/**
 * Hand-crafted Shopping Cart Icon
 */
export function CartIcon({ className = 'w-5 h-5', size, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      {...props}
    >
      <circle cx="9" cy="20" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="18" cy="20" r="1.5" fill="currentColor" stroke="none" />
      <path d="M2.5 3.5H5.2L7.3 15.2C7.4 15.8 7.9 16.2 8.5 16.2H18.2C18.8 16.2 19.3 15.8 19.4 15.2L21.2 6.5H6.2" />
    </svg>
  );
}

/**
 * Hand-crafted Search Icon
 */
export function SearchIcon({ className = 'w-5 h-5', size, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      {...props}
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M20.5 20.5L16 16" />
    </svg>
  );
}

/**
 * Hand-crafted Caret Down Icon
 */
export function CaretDownIcon({ className = 'w-4 h-4', size, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      {...props}
    >
      <path d="M6 9L12 15L18 9" />
    </svg>
  );
}

/**
 * Hand-crafted Caret Left Icon
 */
export function CaretLeftIcon({ className = 'w-4 h-4', size, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      {...props}
    >
      <path d="M15 18L9 12L15 6" />
    </svg>
  );
}

/**
 * Hand-crafted Caret Right Icon
 */
export function CaretRightIcon({ className = 'w-4 h-4', size, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      {...props}
    >
      <path d="M9 18L15 12L9 6" />
    </svg>
  );
}

/**
 * Hand-crafted Down Arrow Navigation / Scroll Hint
 */
export function ArrowDownIcon({ className = 'w-5 h-5', size, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      {...props}
    >
      <path d="M12 4V20M12 20L6 14M12 20L18 14" />
    </svg>
  );
}

/**
 * Hand-crafted Instagram Icon
 */
export function InstagramIcon({ className = 'w-5 h-5', size, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      {...props}
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

/**
 * Hand-crafted Facebook Icon
 */
export function FacebookIcon({ className = 'w-5 h-5', size, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      {...props}
    >
      <path d="M22 12.061C22 6.505 17.523 2 12 2S2 6.505 2 12.061C2 17.083 5.657 21.245 10.438 22V14.969H7.898V12.061H10.438V9.845C10.438 7.323 11.931 5.939 14.215 5.939C15.309 5.939 16.453 6.136 16.453 6.136V8.621H15.191C13.95 8.621 13.562 9.398 13.562 10.197V12.061H16.336L15.893 14.969H13.562V22C18.343 21.245 22 17.083 22 12.061Z" />
    </svg>
  );
}

/**
 * Hand-crafted YouTube Icon
 */
export function YouTubeIcon({ className = 'w-5 h-5', size, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      {...props}
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

/**
 * Hand-crafted Close / Dismiss Icon
 */
export function CloseIcon({ className = 'w-5 h-5', size, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      {...props}
    >
      <path d="M18 6L6 18M6 6L18 18" />
    </svg>
  );
}

/**
 * Hand-crafted Checkmark Icon
 */
export function CheckIcon({ className = 'w-5 h-5', size, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      {...props}
    >
      <path d="M20 6L9 17L4 12" />
    </svg>
  );
}

/**
 * Hand-crafted Plus Icon
 */
export function PlusIcon({ className = 'w-4 h-4', size, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      {...props}
    >
      <path d="M12 5V19M5 12H19" />
    </svg>
  );
}

/**
 * Hand-crafted Video Camera Icon
 */
export function VideoCameraIcon({ className = 'w-5 h-5', size, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      {...props}
    >
      <path d="M15 10L20.5 6.5V17.5L15 14" />
      <rect x="2.5" y="6" width="13" height="12" rx="3" />
    </svg>
  );
}

/**
 * Hand-crafted Upload Cloud / Arrow Icon
 */
export function UploadIcon({ className = 'w-5 h-5', size, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      {...props}
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

/**
 * Hand-crafted Refresh / Replay Icon
 */
export function RefreshIcon({ className = 'w-5 h-5', size, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      {...props}
    >
      <polyline points="23 4 23 10 17 10" />
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
    </svg>
  );
}

/**
 * Hand-crafted Minus Icon
 */
export function MinusIcon({ className = 'w-4 h-4', size, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      {...props}
    >
      <path d="M5 12H19" />
    </svg>
  );
}

/**
 * Hand-crafted Star Icon
 */
export function StarIcon({ className = 'w-4 h-4', size, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      {...props}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

/**
 * Hand-crafted Arrow Up Icon
 */
export function ArrowUpIcon({ className = 'w-5 h-5', size, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      {...props}
    >
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="5 12 12 5 19 12" />
    </svg>
  );
}

