import type { AppState, Actions } from '../types';
import { MacWindow, TitleBar } from '../components/MacWindow';
import { IconLock } from '../components/icons';

export default function Login({ state, actions }: { state: AppState; actions: Actions }) {
  return (
    <div style={{ position: 'relative', zIndex: 10, minHeight: 'calc(100vh - 28px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px 110px' }}>
      <MacWindow width={400} draggable resizable="width" minWidth={320} defaultLeft="50%" defaultTop={110} centerX>
        <TitleBar
          title={
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#8a8a8e', fontWeight: 400 }}>
              <IconLock size={11} style={{ color: '#8a8a8e' }} />
              webmail.ecops.club
            </span>
          }
        />
        <div style={{ padding: '34px 34px 30px', textAlign: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: 4, color: '#1c1c1e' }}>
            ECOPS WEBMAIL
          </div>
          <div style={{ width: 44, height: 3, background: '#0a84ff', margin: '12px auto 26px', borderRadius: 2 }} />
          <input
            value={state.loginId}
            onChange={(e) => actions.onLoginId(e.target.value)}
            placeholder="ID"
            style={{ width: '100%', height: 42, border: '0.5px solid #cdcdd0', borderRadius: 9, padding: '0 13px', fontSize: 14, marginBottom: 12, outline: 0 }}
          />
          <input
            value={state.loginPw}
            onChange={(e) => actions.onLoginPw(e.target.value)}
            onKeyDown={(e) => actions.keyLogin(e.key)}
            type="password"
            placeholder="Password"
            style={{ width: '100%', height: 42, border: '0.5px solid #cdcdd0', borderRadius: 9, padding: '0 13px', fontSize: 14, outline: 0 }}
          />
          {!!state.loginErr && <div style={{ marginTop: 12, color: '#c0392b', fontSize: 12.5 }}>{state.loginErr}</div>}
          <button
            onClick={actions.doLogin}
            style={{ width: '100%', height: 44, marginTop: 20, border: 0, borderRadius: 9, background: '#0a84ff', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}
          >
            LOGIN
          </button>
          <div style={{ marginTop: 16, fontSize: 11.5, color: '#b0b0b6' }}>동아리메일_계정.txt 의 값을 디코딩해 로그인하세요</div>
        </div>
      </MacWindow>
    </div>
  );
}
