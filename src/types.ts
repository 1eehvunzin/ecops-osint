export type Stage =
  | 'opening'
  | 'desktop'
  | 'login'
  | 'inbox'
  | 'osint'
  | 'ending'
  | 'result';

export type MailKey = 'm1' | 'm2' | 'pcap' | null;

export interface AppState {
  stage: Stage;
  narr: number;
  txtOpen: boolean;
  loginId: string;
  loginPw: string;
  loginErr: string;
  loggedIn: boolean;
  openMail: MailKey;
  m1: boolean;
  m2: boolean;
  m1bad: number | null;
  m2bad: number | null;
  mapsUnlocked: boolean;
  missionStart: number | null;
  query: string;
  status: 'wrong' | 'correct' | null;
  solved: boolean;
}

export const INITIAL_STATE: AppState = {
  stage: 'opening',
  narr: 0,
  txtOpen: false,
  loginId: '',
  loginPw: '',
  loginErr: '',
  loggedIn: false,
  openMail: null,
  m1: false,
  m2: false,
  m1bad: null,
  m2bad: null,
  mapsUnlocked: false,
  missionStart: null,
  query: '',
  status: null,
  solved: false,
};

export const CHAT_MAX = 4;

export interface Actions {
  nextNarr: () => void;
  toDesktop: () => void;
  openTxt: () => void;
  closeTxt: () => void;
  toLogin: () => void;
  toInbox: () => void;
  onLoginId: (v: string) => void;
  onLoginPw: (v: string) => void;
  keyLogin: (key: string) => void;
  doLogin: () => void;
  openM1: () => void;
  openM2: () => void;
  openPcap: () => void;
  backInbox: () => void;
  pickM1: (i: number) => void;
  pickM2: (i: number) => void;
  toOsint: () => void;
  onQuery: (v: string) => void;
  keyQuery: (key: string) => void;
  submitQuery: () => void;
  openResult: () => void;
  restart: () => void;
}
