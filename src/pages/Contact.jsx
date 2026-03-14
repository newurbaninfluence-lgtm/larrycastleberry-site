import SH from '../components/SectionHeader';
import BF from '../components/BookingForm';
import SEOHead from '../components/SEOHead';
import { C } from '../tokens';
export default function Contact() {
  return (
    <>
      <SEOHead title="Book Larry Castleberry" description="Ready to bring Larry Castleberry to your event? Book Detroit's premier storytelling speaker for libraries, schools, corporate events, and community programs." url="/contact" />
      <section style={{ background: C.bg, padding: '120px 2rem 100px', minHeight: '100vh' }}>
        <SH tag="Get in Touch" title="Contact" />
        <BF />
      </section>
    </>
  );
}
