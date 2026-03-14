import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { C, F } from '../tokens';

const links = [
  { to: '/',            label: 'Home' },
  { to: '/about',       label: 'About' },
  { to: '/storytelling',label: 'Storytelling' },
  { to: '/narration',   label: 'Narration' },
  { to: '/voice-overs', label: 'Voice Overs' },
  { to: '/blog',        label: 'Blog' },
  { to: '/shop',        label: 'Shop' },
  { to: '/contact',     label: 'Contact' },
  { to: '/book-online', label: 'Book Larry' },
  { to: '/admin',       label: '⚙️' },
];

export default function Nav() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const loc = useLocation();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [loc.pathname]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        padding: '0 1.5rem', transition: 'all 0.4s',
        background: scrolled || menuOpen ? 'rgba(0,0,0,0.98)' : 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid ' + C.t06,
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>

          {/* LOGO */}
          <Link to="/" style={{ textDecoration: 'none', fontFamily: F.h, fontSize: 18, color: C.accent, letterSpacing: 3, zIndex: 1001 }}>
            LARRY <span style={{ color: C.white }}>CASTLEBERRY</span>
          </Link>

          {/* DESKTOP LINKS */}
          <div className="nav-desktop" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            {links.map((l) => (
              <Link key={l.to} to={l.to} style={{
                fontFamily: F.b, fontSize: 12,
                color: loc.pathname === l.to ? C.accent : C.t50,
                textDecoration: 'none',
                borderBottom: loc.pathname === l.to ? '2px solid ' + C.accent : '2px solid transparent',
                padding: '4px 0', transition: 'color 0.3s', whiteSpace: 'nowrap',
              }}>{l.label}</Link>
            ))}
          </div>

          {/* HAMBURGER BUTTON */}
          <button
            className="nav-burger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            style={{
              display: 'none', background: 'none', border: 'none',
              cursor: 'pointer', padding: 8, zIndex: 1001,
              flexDirection: 'column', gap: 5, alignItems: 'center', justifyContent: 'center',
            }}
          >
            <span style={{ display: 'block', width: 24, height: 2, background: menuOpen ? C.accent : C.white, transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
            <span style={{ display: 'block', width: 24, height: 2, background: C.white, transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: 24, height: 2, background: menuOpen ? C.accent : C.white, transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
          </button>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      <div className="nav-drawer" style={{
        position: 'fixed', top: 60, left: 0, right: 0, bottom: 0,
        background: 'rgba(0,0,0,0.98)', zIndex: 999,
        display: 'flex', flexDirection: 'column',
        padding: '32px 2rem', gap: 8, overflowY: 'auto',
        transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)',
      }}>
        {links.map((l) => (
          <Link key={l.to} to={l.to} style={{
            fontFamily: F.h, fontSize: 28, letterSpacing: 3,
            color: loc.pathname === l.to ? C.accent : C.white,
            textDecoration: 'none', padding: '12px 0',
            borderBottom: '1px solid ' + C.t06,
            transition: 'color 0.2s',
          }}>{l.label}</Link>
        ))}

        {/* CTA in drawer */}
        <Link to="/book-online" style={{
          marginTop: 24, background: C.accent, color: '#000',
          fontFamily: F.h, fontSize: 18, letterSpacing: 3,
          textDecoration: 'none', padding: '16px 24px',
          textAlign: 'center', borderRadius: 4,
        }}>BOOK LARRY NOW</Link>
      </div>
    </>
  );
}
