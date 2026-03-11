import { useState, useEffect } from 'react';
import { C, F } from '../tokens';
import T from '../data/testimonials';
export default function TestimonialCarousel() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((x) => (x + 1) % T.length), 5000); return () => clearInterval(t); }, []);
  const t = T[i];
  return (
    <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', minHeight: 220 }}>
      <p key={i} style={{ fontFamily: F.b, color: C.t85, fontSize: 16, lineHeight: 1.8, fontStyle: 'italic', marginBottom: 20 }}>
        &ldquo;{t.q}&rdquo;
      </p>
      <p style={{ fontFamily: F.h, color: C.accent, fontSize: 18, letterSpacing: 2 }}>{t.n}</p>
      <p style={{ fontFamily: F.b, color: C.t50, fontSize: 13 }}>{t.r}</p>
      <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 20 }}>
        {T.map((_, j) => (
          <button key={j} onClick={() => setI(j)} style={{ width: 8, height: 8, borderRadius: '50%', border: 'none', cursor: 'pointer', background: j === i ? C.accent : C.t25 }} />
        ))}
      </div>
    </div>
  );
}
