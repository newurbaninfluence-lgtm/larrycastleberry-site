import { Link } from 'react-router-dom';
import { C, F } from '../tokens';
export default function Footer() {
  return (
    <footer style={{ background: C.bg, borderTop: '1px solid ' + C.t06, padding: '48px 2rem 24px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 32 }}>
        <div>
          <h3 style={{ fontFamily: F.h, color: C.accent, fontSize: 20, letterSpacing: 2, marginBottom: 8 }}>LARRY CASTLEBERRY</h3>
          <p style={{ fontFamily: F.b, color: C.t50, fontSize: 13 }}>Storyteller &middot; Author &middot; Voice Actor &middot; Detroit, MI</p>
        </div>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {['/', '/about', '/shop', '/blog', '/contact'].map((p) => (
            <Link key={p} to={p} style={{ color: C.t50, fontFamily: F.b, fontSize: 13, textDecoration: 'none' }}>
              {p === '/' ? 'Home' : p.slice(1).charAt(0).toUpperCase() + p.slice(2)}
            </Link>
          ))}
        </div>
      </div>
      <div style={{ maxWidth: 1000, margin: '28px auto 0', borderTop: '1px solid ' + C.t06, paddingTop: 16, textAlign: 'center' }}>
        <p style={{ fontFamily: F.b, color: C.t25, fontSize: 11 }}>&copy; 2025 Larry Castleberry LLC &middot; Built by New Urban Influence</p>
      </div>
    </footer>
  );
}
