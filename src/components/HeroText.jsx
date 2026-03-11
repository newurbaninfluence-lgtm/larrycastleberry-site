import { Link } from 'react-router-dom'

export default function HeroText() {
  return (
    <section className="max-w-[850px] mx-auto text-center py-[clamp(56px,7vw,96px)] px-[clamp(16px,5vw,60px)]">
      <p className="text-[0.78rem] tracking-[0.35em] text-neon uppercase mb-5 opacity-0 translate-y-5 animate-[fadeUp_0.8s_1.1s_forwards]">
        Michigan's #1 Motivational Speaker
      </p>
      <h1 className="font-display text-[clamp(2.6rem,6.5vw,5.2rem)] leading-[0.95] tracking-wide mb-6 opacity-0 translate-y-7 animate-[fadeUp_0.9s_1.3s_forwards]">
        STORIES THAT <span className="text-neon">TRANSFORM</span> LIVES
      </h1>
      <p className="text-[clamp(0.92rem,1.3vw,1.08rem)] text-muted leading-relaxed max-w-[580px] mx-auto mb-9 opacity-0 translate-y-5 animate-[fadeUp_0.8s_1.5s_forwards]">
        For over 20 years, Larry Castleberry has captivated audiences with his unique blend of storytelling, voice acting, and conflict resolution through the art of Aikido.
      </p>
      <div className="flex gap-3.5 justify-center flex-wrap opacity-0 translate-y-5 animate-[fadeUp_0.8s_1.7s_forwards]">
        <Link to="/booking" className="bg-neon text-black px-10 py-4 font-display text-[1.05rem] tracking-[0.15em] rounded hover:scale-[1.03] hover:-translate-y-0.5 hover:shadow-[0_10px_36px_rgba(212,255,0,0.22)] transition-all">BOOK FOR YOUR EVENT</Link>
        <Link to="/about" className="border-2 border-neon text-neon px-9 py-3.5 font-display text-[1.05rem] tracking-[0.15em] rounded hover:bg-neon hover:text-black hover:-translate-y-0.5 transition-all">LEARN MORE</Link>
      </div>
    </section>
  )
}