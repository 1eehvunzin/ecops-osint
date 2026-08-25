import type { Actions, ChatHint as ChatHintState } from '../types';
import { MacWindow, TitleBar } from './MacWindow';
import { GlyphMessageBubble } from './icons';

/** 힌트 대화. 진행에 꼭 필요한 내용이라 놓치지 않도록 알림으로 띄운다. */
const LINES: [string, string][] = [
  ['부원1', '야 이거 어디서 본 것 같은데'],
  ['부원1', '우리 E-COPS 처음 들어와서 비기너였을 때 포렌식 실습했었잖아'],
  ['부원2', '기억안나는데'],
  ['부원1', '세션 내용 인스타에 정리해서 올렸을걸?'],
  ['부원1', '15기 3주차 정규세션 게시물 6페이지.'],
  ['부원2', '?왜이렇게 구체적으로 알아'],
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

export default function ChatHint({ state, actions }: { state: ChatHintState; actions: Actions }) {
  if (state === 'none') return null;

  if (state === 'banner') {
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
            부원1: 야 이거 어디서 본 것 같은데
          </div>
          <div style={{ fontSize: 11, color: '#0a84ff', marginTop: 6, fontWeight: 600 }}>클릭해서 대화 보기</div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 70,
        background: 'rgba(0,0,0,0.32)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        animation: 'notifIn .22s ease both',
      }}
    >
      <MacWindow width={440} radius={16}>
        <TitleBar title="E-COPS 단체방" height={52} onClose={actions.closeChatHint} />
        <div
          style={{
            padding: 18,
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            background: '#f2f2f7',
            maxHeight: '58vh',
            overflowY: 'auto',
          }}
        >
          {LINES.map(([who, msg], i) => (
            <div key={i} style={{ alignSelf: 'flex-start', maxWidth: '88%', animation: 'bubbleIn .28s ease both' }}>
              {LINES[i - 1]?.[0] !== who && (
                <div style={{ fontSize: 10.5, color: '#8a8a8e', margin: '0 0 3px 8px' }}>{who}</div>
              )}
              <div
                style={{
                  background: '#fff',
                  color: '#1c1c1e',
                  borderRadius: 14,
                  padding: '9px 13px',
                  fontSize: 13.5,
                  lineHeight: 1.5,
                  boxShadow: '0 1px 1px rgba(0,0,0,0.05)',
                }}
              >
                {msg}
              </div>
            </div>
          ))}
        </div>
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
      </MacWindow>
    </div>
  );
}
