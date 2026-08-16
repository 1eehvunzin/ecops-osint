import type { CSSProperties } from 'react';
import type { AppState, Actions } from '../types';
import { FILES, TARGET } from '../types';
import { MacWindow, TitleBar, ToolbarButton, SearchField } from '../components/MacWindow';
import { GlyphImage, IconChevron, IconGridView, IconListView } from '../components/icons';

const files = ['offer_location.jpg', 'offer_location_old.jpg', 'offer_location(1).jpg'];

function rowStyle(name: string, selected: string | null): CSSProperties {
  return {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '9px 18px',
    cursor: 'pointer',
    background: selected === name ? '#0a84ff' : 'transparent',
    color: selected === name ? '#fff' : '#1c1c1e',
  };
}

export default function Downloads({ state, actions }: { state: AppState; actions: Actions }) {
  const selHash = state.dlSel ? FILES[state.dlSel] : '';
  const isMatch = !!state.dlSel && FILES[state.dlSel] === TARGET;

  return (
    <div style={{ position: 'relative', zIndex: 10, minHeight: 'calc(100vh - 28px)', display: 'flex', justifyContent: 'center', padding: '34px 24px 120px' }}>
      <MacWindow width={780} draggable resizable="width" minWidth={520} defaultLeft="50%" defaultTop={70} centerX>
        <TitleBar
          title="Downloads"
          titleAlign="left"
          height={48}
          leftExtra={
            <div style={{ display: 'flex', gap: 10, color: '#b0b0b6' }}>
              <IconChevron dir="left" size={13} />
              <IconChevron dir="right" size={13} style={{ color: '#3a3a3c' }} />
            </div>
          }
          right={
            <>
              <ToolbarButton title="List view"><IconListView size={13} /></ToolbarButton>
              <ToolbarButton title="Grid view" active><IconGridView size={13} /></ToolbarButton>
              <SearchField value="" onChange={() => {}} placeholder="Search" style={{ width: 128 }} />
            </>
          }
        />
        <div style={{ padding: '10px 18px', background: '#fff8e1', borderBottom: '0.5px solid #f0e6c0', fontSize: 12, color: '#7a5b00' }}>
          찾는 해시 (from PCAP): <b>8f14e45fceea167a5a36dedd4bea2543</b>
        </div>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1, padding: '8px 0' }}>
            {files.map((name) => (
              <div key={name} onClick={() => actions.selF(name)} style={rowStyle(name, state.dlSel)}>
                <GlyphImage size={26} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13.5 }}>{name}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ width: 260, flex: 'none', borderLeft: '0.5px solid #e0e0e3', background: '#f9f9fb', padding: 18 }}>
            {state.dlSel ? (
              <div>
                <div style={{ width: 64, height: 64, marginBottom: 12 }}>
                  <GlyphImage size={64} />
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#1c1c1e', wordBreak: 'break-all' }}>{state.dlSel}</div>
                <div style={{ fontSize: 11, color: '#8a8a8e', margin: '10px 0 4px' }}>MD5</div>
                <div style={{ fontSize: 11, color: isMatch ? '#1b6b3a' : '#8a8a8e', wordBreak: 'break-all' }}>{selHash}</div>
                <div style={{ fontSize: 11.5, marginTop: 8, color: isMatch ? '#1b6b3a' : '#8a8a8e', fontWeight: 600 }}>{isMatch ? '★ 해시 일치' : '해시 불일치'}</div>
                <button onClick={actions.openFile} style={{ width: '100%', marginTop: 16, height: 36, border: 0, borderRadius: 8, background: '#0a84ff', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                  열기
                </button>
                {!!state.dlErr && (
                  <div style={{ marginTop: 12, padding: 10, background: '#fdecea', border: '1px solid #f5b7b1', borderRadius: 8, fontSize: 12, color: '#a11', lineHeight: 1.5 }}>
                    {state.dlErr}
                  </div>
                )}
              </div>
            ) : (
              <div style={{ color: '#b0b0b6', fontSize: 12.5, textAlign: 'center', marginTop: 40 }}>파일을 선택하면 속성이 표시됩니다</div>
            )}
          </div>
        </div>
      </MacWindow>
    </div>
  );
}
