import type { AppState, Actions } from '../types';
import { HINT_MAX } from '../types';
import { MacWindow, TitleBar } from './MacWindow';
import { GlyphMessageBubble } from './icons';

/** 힌트 대화. 진행에 꼭 필요한 내용이라 알림으로 띄우고, 직접 답장하며 읽게 한다. */
const LINES: { who?: string; text: string; self?: boolean }[] = [
  { who: '부원1', text: '야 이거 어디서 본 것 같은데' },
  { who: '부원1', text: '우리 E-COPS 처음 들어와서 비기너였을 때 포렌식 실습했었잖아' },
  { self: true, text: '음 기억이 잘 안 나는데…' },
  { who: '부원1', text: '세션 내용 인스타에 정리해서 올렸을걸?' },
  { who: '부원1', text: '15기 3주차 정규세션 게시물 6페이지.' },
  { self: true, text: '?왜이렇게 구체적으로 알아' },
];

function AppIcon({ size = 38 }: { size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        flex: 'none',
        borderRadius: size * 0.25,
        background: 'linear-gradient(160deg,#6bf08a,#0fb64f)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 1px 3px rgba(0,0,0,0.25)',
      }}
    >
      <GlyphMessageBubble size={size * 0.55} />
    </div>
  );
}

function Bubble({ who, text, self }: { who?: string; text: string; self?: boolean }) {
  return (
    <div style={{ alignSelf: self ? 'flex-end' : 'flex-start', maxWidth: '86%', animation: 'bubbleIn .28s ease both' }}>
      {who && <div style={{ fontSize: 10.5, color: '#8a8a8e', margin: '0 0 3px 8px' }}>{who}</div>}
      <div
        style={{
          background: self ? '#0a84ff' : '#fff',
          color: self ? '#fff' : '#1c1c1e',
          borderRadius: 14,
          padding: '9px 13px',
          fontSize: 13.5,
          lineHeight: 1.5,
          boxShadow: self ? undefined : '0 1px 1px rgba(0,0,0,0.05)',
        }}
      >
        {text}
      </div>
    </div>
  );
}

export default function ChatHint({ state, actions }: { state: AppState; actions: Actions }) {
  if (state.chatHint === 'none') return null;

  if (state.chatHint === 'banner') {
    return (
      <div
        onClick={actions.expandChatHint}
        role="button"
        style={{
          position: 'fixed',
          top: 38,
          right: 14,
          zIndex: 70,
          width: 370,
          maxWidth: 'calc(100% - 28px)',
          display: 'flex',
          gap: 11,
          padding: '13px 15px',
          borderRadius: 17,
          cursor: 'pointer',
          background: 'rgba(248,248,250,0.78)',
          backdropFilter: 'blur(32px) saturate(1.8)',
          WebkitBackdropFilter: 'blur(32px) saturate(1.8)',
          border: '0.5px solid rgba(255,255,255,0.5)',
          boxShadow: '0 12px 34px rgba(0,0,0,0.32), 0 2px 8px rgba(0,0,0,0.16)',
          animation: 'notifIn .34s cubic-bezier(.2,.9,.25,1) both',
        }}
      >
        <AppIcon />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#1c1c1e' }}>메시지</span>
            <span style={{ fontSize: 11, color: '#8a8a8e' }}>지금</span>
          </div>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: '#1c1c1e', marginTop: 2 }}>E-COPS 단체방</div>
          <div
            style={{
              fontSize: 12.5,
              color: '#3a3a3c',
              marginTop: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            부원1: {LINES[0].text}
          </div>
          <div style={{ fontSize: 11, color: '#0a84ff', marginTop: 6, fontWeight: 600 }}>클릭해서 대화 보기</div>
        </div>
      </div>
    );
  }

  const shown = LINES.slice(0, state.hintStep);
  const done = state.hintStep >= HINT_MAX;

  return (
    /* 진짜 창처럼 자유롭게 옮길 수 있도록, 배경은 클릭을 통과시킨다. */
    <div style={{ position: 'fixed', inset: 0, zIndex: 70, pointerEvents: 'none' }}>
      <MacWindow
        width={430}
        radius={16}
        draggable
        resizable="width"
        minWidth={340}
        defaultLeft="50%"
        defaultTop={96}
        centerX
        style={{ pointerEvents: 'auto', animation: 'notifIn .24s ease both' }}
      >
        <TitleBar title="E-COPS 단체방" height={52} onClose={actions.closeChatHint} />
        <div
          style={{
            padding: 18,
            display: 'flex',
            flexDirection: 'column',
            gap: 11,
            background: '#f2f2f7',
            minHeight: 'min(260px,38vh)',
            maxHeight: '48vh',
            overflowY: 'auto',
          }}
        >
          {shown.map((l, i) => (
            <Bubble key={i} who={shown[i - 1]?.who !== l.who ? l.who : undefined} text={l.text} self={l.self} />
          ))}
        </div>

        {!done && (
          <div style={{ padding: '9px 11px', background: '#fff', borderTop: '0.5px solid #eee', display: 'flex', alignItems: 'center', gap: 9 }}>
            <div
              style={{
                flex: 1,
                height: 36,
                border: '1px solid #d6d6d9',
                borderRadius: 18,
                display: 'flex',
                alignItems: 'center',
                padding: '0 15px',
                color: '#b0b0b6',
                fontSize: 13.5,
              }}
            >
              iMessage
            </div>
            <button
              onClick={actions.nextHint}
              aria-label="보내기"
              style={{
                width: 36,
                height: 36,
                border: 0,
                borderRadius: '50%',
                background: '#0a84ff',
                color: '#fff',
                fontSize: 18,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'sendPulse 1.15s ease-in-out infinite',
              }}
            >
              ↑
            </button>
          </div>
        )}
        {done && (
          <div style={{ padding: 14, background: '#fff', borderTop: '0.5px solid #eee', display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={actions.closeChatHint}
              style={{
                padding: '10px 26px',
                border: 0,
                borderRadius: 10,
                background: '#0a84ff',
                color: '#fff',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              확인
            </button>
          </div>
        )}
      </MacWindow>
    </div>
  );
}
