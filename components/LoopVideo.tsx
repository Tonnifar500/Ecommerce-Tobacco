// Muted, looping background video. `name` maps to /video/{name}.webm, .mp4 and -poster.jpg.
// Visitors who prefer reduced motion only see the poster (see .loop-video in globals.css).
export default function LoopVideo({ name, alt, position = "center", style }: { name: string; alt: string; position?: string; style?: React.CSSProperties }) {
  const poster = `/video/${name}-poster.jpg`;
  return (
    <div className="loop-video" role="img" aria-label={alt} style={{ position: "relative", overflow: "hidden", background: `#0b0b0d url(${poster}) ${position} / cover no-repeat`, ...style }}>
      <video autoPlay muted loop playsInline preload="auto" poster={poster} aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: position }}>
        <source src={`/video/${name}.webm`} type="video/webm" />
        <source src={`/video/${name}.mp4`} type="video/mp4" />
      </video>
    </div>
  );
}
