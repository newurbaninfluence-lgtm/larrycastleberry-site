const words = ['STORYTELLER','VOICE ACTOR','KEYNOTE SPEAKER','AUTHOR','WORKSHOP LEADER','CONFLICT RESOLUTION','AIKIDO PRINCIPLES','HUSH YOUR MOUTH']

export default function Ticker({ speed = 32 }) {
  const items = [...words, ...words].map((w, i) => (
    <span key={i} className="inline-block font-display text-[1.15rem] text-black tracking-[0.12em] mr-10">
      {w} <span className="text-black/22 mr-10">✦</span>
    </span>
  ))
  return (
    <div className="overflow-hidden bg-neon py-3">
      <div className="inline-block" style={{ animation: `ticker ${speed}s linear infinite` }}>{items}</div>
    </div>
  )
}