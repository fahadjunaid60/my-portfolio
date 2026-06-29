// The "orbit FJ" brand mark — crossing orbit rings around an F + J monogram.
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 200"
      fill="none"
      className={className}
      aria-hidden
      role="img"
    >
      <ellipse
        cx="110"
        cy="100"
        rx="100"
        ry="47"
        transform="rotate(-23 110 100)"
        stroke="var(--color-accent-violet)"
        strokeWidth="7"
      />
      <ellipse
        cx="110"
        cy="100"
        rx="100"
        ry="47"
        transform="rotate(27 110 100)"
        stroke="var(--color-accent-violet)"
        strokeWidth="4"
        strokeOpacity="0.4"
      />
      <g fill="#ffffff">
        <rect x="66" y="62" width="18" height="80" rx="3" />
        <rect x="66" y="62" width="44" height="18" rx="3" />
        <rect x="66" y="95" width="35" height="16" rx="3" />
      </g>
      <path
        d="M114 62 H132 V80 L114 92 Z M114 100 L132 88 V118 C132 139 118 151 98 151 C79 151 67 139 67 119 H87 C87 128 91 133 98 133 C106 133 114 128 114 118 Z"
        fill="#ffffff"
      />
    </svg>
  );
}
