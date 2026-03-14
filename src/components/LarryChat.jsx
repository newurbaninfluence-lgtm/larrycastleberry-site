import { useState, useRef, useEffect } from 'react';
import { C, F } from '../tokens';

const PLACEHOLDER_REPLIES = [
  "Great question! I'd love to tell you more — this chatbot is coming online soon. In the meantime, reach out on the Contact page!",
  "That's something I'm passionate about. Stay tuned — full AI responses are coming very soon!",
  "Love the curiosity! Drop me a message on the Contact page and I'll personally get back to you.",
];

const SUGGESTED = [
  "What do you speak about?",
  "How do I book you?",
  "Tell me about your book",
  "Do you do voice acting?",
];

function requestPushSilently() {
  if (!('Notification' in window) || !('serviceWorker' in navigator)) return;
  if (Notification.permission === 'granted' || Notification.permission === 'denied') return;
  // Small delay so it feels natural, not instant on X click
  setTimeout(() => {
    Notification.requestPermission().then(perm => {
      if (perm === 'granted' && navigator.serviceWorker.controller) {
        navigator.serviceWorker.ready.then(reg => {
          reg.showNotification('Larry Castleberry', {
            body: 'Thanks for connecting! You\'ll hear about upcoming events & stories.',
            icon: '/images/pro.jpg',
            badge: '/images/pro.jpg',
          });
        });
      }
    });
  }, 800);
}

export default function LarryChat() {
  const [open, setOpen]         = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [msgs, setMsgs]         = useState([
    { role: 'larry', text: "Hey! I'm Larry Castleberry 👋 Storyteller, speaker, and author. Ask me anything — or hit one of the quick questions below!" }
  ]);
  const [input, setInput]   = useState('');
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const bottomRef = useRef(null);

  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, [open, msgs]);

  function handleDismiss(e) {
    e.stopPropagation();
    setDismissed(true);
    setOpen(false);
    requestPushSilently();
  }

  async function send(text) {
    const q = text || input.trim();
    if (!q) return;
    setInput('');
    setMsgs(m => [...m, { role: 'user', text: q }]);
    setTyping(true);
    // ── API hook ──────────────────────────────────────────────────────
    // const res = await fetch('/api/chat', { method:'POST', body: JSON.stringify({ message: q }) });
    // const { reply } = await res.json();
    await new Promise(r => setTimeout(r, 900 + Math.random() * 600));
    const reply = PLACEHOLDER_REPLIES[Math.floor(Math.random() * PLACEHOLDER_REPLIES.length)];
    // ─────────────────────────────────────────────────────────────────
    setTyping(false);
    setMsgs(m => [...m, { role: 'larry', text: reply }]);
    if (!open) setUnread(u => u + 1);
  }

  if (dismissed) return null;

  // Chat window positioning: desktop = beside tab, mobile = above tab
  const chatWindowStyle = isMobile ? {
    position: 'fixed',
    bottom: 80, // above the tab which sits at right edge center — on mobile tab is centered right
    right: 8,
    left: 8,
    width: 'auto',
    maxHeight: '60vh',
  } : {
    position: 'fixed',
    top: '50%',
    right: 90,
    transform: 'translateY(-50%)',
    width: 360,
  };

  return (
    <>
      {/* CHAT WINDOW */}
      {open && (
        <div style={{
          ...chatWindowStyle,
          zIndex: 9999,
          background: '#0d0d0d',
          border: '1px solid rgba(212,255,0,0.2)',
          borderRadius: 16,
          boxShadow: '0 24px 60px rgba(0,0,0,0.7)',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
          animation: 'chatSlideUp 0.25s cubic-bezier(0.16,1,0.3,1)',
        }}>

          {/* HEADER */}
          <div style={{ background: '#111', padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <img src="/images/pro.jpg" alt="Larry" style={{ width: 38, height: 38, borderRadius: '50%', objectFit: 'cover', objectPosition: 'top', border: '2px solid #D4FF00' }} />
              <span style={{ position: 'absolute', bottom: 1, right: 1, width: 9, height: 9, background: '#00e676', borderRadius: '50%', border: '2px solid #111' }} />
            </div>
            <div>
              <div style={{ fontFamily: F.h, fontSize: 14, color: C.white, letterSpacing: 1 }}>LARRY CASTLEBERRY</div>
              <div style={{ fontFamily: F.b, fontSize: 10, color: '#00e676' }}>● Online</div>
            </div>
            <button onClick={() => setOpen(false)} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: C.t50, cursor: 'pointer', fontSize: 18, lineHeight: 1, padding: 4 }}>✕</button>
          </div>

          {/* MESSAGES */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px', display: 'flex', flexDirection: 'column', gap: 10, maxHeight: isMobile ? '40vh' : 300 }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, flexDirection: m.role === 'user' ? 'row-reverse' : 'row', alignItems: 'flex-end' }}>
                {m.role === 'larry' && (
                  <img src="/images/pro.jpg" alt="Larry" style={{ width: 26, height: 26, borderRadius: '50%', objectFit: 'cover', objectPosition: 'top', flexShrink: 0, border: '1px solid #D4FF00' }} />
                )}
                <div style={{
                  maxWidth: '78%', padding: '9px 13px',
                  borderRadius: m.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                  background: m.role === 'user' ? C.accent : '#1a1a1a',
                  color: m.role === 'user' ? '#000' : C.white,
                  fontFamily: F.b, fontSize: 13, lineHeight: 1.6,
                  border: m.role === 'larry' ? '1px solid rgba(255,255,255,0.06)' : 'none',
                }}>{m.text}</div>
              </div>
            ))}
            {typing && (
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
                <img src="/images/pro.jpg" alt="Larry" style={{ width: 26, height: 26, borderRadius: '50%', objectFit: 'cover', objectPosition: 'top', border: '1px solid #D4FF00' }} />
                <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px 14px 14px 4px', padding: '10px 14px' }}>
                  <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* SUGGESTED */}
          {msgs.length <= 2 && (
            <div style={{ padding: '0 12px 8px', display: 'flex', flexWrap: 'wrap', gap: 5, flexShrink: 0 }}>
              {SUGGESTED.map((s, i) => (
                <button key={i} onClick={() => send(s)} style={{
                  fontFamily: F.b, fontSize: 11, color: C.accent, background: 'transparent',
                  border: '1px solid rgba(212,255,0,0.3)', borderRadius: 20, padding: '4px 10px',
                  cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap',
                }}>{s}</button>
              ))}
            </div>
          )}

          {/* INPUT */}
          <div style={{ padding: '8px 10px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 7, flexShrink: 0 }}>
            <input
              value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Ask Larry anything..."
              style={{ flex: 1, background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: '8px 14px', fontFamily: F.b, fontSize: 13, color: C.white, outline: 'none' }}
            />
            <button onClick={() => send()} style={{ background: C.accent, border: 'none', borderRadius: '50%', width: 36, height: 36, cursor: 'pointer', fontSize: 15, flexShrink: 0 }}>→</button>
          </div>
        </div>
      )}

      {/* SIDE TAB LAUNCHER */}
      <div style={{
        position: 'fixed', top: '50%', right: 0, transform: 'translateY(-50%)',
        zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>
        {/* X dismiss button above tab */}
        <button
          onClick={handleDismiss}
          title="Dismiss"
          style={{
            width: 28, height: 28, borderRadius: '50%',
            background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.6)', fontSize: 13, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 6, transition: 'all 0.2s',
          }}
        >✕</button>

        {/* Main tab */}
        <button onClick={() => setOpen(o => !o)} className="chat-launcher" style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          background: C.accent, border: 'none', borderRadius: '14px 0 0 14px',
          padding: '22px 14px 28px', cursor: 'pointer', gap: 16,
          boxShadow: '-4px 0 24px rgba(212,255,0,0.25)',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}>
          {/* Face avatar */}
          <div style={{ width: 62, height: 62, borderRadius: '50%', overflow: 'hidden', border: '3px solid #000', flexShrink: 0, position: 'relative' }}>
            <img src="/images/pro.jpg" alt="Larry" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
            {unread > 0 && !open && (
              <span style={{ position: 'absolute', top: -2, right: -2, background: '#000', color: C.accent, borderRadius: '50%', width: 20, height: 20, fontFamily: F.h, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{unread}</span>
            )}
          </div>
          {/* Rotated label */}
          <span style={{
            fontFamily: F.b, fontWeight: 700, fontSize: 15, color: '#000', letterSpacing: 2,
            writingMode: 'vertical-rl', textOrientation: 'mixed',
            transform: 'rotate(180deg)', whiteSpace: 'nowrap',
          }}>ASK LARRY</span>
        </button>
      </div>
    </>
  );
}
