import { useState } from 'react';
import { C, F } from '../tokens';
import Btn from './Btn';
export default function BookingForm() {
  const [form, setForm] = useState({ name: '', email: '', org: '', service: 'Keynote / Storytelling', date: '', details: '' });
  const [done, setDone] = useState(false);
  const inp = { width: '100%', padding: '12px 16px', background: C.surface, border: '1px solid ' + C.t06, color: C.white, fontFamily: F.b, fontSize: 15, borderRadius: 4 };
  if (done) return (
    <div style={{ textAlign: 'center', padding: 40 }}>
      <p style={{ fontSize: 48, marginBottom: 12 }}>&#x2705;</p>
      <p style={{ fontFamily: F.h, color: C.accent, fontSize: 28, letterSpacing: 2 }}>REQUEST SENT!</p>
      <p style={{ fontFamily: F.b, color: C.t65, marginTop: 8 }}>We'll be in touch within 48 hours.</p>
    </div>
  );
  return (
    <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 560, margin: '0 auto' }}>
      <input placeholder="Your Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inp} />
      <input type="email" placeholder="Email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inp} />
      <input placeholder="Organization" value={form.org} onChange={(e) => setForm({ ...form, org: e.target.value })} style={inp} />
      <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} style={inp}>
        <option>Keynote / Storytelling</option>
        <option>Narration</option>
        <option>Voice Over</option>
        <option>Corporate Training</option>
      </select>
      <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} style={inp} />
      <textarea placeholder="Tell us about your event..." rows={4} value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} style={{ ...inp, resize: 'vertical' }} />
      <Btn style={{ width: '100%' }}>Submit Booking Request</Btn>
    </form>
  );
}
