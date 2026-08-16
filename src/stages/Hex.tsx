import type { CSSProperties } from 'react';
import type { AppState, Actions } from '../types';
import { MacWindow, TitleBar } from '../components/MacWindow';

const hexInStyle: CSSProperties = {
  width: 38,
  height: 30,
  textAlign: 'center',
  background: '#111',
  color: '#5ac8fa',
  border: '1px solid #3a3a40',
  borderRadius: 6,
  fontSize: 14,
  outline: 'none',
  textTransform: 'uppercase',
};

export default function Hex({ state, actions }: { state: AppState; actions: Actions }) {
  return (
    <div style={{ position: 'relative', zIndex: 10, minHeight: 'calc(100vh - 28px)', display: 'flex', justifyContent: 'center', padding: '34px 24px 120px' }}>
      <MacWindow width={720} dark draggable resizable="width" minWidth={460} defaultLeft="50%" defaultTop={90} centerX>
        <TitleBar title="Hex Fiend — offer_location(1).jpg" dark />
        <div style={{ padding: '20px 22px', color: '#d4d4d8' }}>
          <div style={{ fontSize: 11, color: '#8a8a8e', marginBottom: 6 }}>
            앞 4바이트가 <span style={{ color: '#ff6b6b' }}>00 00 00 00</span> 으로 손상되었습니다. 올바른 시그니처로 교체하세요.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, margin: '14px 0', flexWrap: 'wrap' }}>
            <span style={{ color: '#6a6a72' }}>00000000</span>
            {[0, 1, 2, 3].map((i) => (
              <input
                key={i}
                value={state.hex[i]}
                onChange={(e) => actions.onHexAt(i, e.target.value)}
                maxLength={2}
                style={hexInStyle}
              />
            ))}
            <span style={{ color: '#e0b341' }}>FF DB 00 43 00 08 06 06 07 06 05</span>
          </div>
          <div style={{ background: '#26262b', border: '0.5px solid #3a3a40', borderRadius: 10, padding: '14px 16px', marginTop: 8 }}>
            <div style={{ fontSize: 11, color: '#8a8a8e', marginBottom: 10 }}>FILE SIGNATURE REFERENCE</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 24px', fontSize: 12.5 }}>
              <div style={{ color: '#9a9aa5' }}>JPEG</div>
              <div style={{ color: '#5ac8fa' }}>FF D8 FF E0</div>
              <div style={{ color: '#9a9aa5' }}>PNG</div>
              <div style={{ color: '#d4d4d8' }}>89 50 4E 47</div>
              <div style={{ color: '#9a9aa5' }}>PDF</div>
              <div style={{ color: '#d4d4d8' }}>25 50 44 46</div>
              <div style={{ color: '#9a9aa5' }}>ZIP</div>
              <div style={{ color: '#d4d4d8' }}>50 4B 03 04</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 18 }}>
            <button onClick={actions.applyHex} style={{ padding: '10px 20px', border: 0, borderRadius: 8, background: '#0a84ff', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
              적용 후 열기
            </button>
            {!!state.hexErr && <span style={{ color: '#ff6b6b', fontSize: 12.5 }}>{state.hexErr}</span>}
          </div>
        </div>
      </MacWindow>
    </div>
  );
}
