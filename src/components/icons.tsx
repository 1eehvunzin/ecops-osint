import type { CSSProperties } from 'react';

export interface IconProps {
  size?: number;
  style?: CSSProperties;
  className?: string;
}

const base = (size: number): CSSProperties => ({ display: 'block', flex: 'none', width: size, height: size });

/* ---------- menu bar / chrome line icons ---------- */

export function AppleLogo({ size = 14, style, className }: IconProps) {
  return (
    <svg className={className} style={{ ...base(size), ...style }} viewBox="0 0 15 17" fill="currentColor">
      <path d="M11.72 9.03c.02 2.05 1.8 2.73 1.82 2.74-.02.05-.29.98-.94 1.94-.57.84-1.16 1.68-2.09 1.7-.92.02-1.21-.54-2.27-.54-1.06 0-1.38.52-2.25.56-.9.03-1.58-.91-2.16-1.75C2.6 12.13 1.7 9.63 2.87 7.9c.58-.86 1.62-1.4 2.75-1.42.9-.02 1.75.6 2.3.6.55 0 1.58-.75 2.66-.64.45.02 1.73.18 2.55 1.37-.07.04-1.52.89-1.5 2.64l.09-.42zM9.85 4.98c.48-.58.8-1.38.71-2.19-.69.03-1.53.46-2.02 1.03-.44.51-.83 1.33-.73 2.11.77.06 1.56-.39 2.04-.95z" />
    </svg>
  );
}

export function IconWifi({ size = 15, style, className }: IconProps) {
  return (
    <svg className={className} style={{ ...base(size), ...style }} viewBox="0 0 17 13" fill="currentColor">
      <circle cx="8.5" cy="10.8" r="1.35" />
      <path d="M8.5 5.6c1.9 0 3.6.75 4.85 1.97l-1.5 1.53A4.6 4.6 0 008.5 9.2 4.6 4.6 0 005.15 9.1L3.65 7.57A6.85 6.85 0 018.5 5.6z" />
      <path d="M8.5 1.4c3 0 5.7 1.2 7.65 3.15L14.7 6.05A9 9 0 008.5 3.6 9 9 0 002.3 6.05L0.85 4.55A10.8 10.8 0 018.5 1.4z" />
    </svg>
  );
}

export function IconBattery({ size = 15, pct = 82, fillColor, style, className }: IconProps & { pct?: number; fillColor?: string }) {
  const w = 21.5;
  const fillW = Math.max(1.5, (w - 2.8) * (pct / 100));
  return (
    <svg className={className} style={{ ...base(size), height: size * (13 / 27), width: size, ...style }} viewBox="0 0 27 13" fill="none">
      <rect x="0.9" y="1.9" width={w} height="9.2" rx="2.6" stroke="currentColor" strokeOpacity="0.7" strokeWidth="1" />
      <rect x="2.3" y="3.3" width={fillW} height="6.4" rx="1.4" fill={fillColor ?? 'currentColor'} />
      <path d="M24 4.6v3.8c1-.3 1-3.5 0-3.8z" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

export function IconSearch({ size = 15, style, className }: IconProps) {
  return (
    <svg className={className} style={{ ...base(size), ...style }} viewBox="0 0 15 15" fill="none">
      <circle cx="6.3" cy="6.3" r="4.3" stroke="currentColor" strokeWidth="1.4" />
      <line x1="9.6" y1="9.6" x2="13.3" y2="13.3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function IconControlCenter({ size = 14, style, className }: IconProps) {
  return (
    <svg className={className} style={{ ...base(size), ...style }} viewBox="0 0 16 16" fill="none">
      <rect x="1" y="1.5" width="6" height="6" rx="1.6" stroke="currentColor" strokeWidth="1.3" />
      <rect x="9" y="1.5" width="6" height="6" rx="1.6" stroke="currentColor" strokeWidth="1.3" />
      <rect x="1" y="9.5" width="6" height="5" rx="1.6" stroke="currentColor" strokeWidth="1.3" />
      <rect x="9" y="9.5" width="6" height="5" rx="1.6" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

export function IconLock({ size = 12, style, className }: IconProps) {
  return (
    <svg className={className} style={{ ...base(size), ...style }} viewBox="0 0 14 16" fill="none">
      <rect x="1.3" y="6.6" width="11.4" height="8.3" rx="2" fill="currentColor" opacity="0.14" stroke="currentColor" strokeWidth="1.2" />
      <path d="M3.6 6.6V4.4a3.4 3.4 0 016.8 0v2.2" stroke="currentColor" strokeWidth="1.3" fill="none" />
      <circle cx="7" cy="10.4" r="1.15" fill="currentColor" />
      <path d="M7 11.5v1.7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function IconChevron({ dir = 'left', size = 14, style, className }: IconProps & { dir?: 'left' | 'right' }) {
  const d = dir === 'left' ? 'M9 3.2 4.4 8l4.6 4.8' : 'M5 3.2 9.6 8 5 12.8';
  return (
    <svg className={className} style={{ ...base(size), ...style }} viewBox="0 0 14 16" fill="none">
      <path d={d} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconListView({ size = 14, style, className }: IconProps) {
  return (
    <svg className={className} style={{ ...base(size), ...style }} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <line x1="2" y1="4" x2="14" y2="4" />
      <line x1="2" y1="8" x2="14" y2="8" />
      <line x1="2" y1="12" x2="14" y2="12" />
    </svg>
  );
}

export function IconGridView({ size = 14, style, className }: IconProps) {
  return (
    <svg className={className} style={{ ...base(size), ...style }} viewBox="0 0 16 16" fill="currentColor">
      <rect x="2" y="2" width="5" height="5" rx="1" />
      <rect x="9" y="2" width="5" height="5" rx="1" />
      <rect x="2" y="9" width="5" height="5" rx="1" />
      <rect x="9" y="9" width="5" height="5" rx="1" />
    </svg>
  );
}

export function IconInfoCircle({ size = 14, style, className }: IconProps) {
  return (
    <svg className={className} style={{ ...base(size), ...style }} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.6" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="8" cy="5" r="0.9" fill="currentColor" />
      <path d="M8 7.6v4.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export function IconLoupe({ size = 14, style, className }: IconProps) {
  return (
    <svg className={className} style={{ ...base(size), ...style }} viewBox="0 0 16 16" fill="none">
      <circle cx="6.6" cy="6.6" r="5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="6.6" cy="6.6" r="2.1" stroke="currentColor" strokeWidth="1" opacity="0.55" />
      <line x1="10.2" y1="10.2" x2="14" y2="14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function IconPin({ size = 14, style, className }: IconProps) {
  return (
    <svg className={className} style={{ ...base(size), ...style }} viewBox="0 0 14 16" fill="currentColor">
      <path d="M7 0a5 5 0 00-5 5c0 3.6 5 9.6 5 9.6S12 8.6 12 5a5 5 0 00-5-5z" opacity="0.9" />
      <circle cx="7" cy="5" r="1.9" fill="#fff" />
    </svg>
  );
}

export function IconWarningTriangle({ size = 14, style, className }: IconProps) {
  return (
    <svg className={className} style={{ ...base(size), ...style }} viewBox="0 0 16 15" fill="none">
      <path d="M8 1.4 15 13.6H1z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" fill="currentColor" fillOpacity="0.12" />
      <path d="M8 6v3.3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="8" cy="11.2" r="0.9" fill="currentColor" />
    </svg>
  );
}

export function IconCheckCircle({ size = 14, style, className }: IconProps) {
  return (
    <svg className={className} style={{ ...base(size), ...style }} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.6" stroke="currentColor" strokeWidth="1.3" fill="currentColor" fillOpacity="0.1" />
      <path d="M5 8.2l2.1 2.1L11.2 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

export function IconXCircle({ size = 14, style, className }: IconProps) {
  return (
    <svg className={className} style={{ ...base(size), ...style }} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.6" stroke="currentColor" strokeWidth="1.3" fill="currentColor" fillOpacity="0.1" />
      <path d="M5.6 5.6l4.8 4.8M10.4 5.6l-4.8 4.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function IconStar({ size = 14, style, className }: IconProps) {
  return (
    <svg className={className} style={{ ...base(size), ...style }} viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 .8l2.16 4.62 5.04.62-3.7 3.5.98 5.02L8 12.1 3.52 14.6l.98-5.02-3.7-3.5 5.04-.62z" />
    </svg>
  );
}

export function IconWrench({ size = 13, style, className }: IconProps) {
  return (
    <svg className={className} style={{ ...base(size), ...style }} viewBox="0 0 16 16" fill="none">
      <path
        d="M11 2.2a3.6 3.6 0 00-4.6 4.3L1.6 11.3a1.6 1.6 0 002.2 2.2l4.8-4.8a3.6 3.6 0 004.3-4.6l-2 2-1.7-1.7z"
        stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" fill="currentColor" fillOpacity="0.08"
      />
    </svg>
  );
}

export function IconPaperclip({ size = 13, style, className }: IconProps) {
  return (
    <svg className={className} style={{ ...base(size), ...style }} viewBox="0 0 16 16" fill="none">
      <path d="M11.5 4.2L5.8 9.9a2.2 2.2 0 003.1 3.1l5.6-5.6a3.6 3.6 0 00-5.1-5.1L3.8 7.9a5 5 0 007.1 7.1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconReply({ size = 14, style, className }: IconProps) {
  return (
    <svg className={className} style={{ ...base(size), ...style }} viewBox="0 0 16 16" fill="none">
      <path d="M7 3L2 7.5 7 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 7.5h7.5A4.5 4.5 0 0114 12v1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function IconForwardArrow({ size = 14, style, className }: IconProps) {
  return (
    <svg className={className} style={{ ...base(size), ...style }} viewBox="0 0 16 16" fill="none">
      <path d="M9 3l5 4.5L9 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 7.5H6.5A4.5 4.5 0 002 12v1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function IconCopy({ size = 14, style, className }: IconProps) {
  return (
    <svg className={className} style={{ ...base(size), ...style }} viewBox="0 0 16 16" fill="none">
      <rect x="5.4" y="5.4" width="8.6" height="8.6" rx="1.6" stroke="currentColor" strokeWidth="1.3" />
      <path d="M10.6 5.4V3.6A1.6 1.6 0 009 2H3.6A1.6 1.6 0 002 3.6V9a1.6 1.6 0 001.6 1.6h1.8" stroke="currentColor" strokeWidth="1.3" fill="none" />
    </svg>
  );
}

export function IconTrashLine({ size = 14, style, className }: IconProps) {
  return (
    <svg className={className} style={{ ...base(size), ...style }} viewBox="0 0 16 16" fill="none">
      <path d="M3 4.6h10M6.4 4.6V3a1 1 0 011-1h1.2a1 1 0 011 1v1.6M6.8 7.4v4.2M9.2 7.4v4.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M4 4.6l.7 8a1.6 1.6 0 001.6 1.5h3.4a1.6 1.6 0 001.6-1.5l.7-8" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

export function IconPerson({ size = 40, style, className }: IconProps) {
  return (
    <svg className={className} style={{ ...base(size), ...style }} viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="8" r="4.4" />
      <path d="M3.6 21c.9-4.6 4.4-7.2 8.4-7.2s7.5 2.6 8.4 7.2z" />
    </svg>
  );
}

/* ---------- macOS app glyphs (dock / desktop) ---------- */

export function GlyphFolder({ size = 46, style, className }: IconProps) {
  return (
    <svg className={className} style={{ ...base(size), ...style }} viewBox="0 0 64 52" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="folderBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8fd0ff" />
          <stop offset="1" stopColor="#3fa2f5" />
        </linearGradient>
        <linearGradient id="folderTab" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#bfe4ff" />
          <stop offset="1" stopColor="#7fc4fb" />
        </linearGradient>
      </defs>
      <path d="M2 12a4 4 0 014-4h16l6 6h30a4 4 0 014 4v2H2z" fill="url(#folderTab)" />
      <rect x="2" y="16" width="60" height="34" rx="5" fill="url(#folderBody)" />
      <rect x="2" y="16" width="60" height="8" rx="4" fill="#fff" opacity="0.18" />
    </svg>
  );
}

export function GlyphMusicNote({ size = 46, style, className }: IconProps) {
  return (
    <svg className={className} style={{ ...base(size), ...style }} viewBox="0 0 64 64">
      <defs>
        <linearGradient id="noteBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff7ab8" />
          <stop offset="1" stopColor="#ff3d77" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="60" height="60" rx="14" fill="url(#noteBg)" />
      <path d="M40 16v22.4a7.6 7.6 0 10 3 6V25l-3-1V16z" fill="#fff" opacity="0" />
      <g fill="#fff">
        <circle cx="24" cy="44" r="6.4" />
        <circle cx="41" cy="40" r="6.4" />
        <rect x="29.6" y="17" width="3" height="27.5" />
        <rect x="41" y="14" width="3" height="26" />
        <path d="M29.6 17 44 14v6l-14.4 3z" />
      </g>
    </svg>
  );
}

export function GlyphImage({ size = 46, style, className }: IconProps) {
  return (
    <svg className={className} style={{ ...base(size), ...style }} viewBox="0 0 64 64">
      <defs>
        <linearGradient id="imgBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8ee6c9" />
          <stop offset="1" stopColor="#28b473" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="60" height="60" rx="14" fill="url(#imgBg)" />
      <rect x="11" y="15" width="42" height="34" rx="4" fill="#fff" opacity="0.94" />
      <circle cx="22" cy="26" r="4.2" fill="#f5c518" />
      <path d="M14 44l11-12 8 8 6-7 11 11z" fill="#3a9b6e" />
    </svg>
  );
}

export function GlyphDoc({ size = 46, style, className }: IconProps) {
  return (
    <svg className={className} style={{ ...base(size), ...style }} viewBox="0 0 52 64">
      <path d="M6 2h27l13 13v43a4 4 0 01-4 4H6a4 4 0 01-4-4V6a4 4 0 014-4z" fill="#fbfbfd" stroke="#d7d7db" strokeWidth="1.4" />
      <path d="M33 2v10a3 3 0 003 3h10z" fill="#e3e3e8" />
      <g stroke="#c7c9d8" strokeWidth="2.4" strokeLinecap="round">
        <line x1="12" y1="30" x2="40" y2="30" />
        <line x1="12" y1="38" x2="40" y2="38" />
        <line x1="12" y1="46" x2="32" y2="46" />
      </g>
    </svg>
  );
}

export function GlyphFinderFace({ size = 30, style, className }: IconProps) {
  return (
    <svg className={className} style={{ ...base(size), ...style }} viewBox="0 0 64 64">
      <path d="M32 4a28 28 0 000 56z" fill="#3fa9f5" />
      <path d="M32 4a28 28 0 010 56z" fill="#e9f4ff" />
      <path d="M20 26c2.4 8 6 22 12 30-9.8-3.4-17-11.6-19-22z" fill="#1c7fd6" opacity="0.9" />
      <circle cx="21" cy="27" r="3.6" fill="#1c1c1e" />
      <circle cx="21" cy="27" r="3.6" fill="#1c1c1e" transform="translate(22 0)" />
    </svg>
  );
}

export function GlyphSafariCompass({ size = 30, style, className }: IconProps) {
  return (
    <svg className={className} style={{ ...base(size), ...style }} viewBox="0 0 64 64">
      <circle cx="32" cy="32" r="30" fill="#eaf6ff" stroke="#cfe9ff" strokeWidth="1" />
      <g stroke="#c53b2e" strokeWidth="0.6">
        {Array.from({ length: 36 }).map((_, i) => (
          <line key={i} x1="32" y1="4" x2="32" y2="8" transform={`rotate(${i * 10} 32 32)`} opacity={i % 9 === 0 ? 0.55 : 0.22} />
        ))}
      </g>
      <path d="M32 14l7 16-7 20-7-20z" fill="#ff453a" />
      <path d="M32 14l7 16-14 4z" fill="#fff" />
    </svg>
  );
}

export function GlyphMessageBubble({ size = 26, style, className }: IconProps) {
  return (
    <svg className={className} style={{ ...base(size), ...style }} viewBox="0 0 64 56" fill="#fff">
      <path d="M32 2C15 2 2 12.7 2 26s13 24 30 24c2 0 4-.15 5.9-.44L47 56l-1.6-10.9C53 40.6 62 34 62 26 62 12.7 49 2 32 2z" />
    </svg>
  );
}

export function GlyphMailEnvelope({ size = 26, style, className }: IconProps) {
  return (
    <svg className={className} style={{ ...base(size), ...style }} viewBox="0 0 64 48" fill="none">
      <rect x="2" y="2" width="60" height="44" rx="7" fill="#fff" />
      <path d="M4 6l28 22L60 6" stroke="#4aa3ff" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

export function GlyphMapPin({ size = 28, style, className }: IconProps) {
  return (
    <svg className={className} style={{ ...base(size), ...style }} viewBox="0 0 64 64">
      <circle cx="32" cy="32" r="30" fill="#eaf7e6" />
      <path d="M32 12a13 13 0 00-13 13c0 9.5 13 25 13 25s13-15.5 13-25a13 13 0 00-13-13z" fill="#ff5f57" />
      <circle cx="32" cy="25" r="5" fill="#fff" />
    </svg>
  );
}

export function GlyphNotesPad({ size = 26, style, className }: IconProps) {
  return (
    <svg className={className} style={{ ...base(size), ...style }} viewBox="0 0 64 64">
      <rect x="4" y="4" width="56" height="56" rx="12" fill="#fdd94f" />
      <rect x="4" y="4" width="56" height="16" rx="12" fill="#fff" />
      <g stroke="#e2b53a" strokeWidth="2.2">
        <line x1="8" y1="30" x2="56" y2="30" />
        <line x1="8" y1="40" x2="56" y2="40" />
        <line x1="8" y1="50" x2="40" y2="50" />
      </g>
    </svg>
  );
}

export function GlyphTrashCan({ size = 30, style, className }: IconProps) {
  return (
    <svg className={className} style={{ ...base(size), ...style }} viewBox="0 0 48 56" fill="none">
      <path d="M6 14h36" stroke="#8a8a92" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M17 14v-4a3 3 0 013-3h8a3 3 0 013 3v4" stroke="#8a8a92" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M9 14l2.4 34a4 4 0 004 3.7h17.2a4 4 0 004-3.7L39 14" stroke="#8a8a92" strokeWidth="2.6" strokeLinejoin="round" />
      <line x1="19" y1="22" x2="19" y2="42" stroke="#c7c7cf" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="24" y1="22" x2="24" y2="42" stroke="#c7c7cf" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="29" y1="22" x2="29" y2="42" stroke="#c7c7cf" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}
