import { useInView } from '../hooks/useInView'
import { useState, useEffect } from 'react'

function Counter({ end, suffix = '' }) {
  const [count, setCount] = useState(0)
  const [ref, inView] = useInView()
  useEffect(() => {
    if (!inView) return
    let n = 0; const step = end / 120
    const t = setInterval(() => { n += step; if (n >= end) { setCount(end); clearInterval(t) } else setCount(Math.floor(n)) }, 16)
    return () => clearInterval(t)
  }, [inView, end])
  return <span ref={ref}>{count}{suffix}</span>
}

const stats = [
  { n: 20, s: '+', l: 'Years Experience' },
  { n: 500, s: '+', l: 'Events & Shows' },
  { n: 100, s: 'K+', l: 'Lives Impacted' },
  { n: 400, s: '+', l: 'Fortune 500 Talks' },
]

export default function Stats() {
  return (
    <section className="py-20 px-[clamp(16px,5vw,60px)] bg-dark">
      <div className="max-w-[1200px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">
        {stats.map((s, i) => (
          <div key={i}>
            <div className="font-display text-[clamp(2.5rem,5vw,4rem)] text-neon leading-none"><Counter end={s.n} suffix={s.s} /></div>
            <div className="font-display text-[0.85rem] tracking-[0.2em] text-muted mt-2">{s.l.toUpperCase()}</div>
          </div>
        ))}
      </div>
    </section>
  )
}