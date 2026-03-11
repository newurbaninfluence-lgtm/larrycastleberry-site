import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { IMAGES } from '../config/brand'

gsap.registerPlugin(ScrollTrigger)

function Card({ img, label, tag, className = '', speed = 0 }) {
  const ref = useRef(null)
  const imgRef = useRef(null)

  useEffect(() => {
    const el = ref.current
    gsap.fromTo(el, { opacity: 0, y: 50, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } })
    if (speed && imgRef.current) {
      gsap.to(imgRef.current, { yPercent: speed * 20, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } })
    }
  }, [speed])

  return (
    <div ref={ref} className={`relative rounded-[14px] overflow-hidden group cursor-pointer ${className}`}>
      <div ref={imgRef} className="absolute inset-[-12px] bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.07]" style={{ backgroundImage: `url(${img})` }} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 group-hover:to-black/70 transition-opacity z-[1]" />      {tag && <span className="absolute top-3.5 left-3.5 z-[3] bg-black/65 backdrop-blur-sm px-3 py-1 rounded-full font-display text-[0.6rem] tracking-[0.2em] text-neon border border-neon/15">{tag}</span>}
      <span className="absolute bottom-4 left-5 z-[2] font-display text-[0.85rem] tracking-[0.16em] text-white/80 group-hover:text-neon group-hover:translate-x-1 transition-all text-shadow">{label}</span>
    </div>
  )
}

export default function BentoHero() {
  const ctaRef = useRef(null)

  useEffect(() => {
    if (ctaRef.current) {
      gsap.fromTo(ctaRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out', delay: 0.5 })
    }
  }, [])

  return (
    <section className="max-w-[1440px] mx-auto pt-[84px] px-[clamp(12px,2.5vw,44px)]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1.12fr_1fr] gap-4 auto-rows-[minmax(220px,auto)]">
        {/* Row 1 */}
        <Card img={IMAGES.headphones} tag="PODCAST" label="VOICE ACTOR" speed={0.8} className="lg:col-start-1 lg:row-start-1" />
        <Card img={IMAGES.speakingCrowd} tag="LIVE EVENTS" label="KEYNOTE SPEAKER" speed={0.5} className="lg:col-start-2 lg:row-start-1 lg:row-span-2 min-h-[320px]" />
        <Card img={IMAGES.micStage} tag="PERFORMER" label="STORYTELLER" speed={0.9} className="lg:col-start-3 lg:row-start-1" />        {/* Left middle — spans 2 */}
        <Card img={IMAGES.bookPortrait} tag="NEW RELEASE" label="HUSH YOUR MOUTH — AUTHOR" speed={0.6} className="lg:col-start-1 lg:row-start-2 lg:row-span-2 min-h-[300px]" />

        {/* CTA CENTER — spans 2 rows */}
        <div ref={ctaRef} className="lg:col-start-2 lg:row-start-3 lg:row-span-2 bg-neon rounded-[14px] flex flex-col items-center justify-center text-center p-[clamp(24px,4vw,48px)] cursor-pointer relative overflow-hidden group hover:shadow-[0_0_90px_rgba(212,255,0,0.28)] transition-shadow min-h-[260px]">
          <div className="absolute w-60 h-60 rounded-full border border-black/8 animate-[float_8s_ease-in-out_infinite]" />
          <div className="absolute w-40 h-40 rounded-full border border-black/8 animate-[float_6s_ease-in-out_infinite_reverse]" />
          <p className="text-[clamp(0.6rem,1.1vw,0.75rem)] tracking-[0.35em] text-black/45 uppercase mb-1.5 relative z-[2]">Larry Castleberry</p>
          <h2 className="font-display text-[clamp(3rem,6vw,5rem)] text-black leading-[0.88] relative z-[2] mb-3">RSVP<br/>NOW</h2>
          <p className="text-[clamp(0.72rem,1vw,0.85rem)] text-black/50 leading-relaxed max-w-[260px] mb-5 relative z-[2]">Book Larry for your next corporate event, conference, or school assembly.</p>
          <Link to="/booking" className="bg-black text-neon px-8 py-3.5 font-display text-[0.95rem] tracking-[0.16em] rounded relative z-[2] hover:-translate-y-0.5 hover:shadow-lg transition-all">
            GET STARTED <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* Right — spans 3 (tallest) */}
        <Card img={IMAGES.kidsHeritage} tag="COMMUNITY" label="INSPIRING THE NEXT GENERATION" speed={0.7} className="lg:col-start-3 lg:row-start-2 lg:row-span-3 min-h-[400px]" />

        {/* Bottom left */}
        <Card img={IMAGES.ideasInspire} tag="IDEAS THAT INSPIRE" label="MOTIVATIONAL SPEAKER" speed={1} className="lg:col-start-1 lg:row-start-4" />
      </div>
    </section>
  )
}