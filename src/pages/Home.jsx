import BentoHero from '../components/BentoHero'
import HeroText from '../components/HeroText'
import Ticker from '../components/Ticker'
import Stats from '../components/Stats'

export default function Home({ addToCart }) {
  return (
    <>
      <BentoHero />
      <HeroText />
      <Ticker />
      <Stats />
    </>
  )
}