import type { Actions } from '../types';

export default function Result({ actions }: { actions: Actions }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 90, background: '#0b0b12', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: 560, maxWidth: '100%', textAlign: 'center', color: '#eaeaea' }}>
        <div style={{ fontSize: 13, letterSpacing: 6, color: '#28c840' }}>— MISSION COMPLETE —</div>
        <div style={{ fontSize: 52, fontWeight: 700, letterSpacing: 4, margin: '14px 0 6px', color: '#fff' }}>CASE CLOSED</div>
        <div style={{ fontSize: 13.5, color: '#9a9aa5', marginBottom: 26 }}>회장 위치: 아산공학관 109호 (수면 중)</div>
        <div style={{ textAlign: 'left', background: '#15151f', border: '1px solid #26263a', borderRadius: 14, padding: '22px 26px' }}>
          <div style={{ fontSize: 11, letterSpacing: 2, color: '#6a6a7a', marginBottom: 16 }}>TECHNIQUES YOU USED TODAY</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 11, fontSize: 14, color: '#dcdce6' }}>
            <div>✓&nbsp;&nbsp;Base64 decoding</div>
            <div>✓&nbsp;&nbsp;Log / PCAP analysis</div>
            <div>✓&nbsp;&nbsp;Hash-based file integrity check</div>
            <div>✓&nbsp;&nbsp;File signature recovery (forensics)</div>
            <div>✓&nbsp;&nbsp;OSINT — image-based geolocation</div>
          </div>
          <div style={{ height: 1, background: '#26263a', margin: '20px 0' }} />
          <div style={{ fontSize: 12, color: '#7a7a8a', lineHeight: 1.7 }}>
            실종 원인: 과로 72% / 스카우트 고민 28%
            <br />
            동아리 운영 상태: 정상화
          </div>
        </div>
        <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: 6, color: '#0a84ff', margin: '26px 0 18px' }}>
          WELCOME TO E-COPS
        </div>
        <button onClick={actions.restart} style={{ padding: '10px 22px', border: '1px solid #3a3a4a', borderRadius: 9, background: 'transparent', color: '#9a9aa5', fontSize: 12.5, cursor: 'pointer' }}>
          ↺ 처음부터 다시
        </button>
      </div>
    </div>
  );
}
