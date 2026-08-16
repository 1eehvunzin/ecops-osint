import type { CSSProperties } from 'react';
import type { AppState, Actions } from '../types';
import { MacWindow, TitleBar } from '../components/MacWindow';
import { IconLock, IconPaperclip, IconPin } from '../components/icons';

function optStyle(kind: 'idle' | 'ok' | 'bad'): CSSProperties {
  const base: CSSProperties = {
    textAlign: 'left',
    padding: '12px 14px',
    borderRadius: 10,
    fontSize: 13.5,
    cursor: 'pointer',
    border: '0.5px solid #d6d6d9',
    background: '#f7f7f9',
    color: '#1c1c1e',
  };
  if (kind === 'ok') return { ...base, background: '#d8f3dc', border: '1px solid #95d5b2', color: '#1b6b3a', fontWeight: 600 };
  if (kind === 'bad') return { ...base, background: '#fdecea', border: '1px solid #f5b7b1', color: '#a11' };
  return base;
}

export default function Inbox({ state, actions }: { state: AppState; actions: Actions }) {
  const unlocked = state.m1 && state.m2;

  return (
    <div style={{ position: 'relative', zIndex: 10, minHeight: 'calc(100vh - 28px)', display: 'flex', justifyContent: 'center', padding: '34px 24px 120px' }}>
      <MacWindow width={860} draggable resizable="width" minWidth={480} defaultLeft="50%" defaultTop={60} centerX>
        <TitleBar title="ECOPS Webmail — Inbox" />

        {state.openMail === null && (
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '11px 18px',
                background: unlocked ? '#e8f7ee' : '#fff8e1',
                borderBottom: '0.5px solid #eee',
                fontSize: 12.5,
                color: unlocked ? '#1b6b3a' : '#7a5b00',
              }}
            >
              <IconPin size={12} style={{ color: unlocked ? '#1b6b3a' : '#c88a00' }} />
              <span>{unlocked ? '모든 메일이 표시됩니다.' : '우선순위 정리함 작동 중 — 안읽음 긴급 메일 2건을 처리해야 이전 메일함이 표시됩니다.'}</span>
            </div>

            <div onClick={actions.openM1} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '15px 18px', borderBottom: '0.5px solid #f0f0f2', cursor: 'pointer' }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#fff', background: '#ff9500', padding: '3px 8px', borderRadius: 6 }}>신규</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#1c1c1e' }}>동아리 가입 문의드립니다</div>
                <div style={{ fontSize: 12, color: '#8a8a8e' }}>가입희망 · 문의자가 대화창에 접속 중 ⏱</div>
              </div>
              <span style={{ fontSize: 13, color: state.m1 ? '#28a745' : '#ff9500', fontWeight: 600 }}>{state.m1 ? '완료 ✓' : '미처리'}</span>
            </div>

            <div onClick={actions.openM2} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '15px 18px', borderBottom: '0.5px solid #f0f0f2', cursor: 'pointer' }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#fff', background: '#ff3b30', padding: '3px 8px', borderRadius: 6 }}>확인요청</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#1c1c1e' }}>연합세미나 참석 인원 확인 부탁드립니다</div>
                <div style={{ fontSize: 12, color: '#8a8a8e' }}>세미나 운영팀 · 미회신 시 참가 자동취소 ⚠</div>
              </div>
              <span style={{ fontSize: 13, color: state.m2 ? '#28a745' : '#ff9500', fontWeight: 600 }}>{state.m2 ? '완료 ✓' : '미처리'}</span>
            </div>

            <div
              onClick={actions.openPcap}
              style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '15px 18px', borderBottom: '0.5px solid #f0f0f2', cursor: unlocked ? 'pointer' : 'not-allowed', opacity: unlocked ? 1 : 0.45 }}
            >
              <span style={{ fontSize: 11, fontWeight: 700, color: '#fff', background: '#8e8e93', padding: '3px 8px', borderRadius: 6 }}>긴급</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#1c1c1e' }}>네트워크 이상 기록 확인 바람</div>
                <div style={{ fontSize: 12, color: '#8a8a8e' }}>관리팀 · 첨부: president_0213.pcap</div>
              </div>
              <span style={{ color: '#8a8a8e' }}>{!unlocked && <IconLock size={12} />}</span>
            </div>

            <div style={{ padding: '14px 18px', borderBottom: '0.5px solid #f5f5f6', opacity: 0.5, fontSize: 13, color: '#8a8a8e' }}>
              [뉴스레터] 이번 주 보안 동향 요약
            </div>
            <div style={{ padding: '14px 18px', opacity: 0.5, fontSize: 13, color: '#8a8a8e' }}>[영수증] 클라우드 구독 결제 안내</div>
          </div>
        )}

        {state.openMail === 'm1' && (
          <div style={{ padding: '22px 26px' }}>
            <button onClick={actions.backInbox} style={{ border: 0, background: 'none', color: '#0a84ff', fontSize: 13, cursor: 'pointer', padding: 0, marginBottom: 16 }}>
              ← Inbox
            </button>
            <div style={{ fontSize: 17, fontWeight: 700, color: '#1c1c1e' }}>동아리 가입 문의드립니다</div>
            <div style={{ fontSize: 12, color: '#8a8a8e', margin: '4px 0 18px' }}>from 가입희망 &lt;newbie@ewha.ac.kr&gt;</div>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: '#2c2c2e' }}>
              안녕하세요! E-COPS 동아리에 관심이 있어 문의드립니다.
              <br />
              <b>E-COPS는 어떤 활동을 주로 진행하나요?</b>
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
              <button onClick={() => actions.pickM1(0)} style={optStyle(state.m1 ? 'idle' : state.m1bad === 0 ? 'bad' : 'idle')}>
                ① 2개의 트랙으로 나누어 진행
              </button>
              <button onClick={() => actions.pickM1(1)} style={optStyle(state.m1 ? 'ok' : 'idle')}>
                ② 보안 이론 공부 및 프로젝트 진행
              </button>
              <button onClick={() => actions.pickM1(2)} style={optStyle(state.m1 ? 'idle' : state.m1bad === 2 ? 'bad' : 'idle')}>
                ③ 상업용 게임 개발 및 퍼블리싱
              </button>
            </div>
            {(state.m1 || state.m1bad !== null) && (
              <div
                style={{
                  marginTop: 14,
                  padding: '10px 12px',
                  borderRadius: 8,
                  fontSize: 12.5,
                  background: state.m1 ? '#d8f3dc' : '#fdecea',
                  color: state.m1 ? '#1b6b3a' : '#a11',
                }}
              >
                {state.m1 ? '✓ 정답입니다. 문의자에게 답변이 전송되었습니다.' : '✕ 다시 선택해 보세요.'}
              </div>
            )}
          </div>
        )}

        {state.openMail === 'm2' && (
          <div style={{ padding: '22px 26px' }}>
            <button onClick={actions.backInbox} style={{ border: 0, background: 'none', color: '#0a84ff', fontSize: 13, cursor: 'pointer', padding: 0, marginBottom: 16 }}>
              ← Inbox
            </button>
            <div style={{ fontSize: 17, fontWeight: 700, color: '#1c1c1e' }}>연합세미나 참석 인원 확인 부탁드립니다</div>
            <div style={{ fontSize: 12, color: '#8a8a8e', margin: '4px 0 16px' }}>from 연합세미나 운영팀 · 첨부: 참석신청현황.txt</div>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: '#2c2c2e' }}>
              오늘 연합세미나에 E-COPS 부원이 <b>총 몇 명</b> 참석할 예정인지 회신 부탁드립니다.
              <br />
              <span style={{ color: '#c0392b', fontSize: 12.5 }}>※ 세미나 시작 전까지 회신이 없으면 자동으로 참가 취소 처리됩니다.</span>
            </p>
            <div style={{ marginTop: 14, background: '#f4f4f6', border: '0.5px solid #e0e0e3', borderRadius: 10, padding: '12px 14px', fontSize: 12.5, color: '#1c1c1e', lineHeight: 1.9 }}>
              참석신청현황.txt
              <br />
              ─────────────
              <br />
              김지훈 · 참석 / 이서연 · 참석 / 박민준 · 불참
              <br />
              최유진 · 참석 / 정하늘 · 참석 / 강도현 · 참석
              <br />
              조은채 · 불참 / 윤서준 · 참석
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 16 }}>
              <button onClick={() => actions.pickM2(0)} style={optStyle(state.m2 ? 'idle' : state.m2bad === 0 ? 'bad' : 'idle')}>① 5명</button>
              <button onClick={() => actions.pickM2(1)} style={optStyle(state.m2 ? 'ok' : 'idle')}>② 6명</button>
              <button onClick={() => actions.pickM2(2)} style={optStyle(state.m2 ? 'idle' : state.m2bad === 2 ? 'bad' : 'idle')}>③ 7명</button>
              <button onClick={() => actions.pickM2(3)} style={optStyle(state.m2 ? 'idle' : state.m2bad === 3 ? 'bad' : 'idle')}>④ 9명</button>
              <button onClick={() => actions.pickM2(4)} style={optStyle(state.m2 ? 'idle' : state.m2bad === 4 ? 'bad' : 'idle')}>⑤ 10명</button>
            </div>
            {(state.m2 || state.m2bad !== null) && (
              <div
                style={{
                  marginTop: 14,
                  padding: '10px 12px',
                  borderRadius: 8,
                  fontSize: 12.5,
                  background: state.m2 ? '#d8f3dc' : '#fdecea',
                  color: state.m2 ? '#1b6b3a' : '#a11',
                }}
              >
                {state.m2 ? '✓ 정답입니다. 참석 인원 6명으로 회신했습니다.' : '✕ 명단을 다시 세어 보세요.'}
              </div>
            )}
          </div>
        )}

        {state.openMail === 'pcap' && (
          <div style={{ padding: '22px 26px' }}>
            <button onClick={actions.backInbox} style={{ border: 0, background: 'none', color: '#0a84ff', fontSize: 13, cursor: 'pointer', padding: 0, marginBottom: 16 }}>
              ← Inbox
            </button>
            <div style={{ fontSize: 17, fontWeight: 700, color: '#1c1c1e' }}>네트워크 이상 기록 확인 바람</div>
            <div style={{ fontSize: 12, color: '#8a8a8e', margin: '4px 0 16px' }}>from 관리팀 · 첨부: president_0213.pcap</div>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: '#2c2c2e' }}>
              회장님,
              <br />
              어젯밤 02시경 회장 PC에서 이상 트래픽이 확인돼 네트워크 캡처를 첨부합니다. 확인 부탁드립니다.
            </p>
            <div style={{ marginTop: 16, border: '0.5px solid #d6d6d9', borderRadius: 10, overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 12px', background: '#f4f4f6', fontSize: 12.5, color: '#3a3a3c', borderBottom: '0.5px solid #e0e0e3' }}>
                <IconPaperclip size={12} style={{ color: '#8a8a8e' }} />
                president_0213.pcap — Log Viewer
              </div>
              <div style={{ overflow: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11.5, whiteSpace: 'nowrap' }}>
                  <thead>
                    <tr style={{ background: '#fafafb', color: '#8a8a8e', textAlign: 'left' }}>
                      <th style={{ padding: '8px 10px', fontWeight: 600 }}>TIME</th>
                      <th style={{ padding: '8px 10px', fontWeight: 600 }}>SOURCE</th>
                      <th style={{ padding: '8px 10px', fontWeight: 600 }}>ACTION</th>
                      <th style={{ padding: '8px 10px', fontWeight: 600 }}>HASH (MD5)</th>
                    </tr>
                  </thead>
                  <tbody style={{ color: '#2c2c2e' }}>
                    <tr style={{ borderTop: '0.5px solid #eee' }}>
                      <td style={{ padding: '7px 10px' }}>02:08:01</td>
                      <td style={{ padding: '7px 10px' }}>ECOPS-PC-01</td>
                      <td style={{ padding: '7px 10px' }}>GET /webmail/login</td>
                      <td style={{ padding: '7px 10px' }}>—</td>
                    </tr>
                    <tr style={{ borderTop: '0.5px solid #eee' }}>
                      <td style={{ padding: '7px 10px' }}>02:09:14</td>
                      <td style={{ padding: '7px 10px' }}>ECOPS-PC-01</td>
                      <td style={{ padding: '7px 10px' }}>GET /files/desktop</td>
                      <td style={{ padding: '7px 10px' }}>—</td>
                    </tr>
                    <tr style={{ borderTop: '0.5px solid #eee', background: '#fff8e1' }}>
                      <td style={{ padding: '7px 10px' }}>02:13:07</td>
                      <td style={{ padding: '7px 10px' }}>ECOPS-PC-01</td>
                      <td style={{ padding: '7px 10px' }}>GET /downloads/offer_location.jpg</td>
                      <td style={{ padding: '7px 10px', color: '#b45309', fontWeight: 700 }}>8f14e45fceea167a5a36dedd4bea2543 ★</td>
                    </tr>
                    <tr style={{ borderTop: '0.5px solid #eee' }}>
                      <td style={{ padding: '7px 10px' }}>02:13:41</td>
                      <td style={{ padding: '7px 10px' }}>ECOPS-PC-01</td>
                      <td style={{ padding: '7px 10px', color: '#c0392b' }}>DELETE /logs/access_history</td>
                      <td style={{ padding: '7px 10px' }}>—</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div style={{ marginTop: 14, padding: '12px 14px', background: '#e7f0ff', border: '1px solid #b8d4ff', borderRadius: 10, fontSize: 12.5, color: '#1c4e8a', lineHeight: 1.6 }}>
              새벽 2시 접근 + 직후 로그 삭제 시도. 접근한 파일 <b>offer_location.jpg</b> 과 해시 <b>8f14e45…2543</b> 를 확보했습니다.
            </div>
            <div style={{ marginTop: 16, textAlign: 'right' }}>
              <button onClick={actions.toDownloads} style={{ padding: '10px 18px', border: 0, borderRadius: 9, background: '#0a84ff', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                다운로드 폴더 열기 →
              </button>
            </div>
          </div>
        )}
      </MacWindow>
    </div>
  );
}
