import type { AppState, Actions } from '../types';
import { MacWindow, TitleBar } from '../components/MacWindow';
import { GlyphDoc, GlyphFolder, GlyphImage, GlyphMusicNote } from '../components/icons';

const icons = [
  { icon: <GlyphFolder />, label: '동아리 자료' },
  { icon: <GlyphFolder />, label: '개인 사진' },
  { icon: <GlyphMusicNote />, label: '플레이리스트' },
  { icon: <GlyphImage />, label: '배경화면 후보' },
];

export default function Desktop({ state, actions }: { state: AppState; actions: Actions }) {
  return (
    <div style={{ position: 'relative', zIndex: 10, minHeight: 'calc(100vh - 28px)', padding: '30px 36px 120px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,84px)', gap: '20px 4px', justifyContent: 'end' }}>
        {icons.map((it, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ width: 52, height: 52, margin: '0 auto', filter: 'drop-shadow(0 3px 5px rgba(0,0,0,0.35))' }}>{it.icon}</div>
            <div style={{ fontSize: 11.5, color: '#fff', textShadow: '0 1px 3px rgba(0,0,0,0.7)', marginTop: 6 }}>{it.label}</div>
          </div>
        ))}
        <div
          onClick={actions.openTxt}
          style={{
            textAlign: 'center',
            cursor: 'pointer',
            padding: '5px 3px',
            borderRadius: 8,
            background: state.txtOpen ? 'rgba(255,255,255,0.16)' : 'transparent',
          }}
        >
          <div style={{ width: 40, height: 52, margin: '0 auto', filter: 'drop-shadow(0 3px 5px rgba(0,0,0,0.35))' }}>
            <GlyphDoc />
          </div>
          <div style={{ fontSize: 11.5, color: '#fff', textShadow: '0 1px 3px rgba(0,0,0,0.7)', marginTop: 6 }}>동아리메일_계정.txt</div>
        </div>
      </div>

      {state.txtOpen && (
        <MacWindow width={520} draggable resizable="width" minWidth={400} defaultLeft="50%" defaultTop={70} centerX>
          <TitleBar title="동아리메일_계정.txt" onClose={actions.closeTxt} />
            <div style={{ padding: '22px 22px 0' }}>
              <button onClick={actions.closeTxt} style={{ border: 0, background: 'none', color: '#0a84ff', fontSize: 13, cursor: 'pointer', padding: 0 }}>
                ← 뒤로
              </button>
            </div>
            <div style={{ padding: '16px 22px 20px', fontSize: 13, color: '#1c1c1e', lineHeight: 1.9 }}>
              E-COPS 메일 계정
              <br />
              <br />
              ID (base64): <span style={{ background: '#fff3cd', padding: '1px 5px', borderRadius: 4 }}>ZWNvcHNtYWls</span>
              <br />
              PW (base64): <span style={{ background: '#fff3cd', padding: '1px 5px', borderRadius: 4 }}>cHdld2hhMTIzQA==</span>
            </div>
            <div style={{ padding: '0 22px 20px', textAlign: 'right' }}>
              <button
                onClick={actions.toLogin}
                style={{ padding: '9px 18px', border: 0, borderRadius: 9, background: '#0a84ff', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
              >
                ECOPS 웹메일 열기 →
              </button>
            </div>
        </MacWindow>
      )}
    </div>
  );
}
