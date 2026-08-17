import { useEffect, useState } from 'react';
import { AppleLogo, IconBattery, IconControlCenter, IconSearch, IconWifi } from './icons';

const MISSION_MS = 15 * 60 * 1000;
const BATTERY_START = 32;
const BATTERY_END = 3;
const CRITICAL_PCT = 15;

function batteryPct(missionStart: number | null | undefined, now: number): number {
  if (!missionStart) return BATTERY_START;
  const t = Math.min(Math.max(now - missionStart, 0), MISSION_MS) / MISSION_MS;
  return Math.round(BATTERY_START - (BATTERY_START - BATTERY_END) * t);
}

export default function MenuBar({
  appName,
  stepLabel,
  missionStart,
}: {
  appName: string;
  stepLabel: string;
  missionStart?: number | null;
}) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 10000);
    return () => window.clearInterval(id);
  }, []);

  const pct = batteryPct(missionStart, now);
  const critical = pct <= CRITICAL_PCT;
  const batteryColor = critical ? '#ff453a' : undefined;

  return (
    <div
      style={{
        position: 'relative',
        zIndex: 40,
        height: 28,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 14px',
        background: 'rgba(24,24,30,0.55)',
        backdropFilter: 'blur(26px) saturate(1.7)',
        WebkitBackdropFilter: 'blur(26px) saturate(1.7)',
        color: '#f2f2f4',
        fontSize: 13,
        borderBottom: '0.5px solid rgba(255,255,255,0.08)',
      }}
    >
      {critical && (
        <style>{`
          @keyframes batteryCriticalPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        `}</style>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <AppleLogo size={14} style={{ opacity: 0.95 }} />
        <span style={{ fontWeight: 700, letterSpacing: -0.1 }}>{appName}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, opacity: 0.82, fontWeight: 400 }}>
          <span>File</span>
          <span>Edit</span>
          <span>View</span>
          <span>Go</span>
          <span>Window</span>
          <span>Help</span>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
        {!!stepLabel && (
          <span
            style={{
              fontSize: 10.5,
              opacity: 0.5,
              letterSpacing: 0.6,
              whiteSpace: 'nowrap',
            }}
          >
            {stepLabel}
          </span>
        )}
        <IconControlCenter size={14} style={{ opacity: 0.92 }} />
        <IconWifi size={14.5} style={{ opacity: 0.92 }} />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4.5,
            animation: critical ? 'batteryCriticalPulse 1.4s ease-in-out infinite' : undefined,
          }}
          title={critical ? '배터리 부족' : undefined}
        >
          <IconBattery size={16} pct={pct} fillColor={batteryColor} style={{ opacity: 0.92 }} />
          <span style={{ fontSize: 12, opacity: 0.85, fontVariantNumeric: 'tabular-nums', color: batteryColor, fontWeight: critical ? 700 : 400 }}>
            {pct}%
          </span>
        </div>
        <IconSearch size={13.5} style={{ opacity: 0.92 }} />
        <span style={{ fontVariantNumeric: 'tabular-nums', fontSize: 12.5, whiteSpace: 'nowrap', opacity: 0.95 }}>
          Wed Aug 26&nbsp;&nbsp;2:13 AM
        </span>
      </div>
    </div>
  );
}
