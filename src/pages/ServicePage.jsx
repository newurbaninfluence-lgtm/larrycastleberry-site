import { Link } from 'react-router-dom';
import { C, F } from '../tokens';
import FadeIn from '../components/FadeIn';
import SH from '../components/SectionHeader';
import Btn from '../components/Btn';
export default function ServicePage({ service }) {
  return (
    <section style={{ background: C.bg, padding: '120px 2rem 100px', minHeight: '100vh' }}>
      <SH tag="Our Services" title={service.title} />
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <FadeIn>
          <p style={{ fontFamily: F.b, color: C.t65, fontSize: 16, lineHeight: 1.8, textAlign: 'center', marginBottom: 40 }}>{service.pageDesc}</p>
          {service.items.map((d, i) => (
            <div key={i} style={{ background: C.card, border: '1px solid ' + C.t06, padding: 24, marginBottom: 16, borderRadius: 8 }}>
              <p style={{ fontFamily: F.b, color: C.white, fontSize: 16 }}>{d}</p>
            </div>
          ))}
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link to="/book-online"><Btn>Book This Service</Btn></Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
