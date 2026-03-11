import { useState } from 'react';
import { C, F } from '../tokens';
import Btn from '../components/Btn';
export default function Admin() {
  const [auth, setAuth] = useState(false);
  const [pw, setPw] = useState('');
  const [tab, setTab] = useState('bookings');
  const bookings = [
    { id: 1, name: 'Detroit Public Library', email: 'events@dpl.org', service: 'Storytelling', date: '2025-03-15', status: 'pending' },
    { id: 2, name: 'Ford Motor Company', email: 'hr@ford.com', service: 'Corporate Training', date: '2025-04-01', status: 'confirmed' },
  ];
  const orders = [
    { id: 101, name: 'Sarah Johnson', qty: 3, total: 74.97, ship: 'ship', status: 'paid' },
    { id: 102, name: 'Marcus Williams', qty: 10, total: 212.43, ship: 'pickup', status: 'paid' },
  ];
  const msgs = [{ id: 201, name: 'Lisa Park', email: 'lisa@email.com', msg: 'Interested in booking for our school event', date: '2025-03-08' }];
  const badge = (s) => ({ fontFamily: F.h, fontSize: 11, padding: '4px 12px', background: s === 'confirmed' || s === 'paid' ? 'rgba(212,255,0,0.15)' : 'rgba(255,200,0,0.1)', color: s === 'confirmed' || s === 'paid' ? C.accent : '#ffc800', borderRadius: 4, letterSpacing: 2 });
  if (!auth) return (
    <div style={{ padding: '120px 2rem', textAlign: 'center', minHeight: '100vh' }}>
      <h2 style={{ fontFamily: F.h, color: C.white, fontSize: 36, letterSpacing: 2, marginBottom: 24 }}>ADMIN LOGIN</h2>
      <form onSubmit={(e) => { e.preventDefault(); if (pw === 'admin') setAuth(true); else alert('Try: admin'); }} style={{ maxWidth: 400, margin: '0 auto' }}>
        <input type="password" placeholder="Password" value={pw} onChange={(e) => setPw(e.target.value)} style={{ width: '100%', padding: '12px 16px', background: C.surface, border: '1px solid ' + C.t06, color: C.white, fontFamily: F.b, fontSize: 15, marginBottom: 12, borderRadius: 4 }} />
        <Btn style={{ width: '100%' }}>Login</Btn>
      </form>
    </div>
  );
  const tS = (t) => ({ fontFamily: F.h, fontSize: 14, letterSpacing: 2, padding: '8px 20px', cursor: 'pointer', background: tab === t ? C.accent : 'transparent', color: tab === t ? '#000' : C.t50, border: '1px solid ' + (tab === t ? C.accent : C.t06), borderRadius: 4 });
  return (
    <div style={{ padding: '100px 2rem', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <h2 style={{ fontFamily: F.h, color: C.white, fontSize: 36, letterSpacing: 2, marginBottom: 24 }}>ADMIN DASHBOARD</h2>
        <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
          {['bookings', 'orders', 'messages'].map((t) => <button key={t} onClick={() => setTab(t)} style={tS(t)}>{t.toUpperCase()}</button>)}
        </div>
        {tab === 'bookings' && bookings.map((b) => (
          <div key={b.id} style={{ background: C.card, border: '1px solid ' + C.t06, padding: 20, marginBottom: 12, borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div><p style={{ fontFamily: F.h, color: C.white, fontSize: 18 }}>{b.name}</p><p style={{ fontFamily: F.b, color: C.t50, fontSize: 13 }}>{b.email} &middot; {b.service} &middot; {b.date}</p></div>
            <span style={badge(b.status)}>{b.status.toUpperCase()}</span>
          </div>
        ))}
        {tab === 'orders' && orders.map((o) => (
          <div key={o.id} style={{ background: C.card, border: '1px solid ' + C.t06, padding: 20, marginBottom: 12, borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div><p style={{ fontFamily: F.h, color: C.white, fontSize: 18 }}>Order #{o.id} &mdash; {o.name}</p><p style={{ fontFamily: F.b, color: C.t50, fontSize: 13 }}>{o.qty} copies &middot; ${o.total.toFixed(2)} &middot; {o.ship === 'ship' ? '\ud83d\udce6' : '\ud83d\udccd'}</p></div>
            <span style={badge(o.status)}>{o.status.toUpperCase()}</span>
          </div>
        ))}
        {tab === 'messages' && msgs.map((m) => (
          <div key={m.id} style={{ background: C.card, border: '1px solid ' + C.t06, padding: 20, marginBottom: 12, borderRadius: 8 }}>
            <p style={{ fontFamily: F.h, color: C.white, fontSize: 18 }}>{m.name}</p>
            <p style={{ fontFamily: F.b, color: C.t50, fontSize: 13 }}>{m.email} &middot; {m.date}</p>
            <p style={{ fontFamily: F.b, color: C.t65, fontSize: 14, marginTop: 8 }}>{m.msg}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
