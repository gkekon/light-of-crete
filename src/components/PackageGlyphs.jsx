const olive = '#4A5140';
const gold = '#B89B64';

const glyphs = {
  'essential-session': (
    <>
      {/* sunrise over the sea, a gull passing by */}
      <path d="M24 12.8v3" stroke={olive} />
      <path d="M16.8 15.9l2.2 2.2" stroke={olive} />
      <path d="M31.2 15.9l-2.2 2.2" stroke={olive} />
      <path d="M11.8 22.4h3" stroke={olive} />
      <path d="M33.2 22.4h3" stroke={olive} />
      <path d="M17.2 28.4a6.8 6.8 0 0 1 13.6 0" stroke={gold} />
      <path d="M8.5 13.2c.9-1 1.9-1 2.8 0c.9-1 1.9-1 2.8 0" stroke={olive} opacity="0.7" />
      <path d="M8 32.2c2.7-2.5 5.3-2.5 8 0s5.3 2.5 8 0 5.3-2.5 8 0 5.3 2.5 8 0" stroke={olive} />
      <path d="M16 37.6c2.7-2.3 5.3-2.3 8 0s5.3 2.3 8 0" stroke={olive} opacity="0.55" />
    </>
  ),
  'signature-story': (
    <>
      {/* a leafy branch with alternating leaves — the island's signature */}
      <path
        d="M10 38c6-5 14-13 20.5-20.5 1.3-1.5 2.5-3.1 3.5-4.9"
        stroke={olive}
      />
      <path d="M13.5 35.1Q10 34.9 7.8 37.6Q11.3 37.8 13.5 35.1Z" stroke={olive} />
      <path d="M17.8 31.4Q21.35 33.9 23.9 33.2Q20.35 30.7 17.8 31.4Z" stroke={olive} />
      <path d="M22 27.4Q18.2 25.6 16.4 22.4Q20 23.9 22 27.4Z" stroke={olive} />
      <path d="M25.9 23.2Q29.4 26.2 31.6 26.4Q28.5 22.9 25.9 23.2Z" stroke={olive} />
      <path d="M29.3 19Q25.9 16.4 24.4 13.9Q27.9 15.9 29.3 19Z" stroke={olive} />
      <path d="M31.9 15.6Q34.9 14.2 35.8 10.6Q32.3 12.1 31.9 15.6Z" stroke={olive} />
      <circle cx="15.9" cy="33.2" r="1.25" fill={gold} stroke="none" />
      <circle cx="24" cy="25.3" r="1.25" fill={gold} stroke="none" />
      <circle cx="30.6" cy="17.4" r="1.25" fill={gold} stroke="none" />
    </>
  ),
  'island-story': (
    <>
      {/* a journey to a little palm island */}
      <circle cx="8.5" cy="27.4" r="1.6" fill={olive} stroke="none" />
      <path d="M11.1 26.4c4.4-3.4 8.6-3.2 13 -.6" stroke={gold} strokeDasharray="0.1 4.2" />
      <path d="M25 35a8.4 4 0 0 1 16.8 0Z" stroke={olive} />
      <path d="M33.5 34.6C32.6 28 32.4 21.6 33.2 15.4" stroke={olive} />
      <path d="M33.2 15.4Q23 13.4 20.4 20" stroke={olive} />
      <path d="M33.2 15.4Q24.8 16.8 21.8 22.6" stroke={olive} />
      <path d="M33.2 15.4Q28 9.6 24.4 8.6" stroke={olive} />
      <path d="M33.2 15.4Q33 10.4 33.6 7.6" stroke={olive} />
      <path d="M33.2 15.4Q38 9.6 42.2 9.2" stroke={olive} />
      <path d="M33.2 15.4Q41.2 13.2 45 16.6" stroke={olive} />
      <path d="M33.2 15.4Q42.8 16.8 44.8 22.8" stroke={olive} />
      <circle cx="31.7" cy="17.6" r="0.95" fill={gold} stroke="none" />
      <circle cx="34.5" cy="17.9" r="0.95" fill={gold} stroke="none" />
      <path d="M6 39c2.3-2.1 4.6-2.1 6.9 0s4.6 2.1 6.9 0" stroke={olive} opacity="0.55" />
    </>
  ),
  'photo-video-experience': (
    <>
      {/* a phone with a sketched woman's profile, leaves behind */}
      <path d="M30.8 12.3c2.4-2.4 5.4-3.3 8.6-2.6" stroke={olive} opacity="0.6" />
      <path d="M31.2 14.4c2.8-1.6 5.8-1.5 8.6.1" stroke={olive} opacity="0.6" />
      <rect x="16.75" y="11.75" width="14.5" height="24.5" rx="4.25" stroke={olive} />
      <path d="M22.6 14.8h2.8" stroke={olive} opacity="0.6" />
      {/* sketched woman: head, flowing hair, shoulders */}
      <circle cx="24" cy="20.4" r="3.5" stroke={gold} />
      <path d="M20.7 19.1c-.7-3 1.3-5.6 3.3-5.6s4 2.6 3.3 5.6" stroke={gold} />
      <path d="M20.9 21.7c-1 2.2-1.2 4.6-.7 7" stroke={gold} />
      <path d="M27.1 21.7c1 2.2 1.2 4.6.7 7" stroke={gold} />
      <path d="M19.6 33.2c.7-3 2.6-4.7 4.4-4.7s3.7 1.7 4.4 4.7" stroke={gold} />
    </>
  ),
  'custom-experience': (
    <>
      {/* glasses raised together — private parties & celebrations */}
      <g transform="rotate(9 24 34)">
        <path d="M13.6 13.2l.7 7.6a2.05 2.05 0 0 0 4.1 0l.7-7.6Z" stroke={olive} />
        <path d="M16.35 23v6" stroke={olive} />
        <path d="M13.4 29.4h5.9" stroke={olive} />
      </g>
      <g transform="rotate(-9 24 34)">
        <path d="M28.9 13.2l.7 7.6a2.05 2.05 0 0 0 4.1 0l.7-7.6Z" stroke={olive} />
        <path d="M31.65 23v6" stroke={olive} />
        <path d="M28.7 29.4h5.9" stroke={olive} />
      </g>
      <path d="M24 6.8v4.4M21.8 9h4.4" stroke={gold} />
      <circle cx="16.2" cy="8.2" r="1" fill={gold} stroke="none" />
      <circle cx="31.8" cy="8.6" r="1" fill={gold} stroke="none" />
    </>
  ),
};

export function PackageGlyph({ name, className }) {
  const art = glyphs[name] ?? glyphs['essential-session'];

  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {art}
    </svg>
  );
}
