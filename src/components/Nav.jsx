import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BRAND } from '../config/brand'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/books', label: 'Books' },
  { to: '/booking', label: 'Book Larry' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
]

export default function Nav({ cart = [] }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const count = cart.reduce((s, c) => s + c.qty, 0)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])
  return (
    <nav className={`fixed top-0 inset-x-0 z-50 px-[clamp(16px,4vw,60px)] transition-all duration-400 ${scrolled ? 'bg-black/92 backdrop-blur-xl border-b border-white/10' : ''}`}>
      <div className="max-w-[1440px] mx-auto flex items-center justify-between h-[70px]">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-neon grid place-items-center rounded font-display text-lg text-black font-bold">LC</div>
          <div>
            <div className="font-display text-[1.1rem] tracking-widest text-neon leading-none">{BRAND.name.toUpperCase()}</div>
            <div className="text-[0.58rem] tracking-[0.2em] text-muted uppercase">{BRAND.tagline}</div>
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-7">
          {links.map(l => (
            <Link key={l.to} to={l.to} className="font-display text-[0.88rem] tracking-[0.14em] text-muted hover:text-neon transition-colors">{l.label}</Link>
          ))}
        </div>
        <Link to="/booking" className="hidden md:block bg-neon text-black px-6 py-2.5 font-display text-[0.85rem] tracking-[0.14em] rounded hover:scale-105 transition-transform">
          BOOK NOW
        </Link>
        <button onClick={() => setOpen(!open)} className="md:hidden flex flex-col gap-1.5 p-2">
          <span className={`w-6 h-0.5 bg-neon transition-all ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-0.5 bg-neon transition-all ${open ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-0.5 bg-neon transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>
      {open && (
        <div className="md:hidden absolute top-[70px] inset-x-0 bg-black/95 backdrop-blur-xl p-6 animate-[fadeUp_0.3s]">
          {links.map(l => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="block py-4 font-display text-lg tracking-widest text-text border-b border-white/10">{l.label}</Link>
          ))}
        </div>
      )}
    </nav>
  )
}