import { Link } from 'react-router-dom';
import { C, F, VIDEO_URL } from '../tokens';
import FadeIn from '../components/FadeIn';
import SH from '../components/SectionHeader';
import Btn from '../components/Btn';
import TC from '../components/TestimonialCarousel';
import BF from '../components/BookingForm';
import SEOHead from '../components/SEOHead';
import SERVICES from '../data/services';
import TRUSTED from '../data/trusted';
import BLOGS from '../data/blogs';

const HOME_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Larry Castleberry',
  jobTitle: 'Storyteller, Author, Voice Actor',
  url: 'https://www.larrycastleberry.com',
  image: 'https://www.larrycastleberry.com/images/pro.jpg',
  address: { '@type': 'PostalAddress', addressLocality: 'Detroit', addressRegion: 'MI', addressCountry: 'US' },
  worksFor: { '@type': 'Organization', name: 'Larry Castleberry LLC' },
  knowsAbout: ['Storytelling', 'Public Speaking', 'Voice Acting', 'Narration', 'MLK Jr. Portrayal'],
};

export default function Home() {
  return (
    <>
      <SEOHead
        title="Master Storyteller, Author & Voice Actor | Detroit, MI"
        description="Larry Castleberry is Detroit's premier storytelling speaker, author, and voice actor. Trusted by Ford, Pfizer, and Michigan libraries. Book for events, schools, and corporate keynotes."
        url="/"
        schema={HOME_SCHEMA}
      />

const GAL = [
  { img: '/images/kids.jpg', label: 'Live Performance', sub: 'Next generation', tall: true },
  { img: '/images/mic-stage.jpg', label: 'Voice Actor', sub: 'Stage & studio' },
  { img: '/images/headphones.jpg', label: 'Narration', sub: 'Audio production' },
  { img: '/images/book-holding.jpg', label: 'Author', sub: 'Hush Your Mouth' },
  { img: '/images/pro.jpg', label: 'Keynote', sub: 'Ideas That Inspire' },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section style={{ minHeight: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="/images/hero.jpg" alt="Larry Castleberry" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg,rgba(0,0,0,0.8) 0%,rgba(0,0,0,0.35) 40%,rgba(0,0,0,0.35) 60%,rgba(0,0,0,0.75) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '120px 2rem 80px', width: '100%' }}>
          <FadeIn><p style={{ fontFamily: F.b, color: C.t50, fontSize: 13, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 20 }}>Master Storyteller · Author · Voice Actor</p></FadeIn>
          <FadeIn><h1 style={{ fontFamily: F.h, fontSize: 'clamp(64px,10vw,140px)', color: C.white, margin: 0, lineHeight: 0.9, letterSpacing: 8, textTransform: 'uppercase' }}>Larry<br /><span style={{ color: C.accent }}>Castleberry</span></h1></FadeIn>
          <FadeIn><p style={{ fontFamily: F.h, fontSize: 'clamp(18px,2.5vw,36px)', color: C.t65, letterSpacing: 4, textTransform: 'uppercase', margin: '20px 0 28px' }}>Stories that move rooms. Voices that move people.</p></FadeIn>
          <FadeIn style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="/book-online"><Btn>Book for Your Event</Btn></Link>
            <Link to="/storytelling"><Btn outline>Explore Services</Btn></Link>
          </FadeIn>
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{ overflow: 'hidden', background: C.accent, padding: '12px 0', whiteSpace: 'nowrap' }}>
        <div style={{ display: 'inline-block', animation: 'marquee 20s linear infinite' }}>
          <span style={{ fontFamily: F.h, fontSize: 18, color: '#000', letterSpacing: 4 }}>{'LARRY CASTLEBERRY \u25C6 STORYTELLER \u25C6 VOICE ACTOR \u25C6 AUTHOR \u25C6 SPEAKER \u25C6 '.repeat(4)}</span>
        </div>
      </div>

      {/* GALLERY */}
      <section style={{ background: C.bg, padding: '80px 2rem' }}>
        <SH tag="In Action" title="On Stage &amp; In Studio" />
        <div className="gallery-grid" style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.3fr 1fr 1fr', gridTemplateRows: '300px 300px', gap: 16 }}>
          {GAL.map((g, i) => (
            <FadeIn key={i} className="gallery-card" style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', gridRow: g.tall ? 'span 2' : undefined }}>
              <img src={g.img} alt={g.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, background: 'linear-gradient(0deg,rgba(0,0,0,0.9) 0%,transparent 100%)' }}>
                <span style={{ fontFamily: F.h, color: C.accent, fontSize: 20, letterSpacing: 2 }}>{g.label}</span>
                <span style={{ display: 'block', fontFamily: F.b, color: C.t65, fontSize: 12, marginTop: 2 }}>{g.sub}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* VIDEO */}
      <section style={{ position: 'relative', overflow: 'hidden', height: 700 }}>
        <video autoPlay muted loop playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}>
          <source src={VIDEO_URL} type="video/mp4" />
        </video>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg,rgba(0,0,0,0.85) 0%,rgba(0,0,0,0.4) 40%,rgba(0,0,0,0.4) 60%,rgba(0,0,0,0.85) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
          <p style={{ fontFamily: F.b, fontSize: 12, color: C.accent, letterSpacing: 4, marginBottom: 12 }}>WATCH LARRY LIVE</p>
          <h2 style={{ fontFamily: F.h, fontSize: 'clamp(36px,6vw,64px)', color: C.white, letterSpacing: 4, margin: '0 0 20px' }}>EXPERIENCE THE <span style={{ color: C.accent }}>ENERGY</span></h2>
          <p style={{ fontFamily: F.b, color: C.t65, fontSize: 16, maxWidth: 550, lineHeight: 1.7, marginBottom: 28 }}>From packed auditoriums to intimate library readings, Larry transforms every event.</p>
          <Link to="/book-online"><Btn>Book for Your Event</Btn></Link>
        </div>
      </section>

      {/* GUARANTEED */}
      <section style={{ background: C.surface, padding: '80px 2rem' }}>
        <FadeIn style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: F.h, fontSize: 'clamp(28px,4vw,44px)', color: C.white, letterSpacing: 2, marginBottom: 16 }}>GUARANTEED TO MAKE YOUR EVENT <span style={{ color: C.accent }}>MORE EXCITING!</span></h2>
        </FadeIn>
      </section>

      {/* TRUSTED */}
      <section style={{ background: C.surface, padding: '40px 0', borderTop: '1px solid ' + C.t06, overflow: 'hidden' }}>
        <p style={{ fontFamily: F.b, fontSize: 11, color: C.t25, letterSpacing: 4, textAlign: 'center', marginBottom: 20 }}>TRUSTED BY ORGANIZATIONS NATIONWIDE</p>
        <div style={{ display: 'flex', animation: 'marquee 25s linear infinite', width: 'max-content' }}>
          {[0, 1].map((r) => (
            <div key={r} style={{ display: 'flex', gap: 40, padding: '0 20px' }}>
              {TRUSTED.map((t, i) => (
                <div key={i} style={{ textAlign: 'center', minWidth: 140 }}>
                  <p style={{ fontFamily: F.h, fontSize: t.name.length <= 6 ? 24 : 16, color: C.white, letterSpacing: 2 }}>{t.name}</p>
                  <p style={{ fontFamily: F.b, fontSize: 11, color: C.t50 }}>{t.sub}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section style={{ background: C.bg, padding: '100px 2rem' }}>
        <SH tag="What Larry Does" title="Services" />
        <div className="services-grid" style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
          {SERVICES.map((s, i) => (
            <Link key={i} to={'/' + s.slug} style={{ textDecoration: 'none' }}>
              <FadeIn className="card-hover" style={{ background: C.card, padding: 32, border: '1px solid ' + C.t06, borderRadius: 8, height: '100%' }}>
                <div style={{ fontFamily: F.h, fontSize: 48, color: C.accent }}>{s.num}</div>
                <h3 style={{ fontFamily: F.h, color: C.white, fontSize: 24, letterSpacing: 1, margin: '12px 0 8px' }}>{s.title}</h3>
                <p style={{ fontFamily: F.b, color: C.t50, fontSize: 14, lineHeight: 1.7 }}>{s.desc}</p>
                {s.details.map((d, j) => (
                  <div key={j} style={{ fontFamily: F.b, color: C.t65, fontSize: 13, margin: '4px 0', paddingLeft: 12, borderLeft: '2px solid ' + C.t06 }}>{d}</div>
                ))}
                <div style={{ fontFamily: F.h, color: C.accent, fontSize: 18, marginTop: 20 }}>{s.price}</div>
              </FadeIn>
            </Link>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section style={{ background: C.surface, padding: '100px 2rem' }}>
        <SH tag="What People Say" title="Reviews" />
        <TC />
      </section>

      {/* BOOK */}
      <section style={{ background: 'linear-gradient(135deg,#0a0a0a,#1a1400,#0a0a0a)', padding: '100px 2rem' }}>
        <SH tag="Available Now" title="The Book" />
        <div className="book-grid" style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: '260px 1fr', gap: 60, alignItems: 'center' }}>
          <FadeIn>
            <img src="/images/book-cover.jpg" alt="Hush Your Mouth" style={{ width: '100%', borderRadius: 8, boxShadow: '0 30px 80px rgba(0,0,0,0.6)' }} />
          </FadeIn>
          <FadeIn>
            <h3 style={{ fontFamily: F.h, fontSize: 'clamp(28px,4vw,44px)', color: C.white, letterSpacing: 2, lineHeight: 1 }}>HUSH YOUR MOUTH,<br /><span style={{ color: C.accent }}>WHAT YOU SAY!</span></h3>
            <p style={{ fontFamily: F.b, color: C.t50, fontSize: 15, fontStyle: 'italic', margin: '12px 0 20px', paddingLeft: 16, borderLeft: '3px solid ' + C.accent }}>Stories of Family, Food, and the Lessons in Between</p>
            <p style={{ fontFamily: F.b, color: C.t65, fontSize: 15, lineHeight: 1.8, marginBottom: 24 }}>A warm, funny, and deeply personal collection rooted in family, food, and the lessons that shaped a storyteller.</p>
            <Link to="/shop"><Btn>Order Your Copy</Btn></Link>
          </FadeIn>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section style={{ background: C.bg, padding: '100px 2rem' }}>
        <SH tag="Latest Stories" title="Blog" />
        <div className="blog-grid" style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
          {BLOGS.map((p, i) => (
            <Link key={i} to={'/blog/' + p.slug} style={{ textDecoration: 'none' }}>
              <FadeIn className="card-hover" style={{ background: C.card, border: '1px solid ' + C.t06, overflow: 'hidden', borderRadius: 8 }}>
                <div style={{ height: 160, background: 'linear-gradient(135deg,#1a1a00,' + C.card + ')', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 48 }}>{p.emoji}</span>
                </div>
                <div style={{ padding: 24 }}>
                  <p style={{ fontFamily: F.b, fontSize: 11, color: C.accent, letterSpacing: 2, marginBottom: 8 }}>{p.cat}</p>
                  <h3 style={{ fontFamily: F.h, color: C.white, fontSize: 20, letterSpacing: 1, marginBottom: 8 }}>{p.title}</h3>
                  <p style={{ fontFamily: F.b, color: C.t50, fontSize: 13, lineHeight: 1.6 }}>{p.excerpt}</p>
                </div>
              </FadeIn>
            </Link>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section style={{ background: C.bg, padding: '100px 2rem' }}>
        <SH tag="Get in Touch" title="Contact" />
        <BF />
      </section>
    </>
  );
}
