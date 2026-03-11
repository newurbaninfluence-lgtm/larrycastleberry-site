import { C, F } from '../tokens';
export default function Btn({ children, onClick, outline, style: s = {} }) {
  const base = outline
    ? { background: 'transparent', color: C.accent, border: '2px solid ' + C.accent }
    : { background: C.accent, color: '#000', border: 'none' };
  return (
    <button onClick={onClick} style={{ ...base, padding: '14px 36px', fontFamily: F.h, fontSize: 16, letterSpacing: 2, cursor: 'pointer', textTransform: 'uppercase', transition: 'transform 0.2s', ...s }}>
      {children}
    </button>
  );
}
