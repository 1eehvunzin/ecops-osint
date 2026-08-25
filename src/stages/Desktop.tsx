import type { CSSProperties } from 'react';
import type { AppState, Actions, HiddenFile } from '../types';
import { EGG_TOTAL } from '../types';
import { MacWindow, TitleBar } from '../components/MacWindow';
import { GlyphDoc, GlyphFolder, GlyphImage, GlyphMusicNote } from '../components/icons';

const icons = [
  { icon: <GlyphFolder />, label: '동아리 자료' },
  { icon: <GlyphFolder />, label: '개인 사진' },
  { icon: <GlyphMusicNote />, label: '플레이리스트' },
  { icon: <GlyphImage />, label: '배경화면 후보' },
];

/** 이스터에그 — [보기 > 숨김 항목 표시]를 켜야 드러난다. 진행에는 영향이 없다. */
const hidden: { key: HiddenFile; label: string; icon: React.ReactNode }[] = [
  { key: 'logo', label: '.ecops_logo.png', icon: <GlyphImage /> },
  { key: 'emblem', label: '.ecops_emblem.png', icon: <GlyphImage /> },
  { key: 'notice', label: '.모집공고.txt', icon: <GlyphDoc /> },
];

const RECRUIT_URL = 'https://ecops17th-ewha.notion.site/E-COPS-17th-Recruiting-30112f43f60480f2b08dfc1f53460f7f';

const labelStyle: CSSProperties = {
  fontSize: 11.5,
  color: '#fff',
  textShadow: '0 1px 3px rgba(0,0,0,0.7)',
  marginTop: 6,
  wordBreak: 'keep-all',
};

/* ---------- 우클릭 메뉴 ---------- */

function MenuRow({
  children,
  onClick,
  onMouseEnter,
  submenu,
  checked,
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  onMouseEnter?: () => void;
  submenu?: boolean;
  checked?: boolean;
  disabled?: boolean;
}) {
  return (
    <div
      className={disabled ? undefined : 'ctx-row'}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={onMouseEnter}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '5px 12px 5px 22px',
        fontSize: 13,
        borderRadius: 5,
        color: disabled ? 'rgba(60,60,67,0.4)' : '#1c1c1e',
        cursor: disabled ? 'default' : 'pointer',
        position: 'relative',
        whiteSpace: 'nowrap',
      }}
    >
      {checked && <span style={{ position: 'absolute', left: 7, fontSize: 11 }}>✓</span>}
      <span style={{ flex: 1 }}>{children}</span>
      {submenu && <span style={{ fontSize: 10, opacity: 0.55 }}>▶</span>}
    </div>
  );
}

const panelStyle: CSSProperties = {
  padding: 5,
  minWidth: 190,
  borderRadius: 9,
  background: 'rgba(246,246,248,0.86)',
  backdropFilter: 'blur(28px) saturate(1.8)',
  WebkitBackdropFilter: 'blur(28px) saturate(1.8)',
  border: '0.5px solid rgba(0,0,0,0.14)',
  boxShadow: '0 10px 34px rgba(0,0,0,0.3)',
};

function ContextMenu({ state, actions }: { state: AppState; actions: Actions }) {
  const pos = state.deskMenu;
  if (!pos) return null;
  return (
    <>
      <style>{`.ctx-row:hover { background: #0a84ff; color: #fff !important; }`}</style>
      <div
        onClick={(e) => e.stopPropagation()}
        onContextMenu={(e) => e.preventDefault()}
        onMouseLeave={() => actions.hoverDeskMenuView(false)}
        style={{ position: 'fixed', left: pos.x, top: pos.y, zIndex: 50, display: 'flex', alignItems: 'flex-start' }}
      >
        <div style={panelStyle}>
          <MenuRow disabled>새로운 폴더</MenuRow>
          <MenuRow disabled>정보 가져오기</MenuRow>
          <div style={{ height: 1, background: 'rgba(0,0,0,0.1)', margin: '4px 8px' }} />
          <MenuRow disabled onMouseEnter={() => actions.hoverDeskMenuView(false)}>
            정렬 기준
          </MenuRow>
          <MenuRow submenu onMouseEnter={() => actions.hoverDeskMenuView(true)}>
            보기
          </MenuRow>
          <div style={{ height: 1, background: 'rgba(0,0,0,0.1)', margin: '4px 8px' }} />
          <MenuRow disabled>배경 화면 설정...</MenuRow>
        </div>

        {state.deskMenuView && (
          <div style={{ ...panelStyle, marginLeft: -4, marginTop: 96 }} onMouseEnter={() => actions.hoverDeskMenuView(true)}>
            <MenuRow disabled>아이콘 크기</MenuRow>
            <MenuRow disabled>격자에 맞추기</MenuRow>
            <div style={{ height: 1, background: 'rgba(0,0,0,0.1)', margin: '4px 8px' }} />
            <MenuRow checked={state.showHidden} onClick={actions.toggleHidden}>
              숨김 항목 표시
            </MenuRow>
          </div>
        )}
      </div>
    </>
  );
}

/* ---------- 숨김 파일 뷰어 ---------- */

function HiddenViewer({ state, actions }: { state: AppState; actions: Actions }) {
  const key = state.openHidden;
  if (!key) return null;
  const meta = hidden.find((h) => h.key === key)!;

  if (key === 'notice') {
    return (
      <MacWindow width={520} draggable resizable="width" minWidth={380} defaultLeft="50%" defaultTop={110} centerX>
        <TitleBar title={meta.label} onClose={actions.closeHiddenFile} />
        <div style={{ padding: '22px 24px 24px', fontSize: 13.5, color: '#1c1c1e', lineHeight: 1.9 }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>E-COPS 17th Recruiting</div>
          이화여자대학교 정보보안 동아리 E-COPS가
          <br />
          17기 신입 부원을 모집합니다.
          <div style={{ marginTop: 16, padding: '12px 14px', background: '#f4f4f6', border: '0.5px solid #e0e0e3', borderRadius: 9 }}>
            <div style={{ fontSize: 11, color: '#8a8a8e', marginBottom: 5 }}>모집 공고</div>
            <a href={RECRUIT_URL} target="_blank" rel="noreferrer" style={{ fontSize: 12.5, wordBreak: 'break-all' }}>
              {RECRUIT_URL}
            </a>
          </div>
          <div style={{ marginTop: 14, fontSize: 12, color: '#8a8a8e' }}>
            …회장님, 이런 건 숨김 파일로 두지 마세요.
          </div>
        </div>
      </MacWindow>
    );
  }

  const src = key === 'logo' ? '/assets/ecops_logo.png' : '/assets/ecops_emblem.png';
  return (
    <MacWindow width={520} draggable resizable="width" minWidth={320} defaultLeft="50%" defaultTop={100} centerX>
      <TitleBar title={meta.label} onClose={actions.closeHiddenFile} />
      <div
        style={{
          padding: 28,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'repeating-conic-gradient(#f4f4f6 0% 25%, #eaeaee 0% 50%) 50%/18px 18px',
        }}
      >
        <img src={src} alt={meta.label} style={{ maxWidth: '100%', maxHeight: '52vh', objectFit: 'contain' }} />
      </div>
    </MacWindow>
  );
}

/* ---------- 바탕화면 ---------- */

export default function Desktop({ state, actions }: { state: AppState; actions: Actions }) {
  const found = state.foundEggs.length;

  return (
    <div
      onClick={actions.closeDeskMenu}
      onContextMenu={(e) => {
        e.preventDefault();
        actions.openDeskMenu(e.clientX, e.clientY);
      }}
      style={{ position: 'relative', zIndex: 10, minHeight: 'calc(100vh - 28px)', padding: '30px 36px 120px' }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,84px)', gap: '20px 4px', justifyContent: 'end' }}>
        {icons.map((it, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ width: 52, height: 52, margin: '0 auto', filter: 'drop-shadow(0 3px 5px rgba(0,0,0,0.35))' }}>{it.icon}</div>
            <div style={labelStyle}>{it.label}</div>
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
          <div style={labelStyle}>동아리메일_계정.txt</div>
        </div>

        {state.showHidden &&
          hidden.map((h) => (
            <div
              key={h.key}
              onClick={(e) => {
                e.stopPropagation();
                actions.openHiddenFile(h.key);
              }}
              title="숨김 항목"
              style={{
                textAlign: 'center',
                cursor: 'pointer',
                padding: '5px 3px',
                borderRadius: 8,
                opacity: state.foundEggs.includes(h.key) ? 0.85 : 0.5,
                background: state.openHidden === h.key ? 'rgba(255,255,255,0.16)' : 'transparent',
                animation: 'bubbleIn .3s ease both',
              }}
            >
              <div style={{ width: 44, height: 52, margin: '0 auto', filter: 'drop-shadow(0 3px 5px rgba(0,0,0,0.35))' }}>{h.icon}</div>
              <div style={{ ...labelStyle, fontSize: 10.5, width: 78, margin: '6px auto 0', wordBreak: 'break-all', lineHeight: 1.35 }}>
                {h.label}
              </div>
            </div>
          ))}
      </div>

      {state.showHidden && (
        <div
          style={{
            position: 'fixed',
            left: 18,
            bottom: 108,
            zIndex: 30,
            padding: '7px 13px',
            borderRadius: 999,
            fontSize: 11,
            letterSpacing: 1,
            fontWeight: 700,
            color: '#fff',
            background: 'rgba(20,20,26,0.55)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '0.5px solid rgba(255,255,255,0.18)',
            animation: 'bubbleIn .3s ease both',
          }}
        >
          EASTER EGG {found}/{EGG_TOTAL} FOUND
        </div>
      )}

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

      <HiddenViewer state={state} actions={actions} />
      <ContextMenu state={state} actions={actions} />
    </div>
  );
}
