import { AppleLogo, IconBattery, IconControlCenter, IconSearch, IconWifi } from './icons';

export default function MenuBar({ appName, stepLabel }: { appName: string; stepLabel: string }) {
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 4.5 }}>
          <IconBattery size={16} pct={78} style={{ opacity: 0.92 }} />
          <span style={{ fontSize: 12, opacity: 0.85, fontVariantNumeric: 'tabular-nums' }}>78%</span>
        </div>
        <IconSearch size={13.5} style={{ opacity: 0.92 }} />
        <span style={{ fontVariantNumeric: 'tabular-nums', fontSize: 12.5, whiteSpace: 'nowrap', opacity: 0.95 }}>
          Sat Aug 16&nbsp;&nbsp;2:13 AM
        </span>
      </div>
    </div>
  );
}
