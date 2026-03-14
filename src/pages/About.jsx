import { C, F } from '../tokens';
import FadeIn from '../components/FadeIn';
import SH from '../components/SectionHeader';
import SEOHead from '../components/SEOHead';
export default function About() {
  return (
    <>
      <SEOHead title="About Larry Castleberry" description="Meet Larry Castleberry — Detroit's master storyteller, MLK Jr. portrayal artist, author of Hush Your Mouth, and voice actor with 20+ years performing across Michigan and the nation." url="/about" />
      <section style={{ background: C.bg, padding: '120px 2rem 100px', minHeight: '100vh' }}>
      <SH tag="About" title="Larry Castleberry" />
      <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: '400px 1fr', gap: 48, alignItems: 'start' }}>
        <FadeIn><img src="/images/about.jpg" alt="Larry" style={{ width: '100%', borderRadius: 8 }} /></FadeIn>
        <FadeIn>
          <p style={{ fontFamily: F.b, color: C.t65, fontSize: 16, lineHeight: 1.8, marginBottom: 16 }}>Larry Castleberry was born with a natural gift for storytelling. His rich, resonant voice has always been a source of great joy, and he has spent his life perfecting his craft.</p>
          <p style={{ fontFamily: F.b, color: C.t65, fontSize: 16, lineHeight: 1.8, marginBottom: 16 }}>His work revolves around exploring the relationships between people and their stories and how those stories create connections and understanding.</p>
          <p style={{ fontFamily: F.b, color: C.t65, fontSize: 16, lineHeight: 1.8, marginBottom: 16 }}>From the Detroit Public Library to Fortune-level boardrooms at Ford Motor Company and Pfizer, Larry transforms any room into an unforgettable experience.</p>
          <p style={{ fontFamily: F.b, color: C.t50, fontSize: 14, lineHeight: 1.7, fontStyle: 'italic', borderLeft: '3px solid ' + C.accent, paddingLeft: 16, marginTop: 20 }}>&ldquo;His ability to connect with the audience through vocal variety, facial expressions and body gestures is truly amazing and powerful.&rdquo; &mdash; Satori Shakoor</p>
        </FadeIn>
      </div>
    </section>
    </>
  );
}
