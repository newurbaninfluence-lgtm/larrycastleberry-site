import { Link } from 'react-router-dom'
import { BRAND } from '../config/brand'

export default function Footer() {
  return (
    <footer className="bg-dark border-t border-white/10 py-16 px-[clamp(16px,5vw,60px)]">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
        <div>
          <div className="font-display text-2xl text-neon tracking-widest mb-4">{BRAND.name.toUpperCase()}</div>
          <p className="text-muted text-sm leading-relaxed">Storyteller, Speaker, Author & Voice Actor. Transforming lives through the power of story for over 20 years.</p>
          <p className="text-muted text-sm mt-4">📞 {BRAND.phone}</p>
        </div>
        <div>
          <h4 className="font-display tracking-[0.15em] mb-4 text-sm">QUICK LINKS</h4>
          {['/','/about','/books','/booking','/faq','/contact'].map(p => (
            <Link key={p} to={p} className="block text-muted text-sm mb-2.5 hover:text-neon transition-colors">{p === '/' ? 'Home' : p.slice(1).charAt(0).toUpperCase() + p.slice(2)}</Link>
          ))}
        </div>
        <div>
          <h4 className="font-display tracking-[0.15em] mb-4 text-sm">SERVICES</h4>
          {['Keynote Speaking','Workshops','Voice Acting','Narration','Coaching','School Events'].map(s => (
            <p key={s} className="text-muted text-sm mb-2.5">{s}</p>
          ))}
        </div>
        <div>
          <h4 className="font-display tracking-[0.15em] mb-4 text-sm">NEWSLETTER</h4>
          <p className="text-muted text-sm mb-3">Stay updated with Larry's latest events and releases.</p>
          <div className="flex">
            <input type="email" placeholder="Your email" className="flex-1 bg-gray border border-white/15 text-text px-4 py-3 text-sm outline-none focus:border-neon transition-colors" />
            <button className="bg-neon text-black px-5 py-3 font-display text-sm tracking-widest">JOIN</button>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 pt-5 flex flex-wrap justify-between items-center gap-4">
        <p className="text-muted text-xs">© 2025 {BRAND.name} LLC. All rights reserved.</p>
        <div className="flex gap-4">
          {['Facebook','Instagram','YouTube','LinkedIn'].map(s => (
            <span key={s} className="text-muted text-xs cursor-pointer hover:text-neon transition-colors">{s}</span>
          ))}
        </div>
      </div>
    </footer>
  )
}