import type { CSSProperties, MouseEvent } from 'react';
import type { AppState, Actions } from '../types';
import { IMG, R, LZ } from '../types';
import { MacWindow, TitleBar, ToolbarButton, SearchField } from '../components/MacWindow';
import { IconCheckCircle, IconInfoCircle, IconLoupe, IconWarningTriangle, IconXCircle } from '../components/icons';

export default function Osint({ state, actions }: { state: AppState; actions: Actions }) {
  const zoomPct = Math.round(state.zoom * 100) + '%';
  const imgStyle: CSSProperties = {
    width: Math.round(640 * state.zoom) + 'px',
    height: 'auto',
    display: 'block',
    userSelect: 'none',
    cursor: state.loupe ? 'none' : 'default',
    boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
  };

  let loupeStyle: CSSProperties | null = null;
  if (state.loupe && state.mouse.active) {
    const { x, y, w, h } = state.mouse;
    loupeStyle = {
      position: 'absolute',
      left: x - R + 'px',
      top: y - R + 'px',
      width: R * 2 + 'px',
      height: R * 2 + 'px',
      borderRadius: '50%',
      border: '3px solid rgba(255,255,255,0.9)',
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
      pointerEvents: 'none',
      backgroundImage: `url(${IMG})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: `${w * LZ}px ${h * LZ}px`,
      backgroundPosition: `${-(x * LZ - R)}px ${-(y * LZ - R)}px`,
      zIndex: 5,
    };
  }

  const statusMap = {
    wrong: { msg: '일치하는 위치가 없습니다. 건물·지붕선·계단을 다시 살펴보세요.', bg: '#fdecea', bd: '#f5b7b1', fg: '#a11', Icon: IconXCircle },
    correct: { msg: '위치 확인 — 아산공학관. 연결 중…', bg: '#d8f3dc', bd: '#95d5b2', fg: '#1b6b3a', Icon: IconCheckCircle },
  } as const;
  const st = state.status ? statusMap[state.status] : null;

  const onImgMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    actions.onImgMove(e.clientX - r.left, e.clientY - r.top, r.width, r.height);
  };

  return (
    <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexWrap: 'wrap', gap: 26, alignItems: 'flex-start', justifyContent: 'center', padding: '34px 28px 130px' }}>
      {/* PREVIEW */}
      <MacWindow
        width={1000}
        height={620}
        style={{ background: '#ececed' }}
        draggable
        resizable="both"
        minWidth={640}
        minHeight={420}
        defaultLeft="calc(50% - 723px)"
        defaultTop={34}
      >
        <TitleBar
          title="offer_location.jpg — Recovered"
          right={
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <ToolbarButton onClick={actions.zoomOut} title="Zoom out">−</ToolbarButton>
                <span style={{ fontSize: 12, color: '#555', fontVariantNumeric: 'tabular-nums', width: 40, textAlign: 'center' }}>{zoomPct}</span>
                <ToolbarButton onClick={actions.zoomIn} title="Zoom in">+</ToolbarButton>
              </div>
              <ToolbarButton onClick={actions.toggleLoupe} active={state.loupe}>
                <IconLoupe size={12} /> Loupe
              </ToolbarButton>
              <ToolbarButton onClick={actions.toggleInfo}>
                <IconInfoCircle size={12} /> Info
              </ToolbarButton>
            </>
          }
        />
        <div style={{ display: 'flex', background: '#d9d9dc', flex: 1, minHeight: 0 }}>
          <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 22, overflow: 'auto' }}>
            <div style={{ position: 'relative', lineHeight: 0 }} onMouseMove={onImgMove} onMouseLeave={actions.onImgLeave}>
              <img src={IMG} draggable={false} style={imgStyle} alt="offer_location" />
              {loupeStyle && <div style={loupeStyle} />}
            </div>
          </div>
          {state.showInfo && (
            <div style={{ width: 280, flex: 'none', background: '#f4f4f6', borderLeft: '0.5px solid #cfcfd2', padding: '16px 16px 20px', overflow: 'auto' }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.6, color: '#8a8a8e', textTransform: 'uppercase', marginBottom: 10 }}>General Info</div>
              <div style={{ fontSize: 12.5, color: '#1c1c1e', display: 'flex', flexDirection: 'column', gap: 9 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}><span style={{ color: '#8a8a8e' }}>Name</span><span style={{ textAlign: 'right', fontSize: 11 }}>offer_location.jpg</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}><span style={{ color: '#8a8a8e' }}>Kind</span><span>JPEG image</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}><span style={{ color: '#8a8a8e' }}>Dimensions</span><span>927 × 675</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}><span style={{ color: '#8a8a8e' }}>Status</span><span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: '#28a745', fontWeight: 600 }}><IconCheckCircle size={12} />Recovered</span></div>
              </div>
              <div style={{ height: 1, background: '#e0e0e3', margin: '16px 0' }} />
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.6, color: '#8a8a8e', textTransform: 'uppercase', marginBottom: 10 }}>EXIF</div>
              <div style={{ fontSize: 12.5, color: '#1c1c1e', display: 'flex', flexDirection: 'column', gap: 9 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}><span style={{ color: '#8a8a8e' }}>Device</span><span>NIKON D5600</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}><span style={{ color: '#8a8a8e' }}>Taken</span><span>2024:08:14 11:42</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}><span style={{ color: '#8a8a8e' }}>ISO</span><span>100 · f/8 · 1/320s</span></div>
              </div>
              <div style={{ marginTop: 16, padding: '11px 12px', background: '#fff3cd', border: '1px solid #ffe08a', borderRadius: 8, fontSize: 12, color: '#7a5b00', lineHeight: 1.5 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontWeight: 700 }}>
                  <IconWarningTriangle size={12} /> GPS: Not embedded.
                </span>
                <br />
                좌표 정보가 없습니다. 이미지 속 시각 단서로 위치를 특정하세요.
              </div>
              <div style={{ marginTop: 12, fontSize: 11.5, color: '#8a8a8e', lineHeight: 1.6 }}>
                Tip — <b>Loupe</b> 를 켜고 프레임 위를 훑어보세요. 건물·지붕선·계단을 지도 이미지와 비교한 뒤 Maps 에서 위치를 검색합니다.
              </div>
            </div>
          )}
        </div>
      </MacWindow>

      {/* MAPS */}
      <MacWindow
        width={420}
        height={420}
        draggable
        resizable="both"
        minWidth={320}
        minHeight={320}
        defaultLeft="calc(50% + 303px)"
        defaultTop={34}
      >
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
        <div
          style={{
            position: 'relative',
            flex: 1,
            minHeight: 0,
            background:
              'repeating-linear-gradient(0deg,#e9efe6 0 39px,#dfe7db 39px 40px),repeating-linear-gradient(90deg,#e9efe6 0 39px,#dfe7db 39px 40px)',
          }}
        >
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(120,170,120,0.14),rgba(90,130,160,0.14))' }} />
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
