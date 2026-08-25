import type { Actions } from '../types';
import { PLACE_RESULT, reveal } from '../secret';

export default function Result({ actions }: { actions: Actions }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 90, background: '#0a120d', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: 560, maxWidth: '100%', textAlign: 'center', color: '#e6ece7' }}>
        <div style={{ fontSize: 13, letterSpacing: 6, color: '#4ade80' }}>— MISSION COMPLETE —</div>
        <div style={{ fontSize: 52, fontWeight: 700, letterSpacing: 4, margin: '14px 0 6px', color: '#fff' }}>CASE CLOSED</div>
        <div style={{ fontSize: 13.5, color: '#8fa896', marginBottom: 26 }}>{reveal(PLACE_RESULT)}</div>
        <div style={{ textAlign: 'left', background: '#101a13', border: '1px solid #223529', borderRadius: 14, padding: '22px 26px' }}>
          <div style={{ fontSize: 11, letterSpacing: 2, color: '#5f7d68', marginBottom: 16 }}>TECHNIQUES YOU USED TODAY</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 11, fontSize: 14, color: '#dbe6dd' }}>
            <div>✓&nbsp;&nbsp;Base64 decoding</div>
            <div>✓&nbsp;&nbsp;Network forensics — PCAP file carving</div>
            <div>✓&nbsp;&nbsp;File signature recovery (HxD)</div>
            <div>✓&nbsp;&nbsp;Steganography — hidden data extraction</div>
            <div>✓&nbsp;&nbsp;OSINT — image-based geolocation</div>
          </div>
          <div style={{ height: 1, background: '#223529', margin: '20px 0' }} />
          <div style={{ fontSize: 12, color: '#72917b', lineHeight: 1.7 }}>
            실종 원인: 실습 자료 제작 68% / 누적 수면부족 32%
            <br />
            동아리 운영 상태: 정상화
          </div>
        </div>
        <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: 6, color: '#0a84ff', margin: '26px 0 18px' }}>
          WELCOME TO E-COPS
        </div>
        <button onClick={actions.restart} style={{ padding: '10px 22px', border: '1px solid #2f4636', borderRadius: 9, background: 'transparent', color: '#8fa896', fontSize: 12.5, cursor: 'pointer' }}>
          ↺ 처음부터 다시
        </button>
      </div>
    </div>
  );
}
