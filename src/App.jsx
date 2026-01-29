import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Skills from './components/Skills/Skills';
import BlogPreview from './components/Blog/BlogPreview';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import AICompanion from './components/AICompanion/AICompanion';
import Blog from './components/Blog/Blog';
import BlogPost from './components/Blog/BlogPost';
import ScrollToTop from './components/ScrollToTop';
import './styles/global.css';

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <BlogPreview />
      <Contact />
    </>
  );
}

function App() {
  return (
    <div className="app">
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
      </main>
      <Footer />
      <AICompanion />
    </div>
  );
}

export default App;
