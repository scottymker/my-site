import { motion } from 'framer-motion';
import { Folder } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { projects } from '../../data/projects';
import './Projects.css';

function Projects() {
  return (
    <section id="projects" className="projects">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-tag">// My Work</span>
          <h2 className="section-title">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="section-description">
            Here are some of my recent projects. Each one was a unique challenge
            that helped me grow as a developer.
          </p>
        </motion.div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <motion.div
          className="projects-cta"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="cta-card">
            <Folder className="cta-icon" />
            <h3>Want to see more?</h3>
            <p>
              Check out my GitHub for more projects, experiments, and open source
              contributions.
            </p>
            <a
              href="https://github.com/[YOUR_USERNAME]"
              className="btn btn-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              View GitHub Profile
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Projects;
