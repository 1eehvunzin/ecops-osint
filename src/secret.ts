/**
 * 정답 검증 — 평문 정답이 번들에 남지 않도록 SHA-256 해시로만 비교한다.
 * crypto.subtle은 보안 컨텍스트(https/localhost)에서만 쓸 수 있어서,
 * 현장에서 http://<사설IP> 로 띄워도 깨지지 않도록 직접 구현했다.
 */

const K = new Uint32Array([
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
  0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
  0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
  0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
  0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
  0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
]);

const rotr = (x: number, n: number) => (x >>> n) | (x << (32 - n));

function sha256(input: string): string {
  const msg = new TextEncoder().encode(input);
  const blocks = Math.ceil((msg.length + 9) / 64);
  const buf = new Uint8Array(blocks * 64);
  buf.set(msg);
  buf[msg.length] = 0x80;
  const view = new DataView(buf.buffer);
  const bits = msg.length * 8;
  view.setUint32(blocks * 64 - 8, Math.floor(bits / 0x100000000));
  view.setUint32(blocks * 64 - 4, bits >>> 0);

  const h = new Uint32Array([
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19,
  ]);
  const w = new Uint32Array(64);

  for (let i = 0; i < blocks; i++) {
    for (let t = 0; t < 16; t++) w[t] = view.getUint32(i * 64 + t * 4);
    for (let t = 16; t < 64; t++) {
      const a1 = w[t - 15];
      const a2 = w[t - 2];
      const s0 = rotr(a1, 7) ^ rotr(a1, 18) ^ (a1 >>> 3);
      const s1 = rotr(a2, 17) ^ rotr(a2, 19) ^ (a2 >>> 10);
      w[t] = (w[t - 16] + s0 + w[t - 7] + s1) >>> 0;
    }
    let [a, b, c, d, e, f, g, hh] = h;
    for (let t = 0; t < 64; t++) {
      const t1 = (hh + (rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25)) + ((e & f) ^ (~e & g)) + K[t] + w[t]) >>> 0;
      const t2 = ((rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22)) + ((a & b) ^ (a & c) ^ (b & c))) >>> 0;
      hh = g; g = f; f = e; e = (d + t1) >>> 0;
      d = c; c = b; b = a; a = (t1 + t2) >>> 0;
    }
    h[0] = (h[0] + a) >>> 0; h[1] = (h[1] + b) >>> 0; h[2] = (h[2] + c) >>> 0; h[3] = (h[3] + d) >>> 0;
    h[4] = (h[4] + e) >>> 0; h[5] = (h[5] + f) >>> 0; h[6] = (h[6] + g) >>> 0; h[7] = (h[7] + hh) >>> 0;
  }
  return Array.from(h, (x) => x.toString(16).padStart(8, '0')).join('');
}

/* ---------- 로그인 ---------- */

const ID_HASH = '1d7407bb738fe82a5e3a7c3d3d7b1658aca17817a61cc8fd82cde66d12644cc2';
const PW_HASH = 'fd572aec38d70783630a89ceb3cf55c21a8ed59bde1147b9611720ab03c56978';

export function checkLogin(id: string, pw: string): boolean {
  const normId = (id || '').trim().toLowerCase().replace('@ecops.club', '');
  return sha256(normId) === ID_HASH && sha256((pw || '').trim()) === PW_HASH;
}

/* ---------- 최종 위치 ---------- */

const PLACE_HASHES = new Set([
  '344a8cce71c9075eeacc046f77698bc4bb78f25410f18f5daaa134d504f67750',
  '906af7d09141848b45137f2767186a8b8fdcd0cbc54910a72f23b97bbc586c36',
  '99aa5c9f6067b30a86fbc4ecc49f061bb015196884b228f67a1c2e5af0c2b745',
  '328d749986375e0d9e8b0f2a6da7bd0148cb82a07c1906b224ab7353ff50696e',
  '4af40e4ef0f5010ac335b05da20625893c99bf4af8af2d4ae3e349c48c6d7228',
  '8c2741d1979ea6542571b2dbb1e5d9abc6e15550b3c0204f02db2f95eebccef3',
]);

/** 정답 단어들의 길이. 부분 문자열 판정을 유지하려고 이 길이만큼만 훑는다. */
const PLACE_LENGTHS = [3, 4, 5, 8, 15];

export function checkPlace(query: string): boolean {
  const q = (query || '').toLowerCase().replace(/[\s·]/g, '');
  for (const len of PLACE_LENGTHS) {
    for (let i = 0; i + len <= q.length; i++) {
      if (PLACE_HASHES.has(sha256(q.slice(i, i + len)))) return true;
    }
  }
  return false;
}

/* ---------- 정답이 드러나는 표시 문구 ---------- */

/** 정답 문자열이 번들에 평문으로 남지 않도록 인코딩해 둔 것을 푼다. */
export function reveal(encoded: string): string {
  const bin = atob(encoded);
  const bytes = Uint8Array.from(bin, (ch) => ch.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export const PLACE_FOUND = '7JyE7LmYIO2ZleyduCDigJQg7JWE7IKw6rO17ZWZ6rSALiDsl7DqsrAg7KSR4oCm';
export const PLACE_LABEL = '7JWE7IKw6rO17ZWZ6rSAIMK3IEFzYW4gRW5naW5lZXJpbmc=';
export const PLACE_ROOM = '7JWE7IKw6rO17ZWZ6rSAIDEwOe2YuCwgZW1wdHkgbGVjdHVyZSByb29t';
export const PLACE_RESULT = '7ZqM7J6lIOychOy5mDog7JWE7IKw6rO17ZWZ6rSAIDEwOe2YuCAo7IiY66m0IOykkSk=';
