import { motion } from 'framer-motion';
import { Monitor, Server, Wrench } from 'lucide-react';
import { skills } from '../../data/skills';
import './Skills.css';

const iconMap = {
  Monitor,
  Server,
  Wrench,
};

function Skills() {
  return (
    <section id="skills" className="skills">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-tag">// Tech Stack</span>
          <h2 className="section-title">
            Skills & <span className="text-gradient">Technologies</span>
          </h2>
          <p className="section-description">
            The tools and technologies I use to bring ideas to life.
          </p>
        </motion.div>

        <div className="skills-grid">
          {Object.entries(skills).map(([key, category], categoryIndex) => {
            const IconComponent = iconMap[category.icon] || Monitor;
            return (
              <motion.div
                key={key}
                className="skill-category"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.15 }}
              >
                <div className="category-header">
                  <div className="category-icon">
                    <IconComponent size={24} />
                  </div>
                  <h3 className="category-title">{category.title}</h3>
                </div>

                <div className="skill-items">
                  {category.items.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      className="skill-item"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <div className="skill-info">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-level">{skill.level}%</span>
                      </div>
                      <div className="skill-bar">
                        <motion.div
                          className="skill-progress"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="skills-decoration"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="code-snippet">
            <pre>
              <code>
{`const developer = {
  name: "Scott",
  title: "Full-Stack Developer",
  skills: ["React", "Node.js", "TypeScript"],
  passion: "Building amazing web experiences",
  coffee: Infinity
};`}
              </code>
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Skills;
