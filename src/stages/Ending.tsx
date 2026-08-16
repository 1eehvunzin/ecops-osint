import type { Actions } from '../types';
import { MacWindow, TitleBar } from '../components/MacWindow';
import { IconPerson } from '../components/icons';

export default function Ending({ actions }: { actions: Actions }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 80, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <MacWindow width={720} dark radius={16}>
        <TitleBar title="FaceTime — Incoming call" dark height={40} />
        <div style={{ position: 'relative', height: 380, background: 'repeating-linear-gradient(45deg,#262629 0 12px,#2b2b2f 12px 24px)' }}>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, color: '#8e8e93' }}>
            <div style={{ fontSize: 13, letterSpacing: 1 }}>[ VIDEO — 아산공학관 109호, empty lecture room ]</div>
            <div style={{ width: 96, height: 96, borderRadius: '50%', background: '#3a3a3c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IconPerson size={46} style={{ color: '#6e6e76' }} />
            </div>
            <div style={{ color: '#fff', fontFamily: '-apple-system,sans-serif', fontSize: 16, fontWeight: 600 }}>회장 · President</div>
          </div>
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '22px 26px', background: 'linear-gradient(transparent,rgba(0,0,0,0.85))', color: '#f2f2f2', fontSize: 15.5, lineHeight: 1.7 }}>
            "얘들아… 미안, 나 여기 있어."
            <br />
            "어제 새벽에 스카우트 제안 메일을 받았는데, 만나자는 장소가 여기였어."
            <br />
            "미리 와서 발표 대본 외우다가… 며칠 밤새서 그냥 잠들어버렸다."
          </div>
        </div>
        <div style={{ padding: 16, background: '#2c2c2e', display: 'flex', justifyContent: 'center' }}>
          <button onClick={actions.openResult} style={{ padding: '11px 26px', border: 0, borderRadius: 10, background: '#0a84ff', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
            Continue →
          </button>
        </div>
      </MacWindow>
    </div>
  );
}
