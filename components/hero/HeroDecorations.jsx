'use client';

export default function HeroDecorations() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
      {/* Ambient Radial Lighting Nodes */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] sm:w-[1100px] h-[550px] bg-gradient-to-tr from-[#1D4ED8]/30 via-[#0D1B3E]/25 to-transparent blur-[140px] rounded-full" />
      <div className="absolute top-1/3 left-1/3 w-[120vw] h-[350px] bg-[#5CB2FF]/12 blur-[120px] rounded-full" />

      {/* SVG Doodle Background Sketch Accents */}
      <svg
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140vw] h-[650px] opacity-25"
        viewBox="0 0 1100 650"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Orbital Ellipse Guides */}
        <ellipse
          cx="550"
          cy="325"
          rx="520"
          ry="190"
          stroke="url(#orbitGradient)"
          strokeWidth="1.5"
          strokeDasharray="4 8"
          className="animate-[spin_90s_linear_infinite] origin-center"
        />
        <ellipse
          cx="550"
          cy="325"
          rx="380"
          ry="140"
          stroke="url(#orbitGradient2)"
          strokeWidth="1"
          strokeDasharray="2 6"
          className="animate-[spin_60s_linear_infinite_reverse] origin-center opacity-60"
        />

        {/* Decorative Compass Marks */}
        <circle cx="550" cy="135" r="3" fill="#5CB2FF" />
        <circle cx="550" cy="515" r="3" fill="#5CB2FF" />
        <circle cx="30" cy="325" r="3" fill="#5CB2FF" />
        <circle cx="1070" cy="325" r="3" fill="#5CB2FF" />

        <defs>
          <linearGradient id="orbitGradient" x1="0" y1="0" x2="1100" y2="650" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1D4ED8" stopOpacity="0.8" />
            <stop offset="0.5" stopColor="#5CB2FF" stopOpacity="0.4" />
            <stop offset="1" stopColor="#0D1B3E" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="orbitGradient2" x1="1100" y1="650" x2="0" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#5CB2FF" stopOpacity="0.6" />
            <stop offset="1" stopColor="#1D4ED8" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
