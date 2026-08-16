export type Stage =
  | 'opening'
  | 'desktop'
  | 'login'
  | 'inbox'
  | 'downloads'
  | 'hex'
  | 'osint'
  | 'ending'
  | 'result';

export type MailKey = 'm1' | 'm2' | 'pcap' | null;

export interface MouseState {
  x: number;
  y: number;
  w: number;
  h: number;
  active: boolean;
}

export interface AppState {
  stage: Stage;
  narr: number;
  txtOpen: boolean;
  b64in: string;
  loginId: string;
  loginPw: string;
  loginErr: string;
  openMail: MailKey;
  m1: boolean;
  m2: boolean;
  m1bad: number | null;
  m2bad: number | null;
  dlSel: string | null;
  dlErr: string;
  hex: string[];
  hexErr: string;
  zoom: number;
  loupe: boolean;
  showInfo: boolean;
  mouse: MouseState;
  query: string;
  status: 'wrong' | 'correct' | null;
  solved: boolean;
}

export const INITIAL_STATE: AppState = {
  stage: 'opening',
  narr: 0,
  txtOpen: false,
  b64in: '',
  loginId: '',
  loginPw: '',
  loginErr: '',
  openMail: null,
  m1: false,
  m2: false,
  m1bad: null,
  m2bad: null,
  dlSel: null,
  dlErr: '',
  hex: ['00', '00', '00', '00'],
  hexErr: '',
  zoom: 1,
  loupe: false,
  showInfo: true,
  mouse: { x: 0, y: 0, w: 1, h: 1, active: false },
  query: '',
  status: null,
  solved: false,
};

export const IMG = '/assets/offer_location.png';
export const R = 88;
export const LZ = 2.6;
export const CHAT_MAX = 4;

export const FILES: Record<string, string> = {
  'offer_location.jpg': '3b1f74a209b0d4e4f5b4c3d2a1908b6c',
  'offer_location_old.jpg': '1a79a4d60de6718e8e5b326e338ae533',
  'offer_location(1).jpg': '8f14e45fceea167a5a36dedd4bea2543',
};
export const TARGET = '8f14e45fceea167a5a36dedd4bea2543';

export interface Actions {
  nextNarr: () => void;
  toDesktop: () => void;
  openTxt: () => void;
  closeTxt: () => void;
  onB64: (v: string) => void;
  toLogin: () => void;
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
  toDownloads: () => void;
  selF: (name: string) => void;
  openFile: () => void;
  onHexAt: (i: number, v: string) => void;
  applyHex: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  toggleLoupe: () => void;
  toggleInfo: () => void;
  onImgMove: (x: number, y: number, w: number, h: number) => void;
  onImgLeave: () => void;
  onQuery: (v: string) => void;
  keyQuery: (key: string) => void;
  submitQuery: () => void;
  openResult: () => void;
  restart: () => void;
}
