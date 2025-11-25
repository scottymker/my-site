import { motion } from 'framer-motion';
import { Code2, Rocket, Users, Lightbulb } from 'lucide-react';
import Terminal from '../Terminal/Terminal';
import './About.css';

const highlights = [
  {
    icon: Code2,
    title: 'Clean Code',
    description: 'Writing maintainable, scalable code that stands the test of time.',
  },
  {
    icon: Rocket,
    title: 'Performance',
    description: 'Optimizing for speed because every millisecond counts.',
  },
  {
    icon: Users,
    title: 'User-Centric',
    description: 'Building experiences that users actually enjoy.',
  },
  {
    icon: Lightbulb,
    title: 'Problem Solver',
    description: 'Turning complex challenges into elegant solutions.',
  },
];

function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-tag">// About Me</span>
          <h2 className="section-title">
            Building the <span className="text-gradient">Future</span>, One Line at a Time
          </h2>
        </motion.div>

        <div className="about-content">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <p className="about-intro">
              Hey there! I'm <strong>[YOUR_NAME]</strong>, a passionate web developer
              who loves turning ideas into reality through code.
            </p>
            <p>
              With over <strong>5 years of experience</strong> in web development,
              I've had the privilege of working with startups, small businesses,
              and everything in between. I specialize in creating custom web applications
              that are not just functional, but delightful to use.
            </p>
            <p>
              When I'm not coding, you can find me exploring new technologies,
              contributing to open source, or fueling my work with an unhealthy
              amount of coffee. ☕
            </p>
            <p>
              I believe great software comes from understanding both the technical
              requirements and the human needs behind them. Let's build something
              amazing together.
            </p>

            <div className="about-highlights">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="highlight-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                >
                  <div className="highlight-icon">
                    <item.icon size={24} />
                  </div>
                  <div className="highlight-content">
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="about-terminal"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Terminal />
            <p className="terminal-hint">
              💡 Try typing <code>help</code> in the terminal above!
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;
