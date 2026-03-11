import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { C, F } from '../tokens';
const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/storytelling', label: 'Storytelling' },
  { to: '/narration', label: 'Narration' },
  { to: '/voice-overs', label: 'Voice Overs' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
  { to: '/shop', label: '\ud83d\uded2 Shop' },
  { to: '/admin', label: '\u2699\ufe0f' },
];
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const loc = useLocation();
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, padding: '0 1.5rem', transition: 'all 0.4s', background: scrolled ? 'rgba(0,0,0,0.95)' : 'rgba(0,0,0,0.7)', backdropFilter: 'blur(16px)', borderBottom: '1px solid ' + C.t06 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
        <Link to="/" style={{ textDecoration: 'none', fontFamily: F.h, fontSize: 18, color: C.accent, letterSpacing: 3 }}>LARRY<span style={{ color: C.white }}>C</span></Link>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          {links.map((l) => (
            <Link key={l.to} to={l.to} style={{ fontFamily: F.b, fontSize: 12, color: loc.pathname === l.to ? C.accent : C.t50, textDecoration: 'none', borderBottom: loc.pathname === l.to ? '2px solid ' + C.accent : '2px solid transparent', padding: '4px 0', transition: 'color 0.3s', whiteSpace: 'nowrap' }}>{l.label}</Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
