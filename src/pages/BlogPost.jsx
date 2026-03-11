import { useParams, Link } from 'react-router-dom';
import { C, F } from '../tokens';
import BLOGS from '../data/blogs';
export default function BlogPost() {
  const { slug } = useParams();
  const post = BLOGS.find((b) => b.slug === slug);
  if (!post) return <div style={{ padding: '120px 2rem', textAlign: 'center', minHeight: '100vh' }}><p style={{ color: C.white }}>Post not found</p></div>;
  return (
    <section style={{ background: C.bg, padding: '120px 2rem 100px', minHeight: '100vh' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <Link to="/blog" style={{ fontFamily: F.b, color: C.accent, fontSize: 13, letterSpacing: 2, textDecoration: 'none' }}>&larr; BACK TO BLOG</Link>
        <p style={{ fontFamily: F.b, fontSize: 12, color: C.accent, letterSpacing: 2, margin: '24px 0 8px' }}>{post.emoji} {post.cat}</p>
        <h1 style={{ fontFamily: F.h, color: C.white, fontSize: 'clamp(28px,5vw,44px)', letterSpacing: 2, marginBottom: 24 }}>{post.title}</h1>
        {post.content.split('\n\n').map((p, i) => (
          <p key={i} style={{ fontFamily: F.b, color: C.t65, fontSize: 16, lineHeight: 1.9, marginBottom: 20 }}>{p}</p>
        ))}
      </div>
    </section>
  );
}
