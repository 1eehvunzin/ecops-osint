import type { CSSProperties } from 'react';
import type { AppState, Actions } from '../types';
import { MacWindow, TitleBar } from '../components/MacWindow';
import { IconPaperclip } from '../components/icons';

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
  const arrived = state.pcapMailArrived;

  return (
    <div style={{ position: 'relative', zIndex: 10, minHeight: 'calc(100vh - 28px)', display: 'flex', justifyContent: 'center', padding: '34px 24px 120px' }}>
      <MacWindow width={860} draggable resizable="width" minWidth={480} defaultLeft="50%" defaultTop={60} centerX>
        <TitleBar title="ECOPS Webmail — Inbox" />

        {state.openMail === null && (
          <div>
            {arrived && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 9,
                  padding: '11px 18px',
                  background: '#e8f7ee',
                  borderBottom: '0.5px solid #eee',
                  fontSize: 12.5,
                  color: '#1b6b3a',
                  animation: 'bubbleIn .3s ease both',
                }}
              >
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#28a745', flex: 'none' }} />
                <span>새 메일이 도착했습니다.</span>
              </div>
            )}

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

            {arrived && (
              <div
                onClick={actions.openPcap}
                style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '15px 18px', borderBottom: '0.5px solid #f0f0f2', cursor: 'pointer', animation: 'bubbleIn .3s ease both' }}
              >
                <span style={{ fontSize: 11, fontWeight: 700, color: '#fff', background: '#ff3b30', padding: '3px 8px', borderRadius: 6 }}>자동탐지</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#1c1c1e' }}>[자동탐지] 비정상 시간대 트래픽 — 확인 바람</div>
                  <div style={{ fontSize: 12, color: '#8a8a8e' }}>관리팀 · 첨부: president_0213.pcap</div>
                </div>
              </div>
            )}

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
            <div style={{ fontSize: 12, color: '#8a8a8e', margin: '4px 0 16px' }}>from 연합세미나 운영팀</div>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: '#2c2c2e' }}>
              지금 연합세미나 현장에 <b>실제로 있는</b> E-COPS 부원이 총 몇 명인지 회신 부탁드립니다.
              <br />
              <span style={{ color: '#c0392b', fontSize: 12.5 }}>※ 세미나 시작 전까지 회신이 없으면 자동으로 참가 취소 처리됩니다.</span>
            </p>
            <div style={{ marginTop: 14, background: '#f4f4f6', border: '0.5px solid #e0e0e3', borderRadius: 10, padding: '12px 14px', fontSize: 12.5, color: '#1c1c1e', lineHeight: 1.9 }}>
              현재 세미나장에 있는 E-COPS 부원이 몇 명인지 찾아주세요.
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
            <div style={{ fontSize: 17, fontWeight: 700, color: '#1c1c1e' }}>[자동탐지] 비정상 시간대 트래픽 — 확인 바람</div>
            <div style={{ fontSize: 12, color: '#8a8a8e', margin: '4px 0 16px' }}>
              from 관리팀 &lt;admin@ecops.club&gt; · 첨부: president_0213.pcap
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: '#2c2c2e' }}>
              회장님,
              <br />
              어젯밤 02시경 회장 PC에서 이상 트래픽이 탐지되어 해당 세션 전체를 캡처해 첨부합니다.
              <br />
              <br />
              캡처 안에서 이미지 파일이 하나 오간 게 확인되는데 저희 쪽 도구로는 열리지 않습니다. 자동 분석 결과는 아래와 같습니다.
            </p>
            <div
              style={{
                marginTop: 14,
                background: '#f4f4f6',
                border: '0.5px solid #e0e0e3',
                borderRadius: 10,
                padding: '13px 16px',
                fontFamily: "ui-monospace,SFMono-Regular,Menlo,monospace",
                fontSize: 12,
                color: '#1c1c1e',
                lineHeight: 2,
              }}
            >
              추출 파일&nbsp;&nbsp; 1건
              <br />
              크기&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 746,846 bytes
              <br />
              형식 판별&nbsp;&nbsp; <span style={{ color: '#c0392b' }}>실패 — 파일 시그니처 손상 (선두 4바이트)</span>
              <br />
              미리보기&nbsp;&nbsp;&nbsp; 생성 불가
              <div style={{ marginTop: 8, paddingTop: 8, borderTop: '0.5px solid #dcdce0', color: '#6a6a70' }}>
                ※ 본문 데이터는 온전합니다. 헤더 복구 후 재시도하십시오.
              </div>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: '#2c2c2e', marginTop: 16 }}>
              파일 자체는 멀쩡한 것 같으니 직접 확인해 보시겠어요?
              <br />
              저희가 임의로 손대는 건 아닐 것 같아서요.
            </p>
            <div style={{ marginTop: 16, border: '0.5px solid #d6d6d9', borderRadius: 10, overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '11px 14px', background: '#f4f4f6', fontSize: 12.5, color: '#3a3a3c' }}>
                <IconPaperclip size={12} style={{ color: '#8a8a8e' }} />
                <span style={{ flex: 1 }}>president_0213.pcap</span>
                <a
                  href="/assets/president_0213.pcap"
                  download="president_0213.pcap"
                  style={{ fontSize: 11.5, color: '#0a84ff', fontWeight: 600, textDecoration: 'none' }}
                >
                  다운로드 ⬇
                </a>
              </div>
            </div>
            <div
              style={{
                marginTop: 20,
                background: '#f2f2f7',
                border: '0.5px solid #e0e0e3',
                borderRadius: 12,
                padding: '14px 16px',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              <div style={{ fontSize: 10.5, color: '#8a8a8e', letterSpacing: 0.4 }}>E-COPS 단체방</div>
              {[
                ['부원1', '야 이거 어디서 본 것 같은데'],
                ['부원1', '우리 E-COPS 처음 들어와서 비기너였을 때 포렌식 실습했었잖아'],
                ['부원2', '기억안나는데'],
                ['부원1', '세션 내용 인스타에 정리해서 올렸을걸?'],
                ['부원1', '15기 3주차 정규세션 게시물 6페이지.'],
                ['부원2', '?왜이렇게 구체적으로 알아'],
              ].map(([who, msg], i) => (
                <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 10.5, color: '#8a8a8e', width: 34, flex: 'none', paddingTop: 3 }}>{who}</span>
                  <span
                    style={{
                      background: '#fff',
                      borderRadius: 12,
                      padding: '7px 11px',
                      fontSize: 12.5,
                      lineHeight: 1.5,
                      color: '#1c1c1e',
                      boxShadow: '0 1px 1px rgba(0,0,0,0.05)',
                    }}
                  >
                    {msg}
                  </span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, fontSize: 12, color: '#8a8a8e', textAlign: 'right' }}>
              복구가 끝났다면 Dock의 Maps 아이콘에서 계속하세요.
            </div>
          </div>
        )}
      </MacWindow>
    </div>
  );
}
