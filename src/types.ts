export type Stage =
  | 'opening'
  | 'desktop'
  | 'login'
  | 'inbox'
  | 'osint'
  | 'ending'
  | 'result';

export type MailKey = 'm1' | 'm2' | 'pcap' | null;

/** 단톡방 힌트 알림: 안 뜸 / 알림 배너 / 대화창 열림 */
export type ChatHint = 'none' | 'banner' | 'open';

export interface AppState {
  stage: Stage;
  narr: number;
  txtOpen: boolean;
  loginId: string;
  loginPw: string;
  loginErr: string;
  loggedIn: boolean;
  openMail: MailKey;
  pcapMailArrived: boolean;
  chatHint: ChatHint;
  /** 알림을 한 번이라도 띄웠는지 — 닫은 뒤 다시 자동으로 뜨지 않게 한다. */
  chatHintShown: boolean;
  /** 힌트 대화에서 지금까지 보인 말풍선 개수 */
  hintStep: number;
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
  pcapMailArrived: false,
  chatHint: 'none',
  chatHintShown: false,
  hintStep: 1,
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

export const CHAT_MAX = 5;

/** 힌트 대화 말풍선 총 개수 */
export const HINT_MAX = 6;

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
  expandChatHint: () => void;
  nextHint: () => void;
  openChatHint: () => void;
  closeChatHint: () => void;
  pickM1: (i: number) => void;
  pickM2: (i: number) => void;
  toOsint: () => void;
  onQuery: (v: string) => void;
  keyQuery: (key: string) => void;
  submitQuery: () => void;
  openResult: () => void;
  restart: () => void;
}
