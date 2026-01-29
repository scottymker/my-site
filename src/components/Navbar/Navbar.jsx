import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const sectionLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      if (!isHomePage) return;

      const sections = sectionLinks.map(link => link.href.slice(1));
      for (const section of [...sections].reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const handleSectionClick = (e, href) => {
    e.preventDefault();
    const sectionId = href.slice(1);

    if (isHomePage) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
    setIsOpen(false);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (isHomePage) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
    setIsOpen(false);
  };

  const isBlogActive = location.pathname.startsWith('/blog');

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <a href="#home" className="navbar-logo" onClick={handleLogoClick}>
          <img src="/logo.png" alt="The Dev Side" className="logo-image" />
        </a>

        {/* Desktop Navigation */}
        <div className="navbar-links">
          {sectionLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`nav-link ${isHomePage && activeSection === link.href.slice(1) ? 'active' : ''}`}
              onClick={(e) => handleSectionClick(e, link.href)}
            >
              {link.name}
              {isHomePage && activeSection === link.href.slice(1) && (
                <motion.span
                  className="nav-indicator"
                  layoutId="navIndicator"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </a>
          ))}
          <Link
            to="/blog"
            className={`nav-link ${isBlogActive ? 'active' : ''}`}
            onClick={() => setIsOpen(false)}
          >
            Blog
            {isBlogActive && (
              <motion.span
                className="nav-indicator"
                layoutId="navIndicator"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </Link>
        </div>

        <a
          href="#contact"
          className="navbar-cta"
          onClick={(e) => handleSectionClick(e, '#contact')}
        >
          Let's Talk
        </a>

        {/* Mobile Menu Toggle */}
        <button
          className="mobile-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {sectionLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                className={`mobile-link ${isHomePage && activeSection === link.href.slice(1) ? 'active' : ''}`}
                onClick={(e) => handleSectionClick(e, link.href)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {link.name}
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: sectionLinks.length * 0.1 }}
            >
              <Link
                to="/blog"
                className={`mobile-link ${isBlogActive ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link>
            </motion.div>
            <motion.a
              href="#contact"
              className="mobile-cta"
              onClick={(e) => handleSectionClick(e, '#contact')}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: (sectionLinks.length + 1) * 0.1 }}
            >
              Let's Talk
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
