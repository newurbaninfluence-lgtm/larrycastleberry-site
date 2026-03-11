import SH from '../components/SectionHeader';
import BF from '../components/BookingForm';
import { C } from '../tokens';
export default function Contact() {
  return (
    <section style={{ background: C.bg, padding: '120px 2rem 100px', minHeight: '100vh' }}>
      <SH tag="Get in Touch" title="Contact" />
      <BF />
    </section>
  );
}
