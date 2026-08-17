const grainSvg =
  "<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'>" +
  "<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/>" +
  "<feColorMatrix type='matrix' values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.05 0'/></filter>" +
  "<rect width='100%' height='100%' filter='url(#n)'/></svg>";
const grainUrl = `url("data:image/svg+xml,${encodeURIComponent(grainSvg)}")`;

export default function Wallpaper() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
      {/* desktop background image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/assets/wallpaper.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      {/* film grain */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: grainUrl,
          backgroundRepeat: 'repeat',
          opacity: 0.35,
          mixBlendMode: 'overlay',
        }}
      />
      {/* vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(120% 90% at 50% 42%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.28) 100%)',
        }}
      />
    </div>
  );
}
