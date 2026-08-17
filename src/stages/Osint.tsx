import type { AppState, Actions } from '../types';
import { MacWindow, TitleBar, SearchField } from '../components/MacWindow';
import { IconCheckCircle, IconXCircle } from '../components/icons';

export default function Osint({ state, actions }: { state: AppState; actions: Actions }) {
  const statusMap = {
    wrong: { msg: '일치하는 위치가 없습니다. 다시 확인해 보세요.', bg: '#fdecea', bd: '#f5b7b1', fg: '#a11', Icon: IconXCircle },
    correct: { msg: '위치 확인 — 아산공학관. 연결 중…', bg: '#d8f3dc', bd: '#95d5b2', fg: '#1b6b3a', Icon: IconCheckCircle },
  } as const;
  const st = state.status ? statusMap[state.status] : null;

  return (
    <div style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '34px 28px 130px' }}>
      <MacWindow width={460} height={460} draggable resizable="both" minWidth={320} minHeight={320} defaultLeft="50%" defaultTop={60} centerX>
        <TitleBar title="Maps" />
        <div style={{ padding: 12, background: '#fbfbfd', borderBottom: '0.5px solid #e3e3e6' }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <SearchField
              value={state.query}
              onChange={actions.onQuery}
              onKeyDown={actions.keyQuery}
              placeholder="위치를 검색하세요…"
              style={{ flex: 1, height: 36, borderRadius: 8 }}
            />
            <button onClick={actions.submitQuery} style={{ height: 36, padding: '0 16px', border: 0, borderRadius: 8, background: '#0a84ff', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
              검색
            </button>
          </div>
          {st && (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 7, marginTop: 10, padding: '9px 12px', borderRadius: 8, fontSize: 12.5, background: st.bg, border: `1px solid ${st.bd}`, color: st.fg }}>
              <st.Icon size={13} style={{ marginTop: 1, flex: 'none' }} />
              <span>{st.msg}</span>
            </div>
          )}
        </div>
        <div style={{ position: 'relative', flex: 1, minHeight: 0, background: '#eef1e6', overflow: 'hidden' }}>
          <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <rect width="400" height="400" fill="#eef1e6" />
            {/* parks / greenery */}
            <path d="M-10 40 Q60 10 140 45 T260 30 L280 130 Q180 165 90 130 T-10 150 Z" fill="#c9dfc0" />
            <path d="M270 250 Q340 220 410 260 L410 400 L250 400 Q235 320 270 250 Z" fill="#c9dfc0" />
            <circle cx="70" cy="330" r="46" fill="#c9dfc0" />
            {/* roads */}
            <path d="M-10 200 L410 176" stroke="#dcdfe3" strokeWidth="14" strokeLinecap="round" />
            <path d="M150 -10 L190 410" stroke="#dcdfe3" strokeWidth="12" strokeLinecap="round" />
            <path d="M-10 300 L280 400" stroke="#dcdfe3" strokeWidth="10" strokeLinecap="round" />
            <path d="M300 -10 L340 410" stroke="#dcdfe3" strokeWidth="8" strokeLinecap="round" />
            {/* campus quad */}
            <rect x="150" y="150" width="110" height="80" rx="6" fill="#dfe8d8" stroke="#c9dfc0" strokeWidth="3" />
            {/* buildings */}
            {[
              [40, 60, 46, 30, 4],
              [230, 50, 34, 40, 4],
              [40, 230, 40, 34, 4],
              [110, 250, 30, 46, 4],
              [300, 90, 42, 30, 4],
              [320, 200, 30, 30, 4],
              [180, 260, 26, 26, 3],
              [70, 150, 34, 24, 3],
              [260, 300, 44, 32, 4],
            ].map(([x, y, w, h, r], i) => (
              <rect key={i} x={x} y={y} width={w} height={h} rx={r} fill="#f8f8f9" stroke="#d4d6da" strokeWidth="1.5" />
            ))}
          </svg>
          {state.solved ? (
            <div style={{ position: 'absolute', left: '50%', top: '44%', transform: 'translate(-50%,-100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
              <div style={{ width: 26, height: 26, borderRadius: '50% 50% 50% 0', transform: 'rotate(-45deg)', background: '#ff453a', boxShadow: '0 6px 14px rgba(0,0,0,0.3)', border: '2px solid #fff' }} />
              <div style={{ marginTop: 12, background: '#fff', padding: '8px 12px', borderRadius: 8, boxShadow: '0 4px 14px rgba(0,0,0,0.18)', textAlign: 'center' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1c1c1e' }}>아산공학관 · Asan Engineering</div>
                <div style={{ fontSize: 11, color: '#8a8a8e', marginTop: 2 }}>이화여자대학교 · Seoul</div>
              </div>
            </div>
          ) : (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7f8b83', fontSize: 13 }}>
              위치를 검색하면 핀이 표시됩니다
            </div>
          )}
        </div>
      </MacWindow>
    </div>
  );
}
