/**
 * App Store and Google Play Badge Components
 * 
 * SVG badges for app store downloads
 */

export function AppStoreBadge({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 155 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Download on the App Store"
      role="img"
    >
      {/* Badge background with rounded corners */}
      <rect
        x="0.5"
        y="0.5"
        width="154"
        height="44"
        rx="6"
        fill="#000000"
      />
      <rect
        x="0.5"
        y="0.5"
        width="154"
        height="44"
        rx="6"
        stroke="rgba(255,255,255,0.1)"
      />
      
      {/* Apple logo */}
      <path
        d="M20 12C20 10.8954 20.8954 10 22 10C23.1046 10 24 10.8954 24 12C24 13.1046 23.1046 14 22 14C20.8954 14 20 13.1046 20 12Z"
        fill="white"
      />
      <path
        d="M22 16L28 26H16L22 16Z"
        fill="white"
      />
      
      {/* "Download on the" text */}
      <text
        x="35"
        y="18"
        fill="white"
        fontSize="10"
        fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif"
        fontWeight="400"
      >
        Download on the
      </text>
      
      {/* "App Store" text */}
      <text
        x="35"
        y="32"
        fill="white"
        fontSize="16"
        fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif"
        fontWeight="600"
        letterSpacing="0.5px"
      >
        App Store
      </text>
    </svg>
  );
}

export function GooglePlayBadge({ className, disabled = false }: { className?: string; disabled?: boolean }) {
  return (
    <svg
      className={className}
      viewBox="0 0 155 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Get it on Google Play"
      role="img"
      style={{ opacity: disabled ? 0.4 : 1, cursor: disabled ? 'not-allowed' : 'pointer' }}
    >
      {/* Badge background with rounded corners */}
      <rect
        x="0.5"
        y="0.5"
        width="154"
        height="44"
        rx="6"
        fill="#000000"
      />
      <rect
        x="0.5"
        y="0.5"
        width="154"
        height="44"
        rx="6"
        stroke="rgba(255,255,255,0.1)"
      />
      
      {/* Google Play triangle icon */}
      <path
        d="M12 10L22 22.5L12 35V10Z"
        fill="#00D9FF"
      />
      <path
        d="M12 10L22 22.5L32 10H12Z"
        fill="#00F0A0"
      />
      <path
        d="M22 22.5L32 35H12L22 22.5Z"
        fill="#FFD23F"
      />
      <path
        d="M12 35L22 22.5L32 35H12Z"
        fill="#FF3838"
      />
      
      {/* "Get it on" text */}
      <text
        x="40"
        y="18"
        fill="white"
        fontSize="10"
        fontFamily="Roboto, Arial, sans-serif"
        fontWeight="400"
      >
        Get it on
      </text>
      
      {/* "Google Play" text */}
      <text
        x="40"
        y="32"
        fill="white"
        fontSize="16"
        fontFamily="Roboto, Arial, sans-serif"
        fontWeight="600"
        letterSpacing="0.5px"
      >
        Google Play
      </text>
    </svg>
  );
}

