import { useRef, useState } from 'react';
import type { Actions, AppState, Stage } from './types';
import { INITIAL_STATE } from './types';
import MenuBar from './components/MenuBar';
import Dock from './components/Dock';
import Wallpaper from './components/Wallpaper';
import Opening from './stages/Opening';
import Desktop from './stages/Desktop';
import Login from './stages/Login';
import Inbox from './stages/Inbox';
import Osint from './stages/Osint';
import Ending from './stages/Ending';
import Result from './stages/Result';

const CHAT_MAX = 4;

const APP_NAME: Record<Stage, string> = {
  opening: 'Messages',
  desktop: 'Finder',
  login: 'Safari',
  inbox: 'Mail',
  osint: 'Maps',
  ending: 'FaceTime',
  result: 'Finder',
};

const STEP_LABEL: Record<Stage, string> = {
  opening: '',
  desktop: 'STEP 1/5 · DESKTOP',
  login: 'STEP 2/5 · LOGIN',
  inbox: 'STEP 3/5 · INBOX',
  osint: 'STEP 4/5 · OSINT',
  ending: 'STEP 5/5',
  result: 'DONE',
};

const CHROME_STAGES: Stage[] = ['desktop', 'login', 'inbox', 'osint'];

function App() {
  const [state, setState] = useState<AppState>(INITIAL_STATE);
  const timeoutRef = useRef<number | null>(null);

  const set = (patch: Partial<AppState>) => setState((s) => ({ ...s, ...patch }));

  const actions: Actions = {
    nextNarr: () => setState((s) => ({ ...s, narr: Math.min(s.narr + 1, CHAT_MAX) })),
    toDesktop: () => setState((s) => ({ ...s, stage: 'desktop', missionStart: s.missionStart ?? Date.now() })),

    openTxt: () => set({ txtOpen: true }),
    closeTxt: () => set({ txtOpen: false }),
    toLogin: () => set({ stage: 'login' }),
    toInbox: () => set({ stage: 'inbox' }),

    onLoginId: (v) => set({ loginId: v, loginErr: '' }),
    onLoginPw: (v) => set({ loginPw: v, loginErr: '' }),
    keyLogin: (key) => {
      if (key === 'Enter') actions.doLogin();
    },
    doLogin: () => {
      setState((s) => {
        const id = (s.loginId || '').trim().toLowerCase().replace('@ecops.club', '');
        const pw = (s.loginPw || '').trim();
        if (id === 'ecopsmail' && pw === 'pwewha123@') return { ...s, stage: 'inbox', loginErr: '', loggedIn: true };
        return { ...s, loginErr: '아이디 또는 비밀번호가 올바르지 않습니다.' };
      });
    },

    openM1: () => set({ openMail: 'm1' }),
    openM2: () => set({ openMail: 'm2' }),
    openPcap: () => {
      setState((s) => (s.m1 && s.m2 ? { ...s, openMail: 'pcap', mapsUnlocked: true } : s));
    },
    backInbox: () => set({ openMail: null }),
    pickM1: (i) => {
      if (i === 1) set({ m1: true, m1bad: null });
      else set({ m1bad: i });
    },
    pickM2: (i) => {
      if (i === 1) set({ m2: true, m2bad: null });
      else set({ m2bad: i });
    },
    toOsint: () => set({ stage: 'osint' }),

    onQuery: (v) => set({ query: v, status: null }),
    keyQuery: (key) => {
      if (key === 'Enter') actions.submitQuery();
    },
    submitQuery: () => {
      const q = (state.query || '').toLowerCase().replace(/\s|·/g, '');
      const keywords = ['아산공학관', '아산공학', 'asan', 'asanengineering', 'asanhall', '아산관'];
      const ok = keywords.some((k) => q.includes(k.toLowerCase().replace(/\s/g, '')));
      if (ok) {
        set({ status: 'correct', solved: true });
        if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
        timeoutRef.current = window.setTimeout(() => set({ stage: 'ending' }), 1400);
      } else {
        set({ status: 'wrong' });
      }
    },

    openResult: () => set({ stage: 'result' }),
    restart: () => setState(INITIAL_STATE),
  };

  const showChrome = CHROME_STAGES.includes(state.stage);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        overflow: 'hidden',
        fontFamily: "-apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',sans-serif",
        background: '#12101f',
        color: '#111',
      }}
    >
      <Wallpaper />

      {showChrome && <MenuBar appName={APP_NAME[state.stage]} stepLabel={STEP_LABEL[state.stage]} missionStart={state.missionStart} />}

      {state.stage === 'opening' && <Opening state={state} actions={actions} />}
      {state.stage === 'desktop' && <Desktop state={state} actions={actions} />}
      {state.stage === 'login' && <Login state={state} actions={actions} />}
      {state.stage === 'inbox' && <Inbox state={state} actions={actions} />}
      {state.stage === 'osint' && <Osint state={state} actions={actions} />}

      {showChrome && <Dock state={state} actions={actions} />}

      {state.stage === 'ending' && <Ending actions={actions} />}
      {state.stage === 'result' && <Result actions={actions} />}
    </div>
  );
}

export default App;
