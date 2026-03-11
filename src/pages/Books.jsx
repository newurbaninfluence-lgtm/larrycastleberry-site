export default function Books({ addToCart }) {
  return (
    <section className="pt-24 pb-20 px-[clamp(16px,5vw,60px)] max-w-[1440px] mx-auto">
      <p className="text-xs tracking-[0.35em] text-neon uppercase mb-4">Larry's Bookshelf</p>
      <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-none mb-8">BOOKS & <span className="text-neon">AUDIOBOOKS</span></h1>
      <p className="text-muted">Coming soon — full e-commerce with Stripe checkout.</p>
    </section>
  )
}