import { Link } from 'react-router-dom';
import { C, F } from '../tokens';
import FadeIn from '../components/FadeIn';
import SH from '../components/SectionHeader';
import BLOGS from '../data/blogs';
export default function Blog() {
  return (
    <section style={{ background: C.bg, padding: '120px 2rem 100px', minHeight: '100vh' }}>
      <SH tag="Latest Stories" title="Blog" />
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        {BLOGS.map((p, i) => (
          <Link key={i} to={'/blog/' + p.slug} style={{ textDecoration: 'none' }}>
            <FadeIn style={{ background: C.card, border: '1px solid ' + C.t06, padding: 32, marginBottom: 24, borderRadius: 8 }}>
              <p style={{ fontFamily: F.b, fontSize: 11, color: C.accent, letterSpacing: 2, marginBottom: 8 }}>{p.emoji} {p.cat}</p>
              <h3 style={{ fontFamily: F.h, color: C.white, fontSize: 28, letterSpacing: 1, marginBottom: 8 }}>{p.title}</h3>
              <p style={{ fontFamily: F.b, color: C.t50, fontSize: 15, lineHeight: 1.7 }}>{p.excerpt}</p>
            </FadeIn>
          </Link>
        ))}
      </div>
    </section>
  );
}
