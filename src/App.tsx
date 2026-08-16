import { useRef, useState } from 'react';
import type { Actions, AppState, Stage } from './types';
import { FILES, INITIAL_STATE, TARGET } from './types';
import MenuBar from './components/MenuBar';
import Dock from './components/Dock';
import Wallpaper from './components/Wallpaper';
import Opening from './stages/Opening';
import Desktop from './stages/Desktop';
import Login from './stages/Login';
import Inbox from './stages/Inbox';
import Downloads from './stages/Downloads';
import Hex from './stages/Hex';
import Osint from './stages/Osint';
import Ending from './stages/Ending';
import Result from './stages/Result';

const CHAT_MAX = 4;

const APP_NAME: Record<Stage, string> = {
  opening: 'Messages',
  desktop: 'Finder',
  login: 'Safari',
  inbox: 'Mail',
  downloads: 'Finder',
  hex: 'Hex Fiend',
  osint: 'Preview',
  ending: 'FaceTime',
  result: 'Finder',
};

const STEP_LABEL: Record<Stage, string> = {
  opening: '',
  desktop: 'STEP 1/7 · DESKTOP',
  login: 'STEP 2/7 · LOGIN',
  inbox: 'STEP 3/7 · INBOX',
  downloads: 'STEP 4/7 · HASH',
  hex: 'STEP 5/7 · HEX',
  osint: 'STEP 6/7 · OSINT',
  ending: 'STEP 7/7',
  result: 'DONE',
};

const CHROME_STAGES: Stage[] = ['desktop', 'login', 'inbox', 'downloads', 'hex', 'osint'];

function App() {
  const [state, setState] = useState<AppState>(INITIAL_STATE);
  const timeoutRef = useRef<number | null>(null);

  const set = (patch: Partial<AppState>) => setState((s) => ({ ...s, ...patch }));

  const actions: Actions = {
    nextNarr: () => setState((s) => ({ ...s, narr: Math.min(s.narr + 1, CHAT_MAX) })),
    toDesktop: () => set({ stage: 'desktop' }),

    openTxt: () => set({ txtOpen: true }),
    closeTxt: () => set({ txtOpen: false }),
    onB64: (v) => set({ b64in: v }),
    toLogin: () => set({ stage: 'login' }),

    onLoginId: (v) => set({ loginId: v, loginErr: '' }),
    onLoginPw: (v) => set({ loginPw: v, loginErr: '' }),
    keyLogin: (key) => {
      if (key === 'Enter') actions.doLogin();
    },
    doLogin: () => {
      setState((s) => {
        const id = (s.loginId || '').trim().toLowerCase().replace('@ecops.club', '');
        const pw = (s.loginPw || '').trim();
        if (id === 'ecopsmail' && pw === 'pwewha123@') return { ...s, stage: 'inbox', loginErr: '' };
        return { ...s, loginErr: '아이디 또는 비밀번호가 올바르지 않습니다.' };
      });
    },

    openM1: () => set({ openMail: 'm1' }),
    openM2: () => set({ openMail: 'm2' }),
    openPcap: () => {
      setState((s) => (s.m1 && s.m2 ? { ...s, openMail: 'pcap' } : s));
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
    toDownloads: () => set({ stage: 'downloads' }),

    selF: (name) => set({ dlSel: name, dlErr: '' }),
    openFile: () => {
      const sel = state.dlSel;
      if (!sel) return;
      if (FILES[sel] !== TARGET) {
        set({ dlErr: '이 파일의 해시는 PCAP 로그의 해시와 일치하지 않습니다. 다른 파일을 확인하세요.' });
        return;
      }
      set({ dlErr: '⚠ 파일을 열 수 없습니다. 지원되지 않는 형식이거나 손상되었습니다. → 헥스에디터로 엽니다…' });
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => set({ stage: 'hex' }), 1100);
    },

    onHexAt: (i, v) => {
      setState((s) => {
        const h = s.hex.slice();
        h[i] = v.toUpperCase().replace(/[^0-9A-F]/g, '');
        return { ...s, hex: h, hexErr: '' };
      });
    },
    applyHex: () => {
      setState((s) => {
        if (s.hex.join(' ') === 'FF D8 FF E0') return { ...s, hexErr: '', stage: 'osint' };
        return { ...s, hexErr: '아직 올바른 JPEG 시그니처가 아닙니다.' };
      });
    },

    zoomIn: () => setState((s) => ({ ...s, zoom: clampZoom(s.zoom + 0.25) })),
    zoomOut: () => setState((s) => ({ ...s, zoom: clampZoom(s.zoom - 0.25) })),
    toggleLoupe: () => setState((s) => ({ ...s, loupe: !s.loupe })),
    toggleInfo: () => setState((s) => ({ ...s, showInfo: !s.showInfo })),
    onImgMove: (x, y, w, h) => set({ mouse: { x, y, w, h, active: true } }),
    onImgLeave: () => setState((s) => ({ ...s, mouse: { ...s.mouse, active: false } })),

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

      {showChrome && <MenuBar appName={APP_NAME[state.stage]} stepLabel={STEP_LABEL[state.stage]} />}

      {state.stage === 'opening' && <Opening state={state} actions={actions} />}
      {state.stage === 'desktop' && <Desktop state={state} actions={actions} />}
      {state.stage === 'login' && <Login state={state} actions={actions} />}
      {state.stage === 'inbox' && <Inbox state={state} actions={actions} />}
      {state.stage === 'downloads' && <Downloads state={state} actions={actions} />}
      {state.stage === 'hex' && <Hex state={state} actions={actions} />}
      {state.stage === 'osint' && <Osint state={state} actions={actions} />}

      {showChrome && <Dock />}

      {state.stage === 'ending' && <Ending actions={actions} />}
      {state.stage === 'result' && <Result actions={actions} />}
    </div>
  );
}

function clampZoom(z: number): number {
  return Math.max(1, Math.min(3.5, Math.round(z * 10) / 10));
}

export default App;
