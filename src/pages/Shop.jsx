import { useState } from 'react';
import { C, F } from '../tokens';
import FadeIn from '../components/FadeIn';
import SH from '../components/SectionHeader';
import Btn from '../components/Btn';
export default function Shop() {
  const [qty, setQty] = useState(1);
  const [ship, setShip] = useState('ship');
  const [checkout, setCheckout] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', address: '', city: '', state: '', zip: '' });
  const [done, setDone] = useState(false);
  const price = 24.99;
  const disc = qty >= 5 ? 0.15 : 0;
  const sub = price * qty * (1 - disc);
  const shipCost = ship === 'ship' ? (qty <= 2 ? 5.99 : 9.99) : 0;
  const total = sub + shipCost;
  const inp = { width: '100%', padding: '10px 14px', background: C.surface, border: '1px solid ' + C.t06, color: C.white, fontFamily: F.b, fontSize: 14, borderRadius: 4 };
  if (done) return (
    <div style={{ padding: '120px 2rem', textAlign: 'center', minHeight: '100vh' }}>
      <p style={{ fontSize: 64 }}>&#x2705;</p>
      <h2 style={{ fontFamily: F.h, color: C.accent, fontSize: 36, letterSpacing: 2, marginTop: 16 }}>ORDER CONFIRMED!</h2>
      <p style={{ fontFamily: F.b, color: C.t65, marginTop: 12 }}>{qty} {qty === 1 ? 'copy' : 'copies'} &mdash; confirmation email sent.</p>
    </div>
  );
  return (
    <section style={{ background: C.bg, padding: '120px 2rem 100px', minHeight: '100vh' }}>
      <SH tag="Get Your Copy" title="Book Shop" />
      <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: '260px 1fr', gap: 48, alignItems: 'start' }}>
        <FadeIn><img src="/images/book-cover.jpg" alt="Hush Your Mouth" style={{ width: '100%', borderRadius: 8, boxShadow: '0 30px 80px rgba(0,0,0,0.6)' }} /></FadeIn>
        <FadeIn>
          <h3 style={{ fontFamily: F.h, fontSize: 32, color: C.white, letterSpacing: 2 }}>HUSH YOUR MOUTH, <span style={{ color: C.accent }}>WHAT YOU SAY!</span></h3>
          <p style={{ fontFamily: F.b, color: C.t50, fontSize: 14, fontStyle: 'italic', margin: '8px 0 16px' }}>Stories of Family, Food, and the Lessons in Between</p>
          <div style={{ fontFamily: F.h, fontSize: 28, color: C.accent, marginBottom: 8 }}>${price.toFixed(2)} <span style={{ fontSize: 14, color: C.t50 }}>per copy</span></div>
          {disc > 0 && <p style={{ fontFamily: F.b, color: C.accent, fontSize: 13, marginBottom: 12, background: 'rgba(212,255,0,0.1)', padding: '6px 12px', display: 'inline-block', borderRadius: 4 }}>&#x1f389; 15% bulk discount!</p>}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
            <span style={{ fontFamily: F.b, color: C.t65, fontSize: 14 }}>Qty:</span>
            <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ background: C.card, border: '1px solid ' + C.t06, color: C.white, width: 36, height: 36, cursor: 'pointer', fontSize: 18 }}>&minus;</button>
            <span style={{ fontFamily: F.h, color: C.white, fontSize: 22, minWidth: 30, textAlign: 'center' }}>{qty}</span>
            <button onClick={() => setQty(qty + 1)} style={{ background: C.card, border: '1px solid ' + C.t06, color: C.white, width: 36, height: 36, cursor: 'pointer', fontSize: 18 }}>+</button>
          </div>
          <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
            {[['ship', '\ud83d\udce6 Ship'], ['pickup', '\ud83d\udccd Pickup']].map(([v, l]) => (
              <label key={v} onClick={() => setShip(v)} style={{ fontFamily: F.b, color: ship === v ? C.accent : C.t50, fontSize: 13, cursor: 'pointer', padding: '8px 16px', border: '1px solid ' + (ship === v ? C.accent : C.t06), borderRadius: 4 }}>{l}</label>
            ))}
          </div>
          <div style={{ background: C.card, border: '1px solid ' + C.t06, padding: 20, borderRadius: 8, marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: F.b, color: C.t65, fontSize: 14, marginBottom: 8 }}><span>Subtotal</span><span>${(price * qty).toFixed(2)}</span></div>
            {disc > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: F.b, color: C.accent, fontSize: 14, marginBottom: 8 }}><span>Discount (15%)</span><span>-${(price * qty * disc).toFixed(2)}</span></div>}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: F.b, color: C.t65, fontSize: 14, marginBottom: 8 }}><span>Shipping</span><span>{shipCost === 0 ? 'FREE' : '$' + shipCost.toFixed(2)}</span></div>
            <div style={{ borderTop: '1px solid ' + C.t06, marginTop: 8, paddingTop: 8, display: 'flex', justifyContent: 'space-between' }}><span style={{ fontFamily: F.h, color: C.white, fontSize: 20 }}>Total</span><span style={{ fontFamily: F.h, color: C.accent, fontSize: 20 }}>${total.toFixed(2)}</span></div>
          </div>
          {!checkout ? <Btn onClick={() => setCheckout(true)} style={{ width: '100%' }}>Proceed to Checkout</Btn> :
          <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <p style={{ fontFamily: F.h, color: C.white, fontSize: 18, letterSpacing: 2 }}>{ship === 'ship' ? 'SHIPPING DETAILS' : 'YOUR DETAILS'}</p>
            {[['name', 'Full Name'], ['email', 'Email'], ...(ship === 'ship' ? [['address', 'Street Address'], ['city', 'City'], ['state', 'State'], ['zip', 'ZIP']] : [])].map(([k, p]) => (
              <input key={k} placeholder={p} required value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} style={inp} />
            ))}
            <Btn style={{ width: '100%' }}>Pay ${total.toFixed(2)} with Stripe</Btn>
            <p style={{ fontFamily: F.b, color: C.t25, fontSize: 11, textAlign: 'center' }}>&#x1f512; Secure checkout powered by Stripe</p>
          </form>}
        </FadeIn>
      </div>
    </section>
  );
}
