const grainSvg =
  "<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'>" +
  "<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/>" +
  "<feColorMatrix type='matrix' values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.05 0'/></filter>" +
  "<rect width='100%' height='100%' filter='url(#n)'/></svg>";
const grainUrl = `url("data:image/svg+xml,${encodeURIComponent(grainSvg)}")`;

export default function Wallpaper() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
      {/* base twilight gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(165deg,#151c3f 0%,#241a45 42%,#2c1c3e 68%,#12101f 100%)',
        }}
      />
      {/* soft bokeh light sources */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(46% 38% at 20% 14%, rgba(90,120,220,0.55) 0%, rgba(90,120,220,0) 70%),' +
            'radial-gradient(50% 42% at 86% 20%, rgba(150,90,200,0.4) 0%, rgba(150,90,200,0) 68%),' +
            'radial-gradient(60% 50% at 78% 92%, rgba(210,110,150,0.32) 0%, rgba(210,110,150,0) 70%),' +
            'radial-gradient(44% 40% at 8% 88%, rgba(70,150,210,0.28) 0%, rgba(70,150,210,0) 70%)',
        }}
      />
      {/* horizon band, evokes a blurred ridge/skyline like a real dynamic wallpaper */}
      <div
        style={{
          position: 'absolute',
          left: '-10%',
          right: '-10%',
          bottom: '-6%',
          height: '46%',
          background: 'linear-gradient(180deg, rgba(10,8,22,0) 0%, rgba(12,9,24,0.55) 55%, rgba(9,7,18,0.86) 100%)',
          filter: 'blur(2px)',
        }}
      />
      {/* film grain */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: grainUrl,
          backgroundRepeat: 'repeat',
          opacity: 0.5,
          mixBlendMode: 'overlay',
        }}
      />
      {/* vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(120% 90% at 50% 42%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.38) 100%)',
        }}
      />
    </div>
  );
}
