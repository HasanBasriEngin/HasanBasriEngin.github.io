interface IconProps {
  className?: string;
}

export function GitHubIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.05-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22 0 1.6-.01 2.9-.01 3.29 0 .32.21.7.82.58A12 12 0 0 0 24 12.5C24 5.87 18.63.5 12 .5Z" />
    </svg>
  );
}

// LinkedIn kept in its brand blue.
export function LinkedInIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="#0A66C2"
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

// Gmail-style envelope: pale body, blue/green legs, bold red centre "M".
export function MailIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <rect
        x="1.5"
        y="3.5"
        width="21"
        height="17"
        rx="3"
        fill="#ffffff"
        fillOpacity="0.32"
      />
      <path d="M3 6v12h4V9.5L12 16.5l5-7V18h4V6L12 12.5z" fill="#EA4335" />
      <path d="M3 6v12h4V9.5z" fill="#4285F4" />
      <path d="M21 6v12h-4V9.5z" fill="#34A853" />
    </svg>
  );
}

export function ArrowIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3.5 10.5 10.5 3.5M4.5 3.5h6v6" />
    </svg>
  );
}

// Hack The Box mark, kept in the brand green so it stays legible on the
// tinted row background (and doesn't blend on hover).
export function HtbIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#9FEF00"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2.3 3.4 7v10L12 21.7 20.6 17V7L12 2.3Z" />
      <path d="M12 12 3.7 7.2M12 12l8.3-4.8M12 12v9.4" />
    </svg>
  );
}

// Ankara Bilim Üniversitesi mark: nested navy triangles (#1f2937) with a
// grey centre (#888888), on a small white chip so it reads on the dark page.
export function UniIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="15"
      height="15"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <rect x="0" y="0" width="24" height="24" rx="6" fill="#ffffff" />
      <path
        d="M12 3.2 20.66 18.2H3.34Z"
        fill="none"
        stroke="#1f2937"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M12 7.2 17.2 16.2H6.8Z"
        fill="none"
        stroke="#1f2937"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M12 10.2 14.6 14.7H9.4Z" fill="#888888" />
    </svg>
  );
}

export function BoltIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M8.5 1.5 3 9h4l-.5 5.5L12 7H8l.5-5.5Z" />
    </svg>
  );
}
