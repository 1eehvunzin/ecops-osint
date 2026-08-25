export type Stage =
  | 'opening'
  | 'desktop'
  | 'login'
  | 'inbox'
  | 'osint'
  | 'ending'
  | 'result';

export type MailKey = 'm1' | 'm2' | 'pcap' | null;

/** 이스터에그 — 바탕화면의 숨김 파일 */
export type HiddenFile = 'logo' | 'emblem' | 'notice';

/** 단톡방 힌트 알림: 안 뜸 / 알림 배너 / 대화창 열림 */
export type ChatHint = 'none' | 'banner' | 'open';

export interface AppState {
  stage: Stage;
  narr: number;
  txtOpen: boolean;
  /** 바탕화면 우클릭 메뉴 위치 (null이면 닫힘) */
  deskMenu: { x: number; y: number } | null;
  /** [보기] 하위 메뉴가 펼쳐졌는지 */
  deskMenuView: boolean;
  showHidden: boolean;
  openHidden: HiddenFile | null;
  foundEggs: HiddenFile[];
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
  deskMenu: null,
  deskMenuView: false,
  showHidden: false,
  openHidden: null,
  foundEggs: [],
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

/** 숨겨둔 이스터에그 파일 개수 */
export const EGG_TOTAL = 3;

export interface Actions {
  nextNarr: () => void;
  toDesktop: () => void;
  openTxt: () => void;
  closeTxt: () => void;
  openDeskMenu: (x: number, y: number) => void;
  closeDeskMenu: () => void;
  hoverDeskMenuView: (open: boolean) => void;
  toggleHidden: () => void;
  openHiddenFile: (f: HiddenFile) => void;
  closeHiddenFile: () => void;
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
