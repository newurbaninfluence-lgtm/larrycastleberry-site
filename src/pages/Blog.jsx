import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { C, F } from '../tokens';
import FadeIn from '../components/FadeIn';
import SH from '../components/SectionHeader';
import SEOHead from '../components/SEOHead';
import { supabase } from '../supabase';
import STATIC_BLOGS from '../data/blogs';

const CATS = ['All', 'Storytelling', 'Behind the Book', 'Voice Acting', 'Speaking', 'Life Lessons'];

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (supabase) {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false });
        setPosts(error || !data?.length ? STATIC_BLOGS : data);
      } else {
        setPosts(STATIC_BLOGS);
      }
      setLoading(false);
    }
    load();
  }, []);

  const filtered = filter === 'All' ? posts : posts.filter(p => p.cat === filter);

  return (
    <section style={{ background: C.bg, minHeight: '100vh', padding: '120px 2rem 100px' }}>
      <SEOHead title="Blog — Stories & Insights" description="Stories, tips, and insights from master storyteller Larry Castleberry. Topics include storytelling, voice acting, public speaking, and life lessons." url="/blog" />
      <SH tag="Latest Stories" title="The Blog" />

      {/* CATEGORY FILTER */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 900, margin: '0 auto 60px' }}>
        {CATS.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)} style={{
            fontFamily: F.h, fontSize: 13, letterSpacing: 2, padding: '8px 20px',
            background: filter === cat ? C.accent : 'transparent',
            color: filter === cat ? '#000' : C.t50,
            border: '1px solid ' + (filter === cat ? C.accent : C.t25),
            borderRadius: 4, cursor: 'pointer', transition: 'all 0.2s'
          }}>{cat.toUpperCase()}</button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 60 }}>
          <div style={{ fontFamily: F.h, color: C.accent, fontSize: 18, letterSpacing: 4 }}>LOADING...</div>
        </div>
      ) : (
        <div className="blog-dir-grid" style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 28 }}>
          {filtered.map((p, i) => (
            <Link key={p.slug || i} to={'/blog/' + p.slug} style={{ textDecoration: 'none' }}>
              <FadeIn className="card-hover" style={{ background: C.card, border: '1px solid ' + C.t06, borderRadius: 10, overflow: 'hidden', height: '100%' }}>
                {/* IMAGE OR FALLBACK */}
                <div style={{ height: 200, overflow: 'hidden', position: 'relative' }}>
                  {p.image_url ? (
                    <img src={p.image_url} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} className="blog-img" />
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg,#1a1400,#0a0a0a)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: 52 }}>{p.emoji || '✍️'}</span>
                    </div>
                  )}
                  <div style={{ position: 'absolute', top: 12, left: 12, background: C.accent, color: '#000', fontFamily: F.h, fontSize: 11, letterSpacing: 2, padding: '4px 10px', borderRadius: 3 }}>{p.cat}</div>
                </div>
                <div style={{ padding: '24px 24px 28px' }}>
                  <h3 style={{ fontFamily: F.h, color: C.white, fontSize: 22, letterSpacing: 1, marginBottom: 10, lineHeight: 1.1 }}>{p.title}</h3>
                  <p style={{ fontFamily: F.b, color: C.t50, fontSize: 13, lineHeight: 1.7, marginBottom: 16 }}>{p.excerpt}</p>
                  <span style={{ fontFamily: F.h, fontSize: 12, color: C.accent, letterSpacing: 2 }}>READ MORE →</span>
                </div>
              </FadeIn>
            </Link>
          ))}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <p style={{ textAlign: 'center', fontFamily: F.b, color: C.t50, marginTop: 40 }}>No posts in this category yet.</p>
      )}
    </section>
  );
}
