import { Heart, Terminal } from 'lucide-react';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <a href="#home" className="footer-logo">
              <Terminal size={20} />
              <span>The Dev Side</span>
            </a>
            <p className="footer-tagline">
              Building digital experiences that matter.
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-section">
              <h4>Navigation</h4>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Connect</h4>
              <ul>
                <li>
                  <a href="https://github.com/scottymker" target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/scott-ymker-244ab81ab" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="mailto:info@thedevside.com">
                    Email
                  </a>
                </li>
                <li>
                  <a href="tel:+16055500828">
                    (605) 550-0828
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            &copy; {currentYear} The Dev Side. All rights reserved.
          </p>
          <p className="made-with">
            Made with <Heart size={14} className="heart-icon" /> and lots of ☕
          </p>
          <p className="tech-stack">
            <code>React + Vite + Framer Motion</code>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
