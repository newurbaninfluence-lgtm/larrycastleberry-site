import { C, F } from '../tokens';
export default function SectionHeader({ tag, title }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: 48 }}>
      <p style={{ fontFamily: F.b, fontSize: 12, color: C.accent, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 8 }}>{tag}</p>
      <h2 style={{ fontFamily: F.h, fontSize: 'clamp(32px,5vw,52px)', color: C.white, letterSpacing: 2, textTransform: 'uppercase', margin: 0 }}>{title}</h2>
      <div style={{ width: 60, height: 3, background: C.accent, margin: '16px auto 0' }} />
    </div>
  );
}
