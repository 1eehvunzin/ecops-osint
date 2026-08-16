import type { AppState, Actions } from '../types';
import { CHAT_MAX } from '../types';
import MenuBar from '../components/MenuBar';
import Wallpaper from '../components/Wallpaper';
import { MacWindow, TitleBar } from '../components/MacWindow';

function Bubble({ sender, children, self }: { sender?: string; children: React.ReactNode; self?: boolean }) {
  return (
    <div style={{ alignSelf: self ? 'flex-end' : 'flex-start', maxWidth: '86%', animation: 'bubbleIn .28s ease both' }}>
      {sender && <div style={{ fontSize: 10.5, color: '#8a8a8e', margin: '0 0 3px 8px' }}>{sender}</div>}
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
        {children}
      </div>
    </div>
  );
}

export default function Opening({ state, actions }: { state: AppState; actions: Actions }) {
  const narr = state.narr;
  const narrRunning = narr < CHAT_MAX;
  const narrDone = narr >= CHAT_MAX;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 60, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <Wallpaper />
      <MenuBar appName="Messages" stepLabel="" />

      <div style={{ position: 'relative', zIndex: 2, flex: 1, minHeight: 0 }}>
      <MacWindow width={460} radius={16} draggable resizable="width" minWidth={360} defaultLeft="50%" defaultTop={40} centerX>
        <TitleBar title="E-COPS 단체방" height={52} />

        <div
          style={{
            padding: 18,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            background: '#f2f2f7',
            minHeight: 'min(300px,42vh)',
            maxHeight: '52vh',
            overflow: 'auto',
          }}
        >
          {narr >= 0 && <Bubble sender="부회장">회장님 어디세요?? 세미나 30분 남았어요</Bubble>}
          {narr >= 1 && <Bubble sender="부원1">전화도 안 받아요</Bubble>}
          {narr >= 2 && (
            <Bubble sender="부원2">
              저 방금 학생회관에서 회장님 노트북 주웠는데
              <br />
              화면 안 꺼져있어요;; 로그인도 그대로고
            </Bubble>
          )}
          {narr >= 3 && (
            <Bubble self>
              일단 그걸로 확인해보자.
              <br />
              우리한텐 이 노트북밖에 없어.
            </Bubble>
          )}
          {narr >= CHAT_MAX && (
            <div style={{ alignSelf: 'center', marginTop: 6, textAlign: 'center', animation: 'bubbleIn .32s ease both' }}>
              <div
                style={{
                  display: 'inline-block',
                  background: 'rgba(0,0,0,0.06)',
                  color: '#3a3a3c',
                  fontSize: 11.5,
                  letterSpacing: 0.5,
                  padding: '6px 12px',
                  borderRadius: 999,
                }}
              >
                MISSION
              </div>
              <div style={{ marginTop: 10, fontSize: 14, lineHeight: 1.65, color: '#1c1c1e', maxWidth: 340 }}>
                15분 안에, 이 화면 안에서
                <br />
                <b>회장의 정확한 위치</b>를 찾아내세요.
              </div>
            </div>
          )}
        </div>

        {narrRunning && (
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
              onClick={actions.nextNarr}
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
        {narrDone && (
          <div style={{ padding: 14, background: '#fff', borderTop: '0.5px solid #eee', display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={actions.toDesktop}
              style={{
                padding: '12px 30px',
                border: 0,
                borderRadius: 11,
                background: '#0a84ff',
                color: '#fff',
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 8px 20px rgba(10,132,255,0.35)',
              }}
            >
              회장의 노트북 확인하기 →
            </button>
          </div>
        )}
      </MacWindow>
      </div>
    </div>
  );
}
