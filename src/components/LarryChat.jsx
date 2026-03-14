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

export default function LarryChat() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([
    { role: 'larry', text: "Hey! I'm Larry Castleberry 👋 Storyteller, speaker, and author. Ask me anything — or hit one of the quick questions below!" }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(1);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (open) {
      setUnread(0);
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [open, msgs]);

  async function send(text) {
    const q = text || input.trim();
    if (!q) return;
    setInput('');
    setMsgs(m => [...m, { role: 'user', text: q }]);
    setTyping(true);

    // ── API hook: swap placeholder block with real fetch when ready ──
    // const res = await fetch('/api/chat', { method:'POST', body: JSON.stringify({ message: q }) });
    // const { reply } = await res.json();

    await new Promise(r => setTimeout(r, 900 + Math.random() * 600));
    const reply = PLACEHOLDER_REPLIES[Math.floor(Math.random() * PLACEHOLDER_REPLIES.length)];
    // ─────────────────────────────────────────────────────────────────

    setTyping(false);
    setMsgs(m => [...m, { role: 'larry', text: reply }]);
    if (!open) setUnread(u => u + 1);
  }

  return (
    <>
      {/* CHAT WINDOW */}
      {open && (
        <div style={{
          position: 'fixed', bottom: 'auto', top: '50%', right: 90, transform: 'translateY(-50%)',
          zIndex: 9999,
          width: 'min(380px, calc(100vw - 32px))',
          background: '#0d0d0d', border: '1px solid rgba(212,255,0,0.2)',
          borderRadius: 16, boxShadow: '0 24px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(212,255,0,0.08)',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
          animation: 'chatSlideUp 0.25s cubic-bezier(0.16,1,0.3,1)'
        }}>
          {/* HEADER */}
          <div style={{ background: '#111', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <img src="/images/pro.jpg" alt="Larry" style={{ width: 42, height: 42, borderRadius: '50%', objectFit: 'cover', objectPosition: 'top', border: '2px solid #D4FF00' }} />
              <span style={{ position: 'absolute', bottom: 1, right: 1, width: 10, height: 10, background: '#00e676', borderRadius: '50%', border: '2px solid #111' }} />
            </div>
            <div>
              <div style={{ fontFamily: F.h, fontSize: 15, color: C.white, letterSpacing: 1 }}>LARRY CASTLEBERRY</div>
              <div style={{ fontFamily: F.b, fontSize: 11, color: '#00e676' }}>● Online</div>
            </div>
            <button onClick={() => setOpen(false)} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: C.t50, cursor: 'pointer', fontSize: 20, lineHeight: 1 }}>✕</button>
          </div>

          {/* MESSAGES */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 12, maxHeight: 340 }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, flexDirection: m.role === 'user' ? 'row-reverse' : 'row', alignItems: 'flex-end' }}>
                {m.role === 'larry' && (
                  <img src="/images/pro.jpg" alt="Larry" style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover', objectPosition: 'top', flexShrink: 0, border: '1px solid #D4FF00' }} />
                )}
                <div style={{
                  maxWidth: '78%', padding: '10px 14px', borderRadius: m.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                  background: m.role === 'user' ? C.accent : '#1a1a1a',
                  color: m.role === 'user' ? '#000' : C.white,
                  fontFamily: F.b, fontSize: 13, lineHeight: 1.6,
                  border: m.role === 'larry' ? '1px solid rgba(255,255,255,0.06)' : 'none'
                }}>{m.text}</div>
              </div>
            ))}
            {typing && (
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
                <img src="/images/pro.jpg" alt="Larry" style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover', objectPosition: 'top', border: '1px solid #D4FF00' }} />
                <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px 14px 14px 4px', padding: '12px 16px' }}>
                  <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* SUGGESTED */}
          {msgs.length <= 2 && (
            <div style={{ padding: '0 14px 10px', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {SUGGESTED.map((s, i) => (
                <button key={i} onClick={() => send(s)} style={{
                  fontFamily: F.b, fontSize: 11, color: C.accent, background: 'transparent',
                  border: '1px solid rgba(212,255,0,0.3)', borderRadius: 20, padding: '5px 12px',
                  cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap'
                }}>{s}</button>
              ))}
            </div>
          )}

          {/* INPUT */}
          <div style={{ padding: '10px 12px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 8 }}>
            <input
              value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Ask Larry anything..."
              style={{ flex: 1, background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: '9px 16px', fontFamily: F.b, fontSize: 13, color: C.white, outline: 'none' }}
            />
            <button onClick={() => send()} style={{ background: C.accent, border: 'none', borderRadius: '50%', width: 38, height: 38, cursor: 'pointer', fontSize: 16, flexShrink: 0 }}>→</button>
          </div>
        </div>
      )}

      {/* SIDE TAB LAUNCHER */}
      <button onClick={() => setOpen(o => !o)} className="chat-launcher" style={{
        position: 'fixed', top: '50%', right: 0, transform: 'translateY(-50%)',
        zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center',
        background: C.accent, border: 'none', borderRadius: '12px 0 0 12px',
        padding: '12px 10px 16px', cursor: 'pointer', gap: 10,
        boxShadow: '-4px 0 24px rgba(212,255,0,0.25)',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}>
        {/* Face avatar */}
        <div style={{ width: 44, height: 44, borderRadius: '50%', overflow: 'hidden', border: '2px solid #000', flexShrink: 0, position: 'relative' }}>
          <img src="/images/pro.jpg" alt="Larry" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
          {unread > 0 && !open && (
            <span style={{ position: 'absolute', top: -2, right: -2, background: '#000', color: C.accent, borderRadius: '50%', width: 16, height: 16, fontFamily: F.h, fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{unread}</span>
          )}
        </div>
        {/* Rotated label */}
        <span style={{
          fontFamily: F.h, fontSize: 13, color: '#000', letterSpacing: 2,
          writingMode: 'vertical-rl', textOrientation: 'mixed',
          transform: 'rotate(180deg)', whiteSpace: 'nowrap',
        }}>CHAT WITH LARRY</span>
      </button>
    </>
  );
}
