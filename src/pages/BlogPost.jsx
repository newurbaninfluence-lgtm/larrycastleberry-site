import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { C, F } from '../tokens';
import { supabase } from '../supabase';
import STATIC_BLOGS from '../data/blogs';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (supabase) {
        const { data } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .eq('published', true)
          .single();
        setPost(data || STATIC_BLOGS.find(b => b.slug === slug) || null);
      } else {
        setPost(STATIC_BLOGS.find(b => b.slug === slug) || null);
      }
      setLoading(false);
    }
    load();
  }, [slug]);

  if (loading) return (
    <div style={{ padding: '120px 2rem', textAlign: 'center', minHeight: '100vh' }}>
      <div style={{ fontFamily: F.h, color: C.accent, fontSize: 18, letterSpacing: 4 }}>LOADING...</div>
    </div>
  );

  if (!post) return (
    <div style={{ padding: '120px 2rem', textAlign: 'center', minHeight: '100vh' }}>
      <p style={{ fontFamily: F.h, color: C.white, fontSize: 24 }}>Post not found</p>
      <Link to="/blog" style={{ fontFamily: F.b, color: C.accent, marginTop: 16, display: 'inline-block' }}>← Back to Blog</Link>
    </div>
  );

  return (
    <article style={{ background: C.bg, minHeight: '100vh', paddingBottom: 100 }}>
      {/* HERO IMAGE */}
      {post.image_url ? (
        <div style={{ height: 480, position: 'relative', overflow: 'hidden' }}>
          <img src={post.image_url} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg,rgba(0,0,0,0.85) 0%,rgba(0,0,0,0.3) 60%)' }} />
          <div style={{ position: 'absolute', bottom: 48, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 760, padding: '0 2rem' }}>
            <p style={{ fontFamily: F.b, fontSize: 11, color: C.accent, letterSpacing: 3, marginBottom: 12 }}>{post.emoji} {post.cat?.toUpperCase()}</p>
            <h1 style={{ fontFamily: F.h, color: C.white, fontSize: 'clamp(28px,5vw,52px)', letterSpacing: 2, lineHeight: 1.05 }}>{post.title}</h1>
          </div>
        </div>
      ) : (
        <div style={{ padding: '120px 2rem 40px', maxWidth: 760, margin: '0 auto' }}>
          <p style={{ fontFamily: F.b, fontSize: 11, color: C.accent, letterSpacing: 3, marginBottom: 12 }}>{post.emoji} {post.cat?.toUpperCase()}</p>
          <h1 style={{ fontFamily: F.h, color: C.white, fontSize: 'clamp(28px,5vw,52px)', letterSpacing: 2, lineHeight: 1.05 }}>{post.title}</h1>
        </div>
      )}

      {/* BODY */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: post.image_url ? '48px 2rem 0' : '0 2rem' }}>
        <Link to="/blog" style={{ fontFamily: F.b, color: C.accent, fontSize: 12, letterSpacing: 3, textDecoration: 'none', display: 'inline-block', marginBottom: 40 }}>← BACK TO BLOG</Link>

        {(post.content || '').split('\n\n').map((para, i) => (
          <p key={i} style={{ fontFamily: F.b, color: C.t65, fontSize: 17, lineHeight: 1.95, marginBottom: 24 }}>{para}</p>
        ))}

        {/* RELATED / BACK CTA */}
        <div style={{ marginTop: 60, paddingTop: 40, borderTop: '1px solid ' + C.t06, textAlign: 'center' }}>
          <Link to="/blog" style={{ fontFamily: F.h, color: C.accent, fontSize: 14, letterSpacing: 3, textDecoration: 'none' }}>← MORE STORIES</Link>
        </div>
      </div>
    </article>
  );
}
