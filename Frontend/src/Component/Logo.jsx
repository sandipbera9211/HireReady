const Logo = ({
  size = 48,
  showText = true,
  showTagline = false,
  className = "",
}) => {
  const s = size;
  const nameFontSize = Math.max(18, s * 0.5);
  const tagFontSize  = Math.max(9,  s * 0.18);
  const gap          = Math.max(6,  s * 0.2);

  return (
    <div
      className={`inline-flex items-center ${className}`}
      style={{ gap: `${gap}px` }}
    >
      {/* ── Icon ── */}
      <svg
        width={s}
        height={s}
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="bgGrad" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#6d28d9" />
            <stop offset="100%" stopColor="#4c1d95" />
          </linearGradient>
          <linearGradient id="sparkGrad" x1="42" y1="56" x2="62" y2="28" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#e879f9" />
          </linearGradient>
        </defs>

        {/* Rounded square background */}
        <rect width="80" height="80" rx="20" fill="url(#bgGrad)" />

        {/* Subtle inner glow ring */}
        <rect width="80" height="80" rx="20" fill="none" stroke="white" strokeOpacity="0.08" strokeWidth="1.5" />

        {/* Document body */}
        <rect x="18" y="12" width="30" height="40" rx="5" fill="white" fillOpacity="0.95" />

        {/* Document fold corner */}
        <path d="M38 12 L48 22 L38 22 Z" fill="#6d28d9" fillOpacity="0.25" />
        <path d="M38 12 L48 22" stroke="white" strokeOpacity="0.4" strokeWidth="1" />

        {/* Name line */}
        <line x1="24" y1="29" x2="40" y2="29" stroke="#6d28d9" strokeWidth="2.5" strokeLinecap="round" />

        {/* Body lines */}
        <line x1="24" y1="36" x2="40" y2="36" stroke="#c4b5fd" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="24" y1="42" x2="37" y2="42" stroke="#c4b5fd" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="24" y1="48" x2="33" y2="48" stroke="#ddd6fe" strokeWidth="1.5" strokeLinecap="round" />

        {/* Rising spark — gradient violet → fuchsia */}
        <polyline
          points="40,62 47,50 53,55 62,36"
          fill="none"
          stroke="url(#sparkGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Arrow head at peak */}
        <polyline
          points="57,33 62,36 60,42"
          fill="none"
          stroke="url(#sparkGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Glow dot at peak */}
        <circle cx="62" cy="36" r="4.5" fill="#e879f9" fillOpacity="0.35" />
        <circle cx="62" cy="36" r="2.5" fill="#f0abfc" />
      </svg>

      {/* ── Wordmark ── */}
      {showText && (
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
          <span
            style={{
              fontFamily: "'Syne', 'Georgia', serif",
              fontSize: `${nameFontSize}px`,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#f3f0ff",
              lineHeight: 1,
            }}
          >
            Hire
            <span style={{
              background: "linear-gradient(90deg, #a78bfa, #e879f9)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Ready
            </span>
          </span>

          {showTagline && (
            <span
              style={{
                fontFamily: "system-ui, sans-serif",
                fontSize: `${tagFontSize}px`,
                fontWeight: 400,
                color: "#7c6faa",
                marginTop: "4px",
                letterSpacing: "0.03em",
              }}
            >
              Resume · Mock Interview · Prep Plan
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Logo;