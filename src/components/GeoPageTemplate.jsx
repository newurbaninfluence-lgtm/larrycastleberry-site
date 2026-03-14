import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { C, F } from '../tokens';
import FadeIn from './FadeIn';
import Btn from './Btn';
import SH from './SectionHeader';
import BF from './BookingForm';
import SEOHead from './SEOHead';

export default function GeoPageTemplate({ page }) {
  const { city, state, heroTag, headline, subhead, credential,
    credentialSub, targetOrgs, cta, type, metaTitle, metaDesc } = page;

  // ── SEO: update title + meta description per page ──
  useEffect(() => {
    document.title = metaTitle;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta); }
    meta.content = metaDesc;

    // LocalBusiness schema
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Larry Castleberry',
      description: metaDesc,
      url: `https://www.larrycastleberry.com/${page.slug}`,
      telephone: '',
      address: { '@type': 'PostalAddress', addressLocality: city, addressRegion: state, addressCountry: 'US' },
      areaServed: { '@type': 'City', name: city },
      priceRange: '$$',
      image: 'https://www.larrycastleberry.com/images/pro.jpg',
    };
    let script = document.getElementById('lc-schema');
    if (!script) { script = document.createElement('script'); script.id = 'lc-schema'; script.type = 'application/ld+json'; document.head.appendChild(script); }
    script.textContent = JSON.stringify(schema);

    return () => { script?.remove(); };
  }, [page.slug]);

  return (
    <>
      {/* ── HERO ── */}
      <section style={{ minHeight: '70vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="/images/hero.jpg" alt={`Larry Castleberry ${city}`} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg,rgba(0,0,0,0.88) 0%,rgba(0,0,0,0.45) 50%,rgba(0,0,0,0.7) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '140px 2rem 80px', width: '100%', maxWidth: 900, margin: '0 auto' }}>
          <FadeIn>
            <p style={{ fontFamily: F.b, color: C.accent, fontSize: 12, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 16 }}>
              📍 {heroTag}
            </p>
          </FadeIn>
          <FadeIn>
            <h1 style={{ fontFamily: F.h, fontSize: 'clamp(36px,6vw,72px)', color: C.white, margin: '0 0 16px', lineHeight: 1, letterSpacing: 4, textTransform: 'uppercase' }}>
              {headline}
            </h1>
          </FadeIn>
          <FadeIn>
            <p style={{ fontFamily: F.b, fontSize: 'clamp(15px,2vw,20px)', color: C.t65, maxWidth: 640, margin: '0 auto 32px', lineHeight: 1.6 }}>
              {subhead}
            </p>
          </FadeIn>
          <FadeIn>
            <Link to="/book-online"><Btn>{cta}</Btn></Link>
          </FadeIn>
        </div>
      </section>

      {/* ── CREDENTIAL BANNER ── */}
      <div style={{ background: C.accent, padding: '20px 2rem' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', justifyContent: 'center', textAlign: 'center' }}>
          <span style={{ fontFamily: F.h, fontSize: 14, color: '#000', letterSpacing: 3 }}>
            {type === 'warm' ? '✅ PAST PERFORMER:' : '🎤 DETROIT-BASED PERFORMER:'}
          </span>
          <span style={{ fontFamily: F.h, fontSize: 18, color: '#000', letterSpacing: 2 }}>{credential}</span>
          <span style={{ fontFamily: F.b, fontSize: 12, color: 'rgba(0,0,0,0.6)' }}>{credentialSub}</span>
        </div>
      </div>

      {/* ── ABOUT LARRY ── */}
      <section style={{ background: C.surface, padding: '80px 2rem' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: '280px 1fr', gap: 60, alignItems: 'center' }} className="book-grid">
          <FadeIn>
            <img src="/images/pro.jpg" alt={`Larry Castleberry ${city} storyteller`} style={{ width: '100%', borderRadius: 12, border: '2px solid ' + C.t06 }} />
          </FadeIn>
          <FadeIn>
            <p style={{ fontFamily: F.b, fontSize: 12, color: C.accent, letterSpacing: 4, marginBottom: 12 }}>MASTER STORYTELLER · AUTHOR · VOICE ACTOR</p>
            <h2 style={{ fontFamily: F.h, fontSize: 'clamp(28px,4vw,44px)', color: C.white, letterSpacing: 2, marginBottom: 16, lineHeight: 1 }}>
              20+ YEARS MOVING <span style={{ color: C.accent }}>MICHIGAN AUDIENCES</span>
            </h2>
            <p style={{ fontFamily: F.b, color: C.t65, fontSize: 15, lineHeight: 1.8, marginBottom: 16 }}>
              Larry Castleberry has performed for over 500 events across Michigan and the nation — from intimate library readings to packed auditoriums. His unique blend of storytelling, MLK portrayal, and voice artistry transforms any event.
            </p>
            <p style={{ fontFamily: F.b, color: C.t65, fontSize: 15, lineHeight: 1.8, marginBottom: 24 }}>
              Trusted by Ford Motor Company, Pfizer, Detroit Public Library, Capital Area District Libraries, Bay County Library, and The Ark in Ann Arbor.
            </p>
            <Link to="/about"><Btn outline>Learn More About Larry</Btn></Link>
          </FadeIn>
        </div>
      </section>

      {/* ── TARGET ORGS ── */}
      <section style={{ background: C.bg, padding: '80px 2rem' }}>
        <SH tag={`Perfect for ${city} Organizations`} title={`Who Books Larry in ${city}`} />
        <div className="services-grid" style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
          {targetOrgs.map((org, i) => (
            <FadeIn key={i} className="card-hover" style={{ background: C.card, border: '1px solid ' + C.t06, borderRadius: 8, padding: '20px 24px' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: C.accent, marginBottom: 12 }} />
              <p style={{ fontFamily: F.h, color: C.white, fontSize: 16, letterSpacing: 1 }}>{org}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section style={{ background: C.surface, padding: '80px 2rem' }}>
        <SH tag="What Larry Brings" title="Services Available" />
        <div className="services-grid" style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
          {[
            { icon: '🎤', title: 'Live Storytelling', desc: '30-60 min performances for libraries, schools, and events' },
            { icon: '👑', title: 'MLK Jr. Portrayal', desc: 'Powerful Dr. Martin Luther King Jr. living history performance' },
            { icon: '🎙️', title: 'Voice Acting', desc: 'Narration, audiobooks, commercials, and brand audio' },
          ].map((s, i) => (
            <FadeIn key={i} className="card-hover" style={{ background: C.card, border: '1px solid ' + C.t06, borderRadius: 8, padding: 28, textAlign: 'center' }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>{s.icon}</div>
              <h3 style={{ fontFamily: F.h, color: C.white, fontSize: 20, letterSpacing: 1, marginBottom: 8 }}>{s.title}</h3>
              <p style={{ fontFamily: F.b, color: C.t50, fontSize: 13, lineHeight: 1.7 }}>{s.desc}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── CTA + BOOKING FORM ── */}
      <section style={{ background: 'linear-gradient(135deg,#0a0a0a,#1a1400,#0a0a0a)', padding: '100px 2rem' }}>
        <SH tag={`Book Larry in ${city}`} title={`Ready to Bring the Story to ${city}?`} />
        <BF />
      </section>
    </>
  );
}
