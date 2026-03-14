import { Link } from 'react-router-dom';
import { C, F } from '../tokens';

const COL = [
  {
    heading: 'Pages',
    links: [
      { to: '/', label: 'Home' },
      { to: '/about', label: 'About Larry' },
      { to: '/shop', label: 'Shop Books' },
      { to: '/blog', label: 'Blog' },
      { to: '/contact', label: 'Contact' },
      { to: '/book-online', label: 'Book Larry' },
    ],
  },
  {
    heading: 'Services',
    links: [
      { to: '/storytelling', label: 'Speaking & Storytelling' },
      { to: '/narration', label: 'Narration' },
      { to: '/voice-overs', label: 'Voice Overs' },
    ],
  },
  {
    heading: 'Locations',
    links: [
      { to: '/detroit-storyteller', label: 'Detroit' },
      { to: '/metro-detroit-storyteller', label: 'Metro Detroit' },
      { to: '/lansing-storyteller', label: 'Lansing' },
      { to: '/ann-arbor-storyteller', label: 'Ann Arbor' },
      { to: '/bay-city-storyteller', label: 'Bay City' },
      { to: '/dearborn-storyteller', label: 'Dearborn' },
      { to: '/southfield-storyteller', label: 'Southfield' },
      { to: '/oakland-county-storyteller', label: 'Oakland County' },
      { to: '/macomb-county-storyteller', label: 'Macomb County' },
      { to: '/michigan-library-storyteller', label: 'Michigan Libraries' },
      { to: '/michigan-school-assembly', label: 'School Assemblies' },
      { to: '/corporate-storyteller', label: 'Corporate Events' },
    ],
  },
  {
    heading: 'Info',
    links: [
      { to: '/sitemap.xml', label: 'Sitemap', external: true },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{ background: '#080808', borderTop: '1px solid ' + C.t06, padding: '64px 2rem 28px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* TOP — Brand + columns */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr repeat(4, 1fr)', gap: 40, marginBottom: 48 }} className="footer-grid">

          {/* Brand */}
          <div>
            <h3 style={{ fontFamily: F.h, color: C.accent, fontSize: 22, letterSpacing: 3, marginBottom: 10 }}>LARRY CASTLEBERRY</h3>
            <p style={{ fontFamily: F.b, color: C.t50, fontSize: 13, lineHeight: 1.7, marginBottom: 16 }}>
              Master Storyteller · Author · Voice Actor · Detroit, MI
            </p>
            <p style={{ fontFamily: F.b, color: C.t25, fontSize: 12, lineHeight: 1.7 }}>
              Performing for libraries, schools, and stages across Michigan and the nation for 20+ years.
            </p>
          </div>

          {/* Nav columns */}
          {COL.map((col) => (
            <div key={col.heading}>
              <p style={{ fontFamily: F.h, color: C.white, fontSize: 13, letterSpacing: 3, marginBottom: 16, textTransform: 'uppercase' }}>{col.heading}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.links.map((l) =>
                  l.external ? (
                    <a key={l.to} href={l.to} target="_blank" rel="noreferrer"
                      style={{ color: C.t50, fontFamily: F.b, fontSize: 13, textDecoration: 'none' }}>
                      {l.label}
                    </a>
                  ) : (
                    <Link key={l.to} to={l.to}
                      style={{ color: C.t50, fontFamily: F.b, fontSize: 13, textDecoration: 'none' }}>
                      {l.label}
                    </Link>
                  )
                )}
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM — copyright */}
        <div style={{ borderTop: '1px solid ' + C.t06, paddingTop: 20, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <p style={{ fontFamily: F.b, color: C.t25, fontSize: 11 }}>
            &copy; {new Date().getFullYear()} Larry Castleberry LLC · All rights reserved
          </p>
          <p style={{ fontFamily: F.b, color: C.t25, fontSize: 11 }}>
            Built by{' '}
            <a href="https://newurbaninfluence.com" target="_blank" rel="noreferrer"
              style={{ color: C.accent, textDecoration: 'none' }}>
              New Urban Influence
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
