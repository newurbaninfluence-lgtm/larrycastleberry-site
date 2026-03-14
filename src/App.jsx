import { Routes, Route } from 'react-router-dom';
import { C, F } from './tokens';
import Nav from './components/Nav';
import Footer from './components/Footer';
import LarryChat from './components/LarryChat';
import Home from './pages/Home';
import About from './pages/About';
import ServicePage from './pages/ServicePage';
import Shop from './pages/Shop';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import SERVICES from './data/services';
import { GEO_PAGES } from './data/geoPages';
import GeoPageTemplate from './components/GeoPageTemplate';

export default function App() {
  return (
    <div style={{ fontFamily: F.b, background: C.bg, color: C.white, minHeight: '100vh' }}>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/about-us" element={<About />} />
        {SERVICES.map((s) => (
          <Route key={s.slug} path={'/' + s.slug} element={<ServicePage service={s} />} />
        ))}
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        {GEO_PAGES.map((page) => (
          <Route key={page.slug} path={'/' + page.slug} element={<GeoPageTemplate page={page} />} />
        ))}
        <Route path="/contact" element={<Contact />} />
        <Route path="/book-online" element={<Contact />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Footer />
      <LarryChat />
    </div>
  );
}
