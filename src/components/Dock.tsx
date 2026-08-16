import type { CSSProperties, ReactNode } from 'react';
import {
  GlyphFinderFace,
  GlyphMailEnvelope,
  GlyphMapPin,
  GlyphMessageBubble,
  GlyphNotesPad,
  GlyphSafariCompass,
  GlyphTrashCan,
} from './icons';

const dotStyle: CSSProperties = { width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.92)' };
const noDotStyle: CSSProperties = { width: 4, height: 4 };

function Item({ bg, children, dot, label }: { bg: string; children: ReactNode; dot?: boolean; label: string }) {
  return (
    <div className="dock-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }} title={label}>
      <div style={{ position: 'relative', width: 52, height: 52 }}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 13,
            background: bg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            boxShadow: '0 3px 7px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.4)',
          }}
        >
          {children}
        </div>
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: 52,
            height: 20,
            borderRadius: 13,
            background: bg,
            transform: 'scaleY(-1)',
            opacity: 0.16,
            WebkitMaskImage: 'linear-gradient(rgba(0,0,0,0.6), transparent 75%)',
            maskImage: 'linear-gradient(rgba(0,0,0,0.6), transparent 75%)',
            pointerEvents: 'none',
          }}
        />
      </div>
      <div style={dot ? dotStyle : noDotStyle} />
    </div>
  );
}

export default function Dock() {
  return (
    <>
      <style>{`
        .dock-item { transition: transform 0.16s cubic-bezier(.2,.8,.2,1); }
        .dock-item:hover { transform: translateY(-9px) scale(1.1); }
      `}</style>
      <div
        style={{
          position: 'fixed',
          bottom: 8,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 35,
          display: 'flex',
          alignItems: 'flex-end',
          gap: 9,
          padding: '7px 9px',
          background: 'rgba(240,240,244,0.28)',
          backdropFilter: 'blur(36px) saturate(1.7)',
          WebkitBackdropFilter: 'blur(36px) saturate(1.7)',
          border: '0.5px solid rgba(255,255,255,0.4)',
          borderRadius: 22,
          boxShadow: '0 16px 46px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.35)',
        }}
      >
        <Item bg="linear-gradient(180deg,#eef6ff,#dceeff)" dot label="Finder">
          <GlyphFinderFace size={34} />
        </Item>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }} title="Launchpad">
          <div
            className="dock-item"
            style={{
              width: 52,
              height: 52,
              borderRadius: 13,
              background: 'linear-gradient(160deg,#3a3a44,#1c1c22)',
              display: 'grid',
              gridTemplateColumns: 'repeat(3,1fr)',
              gap: 4,
              padding: 12,
              boxShadow: '0 3px 7px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.14)',
            }}
          >
            {['#ff6b6b', '#ffd166', '#06d6a0', '#4aa3ff', '#c792ea', '#ff9f0a', '#5ac8fa', '#f78fb3', '#a0e57e'].map((c, i) => (
              <span key={i} style={{ background: c, borderRadius: 2 }} />
            ))}
          </div>
          <div style={noDotStyle} />
        </div>

        <Item bg="linear-gradient(180deg,#f4faff,#e2f1ff)" label="Safari">
          <GlyphSafariCompass size={38} />
        </Item>
        <Item bg="linear-gradient(160deg,#6bf08a,#0fb64f)" dot label="Messages">
          <GlyphMessageBubble size={26} />
        </Item>
        <Item bg="linear-gradient(160deg,#8fc7ff,#2a7de8)" label="Mail">
          <GlyphMailEnvelope size={27} />
        </Item>
        <Item bg="linear-gradient(180deg,#fdfdfe,#eef1f5)" label="Maps">
          <GlyphMapPin size={36} />
        </Item>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }} title="Photos">
          <div
            className="dock-item"
            style={{
              width: 52,
              height: 52,
              borderRadius: 13,
              background: 'conic-gradient(from 210deg,#ff5f6d,#ffc371,#47cf73,#4aa3ff,#c792ea,#ff5f6d)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 3px 7px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.35)',
            }}
          >
            <span style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(255,255,255,0.94)' }} />
          </div>
          <div style={noDotStyle} />
        </div>

        <Item bg="linear-gradient(165deg,#ffe680,#fdd94f 55%,#f0bd1f)" label="Notes">
          <GlyphNotesPad size={30} />
        </Item>

        <div style={{ width: 1, height: 44, background: 'rgba(120,120,130,0.4)', margin: '0 3px', alignSelf: 'center' }} />

        <Item bg="linear-gradient(180deg,#fafbfd,#dfe2e7)" label="Trash">
          <GlyphTrashCan size={30} />
        </Item>
      </div>
    </>
  );
}
