import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';

function ProjectCard({ project, index }) {
  return (
    <motion.article
      className="project-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <div className="project-image">
        <img src={project.image} alt={project.title} loading="lazy" />
        <div className="project-overlay">
          <div className="project-links">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                className="project-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View live site"
              >
                <ExternalLink size={20} />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                className="project-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View source code"
              >
                <Github size={20} />
              </a>
            )}
          </div>
        </div>
        {project.featured && <span className="featured-badge">Featured</span>}
      </div>

      <div className="project-content">
        <h3 className="project-title">
          {project.title}
          <ArrowUpRight className="title-arrow" size={18} />
        </h3>
        <p className="project-description">{project.description}</p>
        <div className="project-tech">
          {project.tech.map((tech) => (
            <span key={tech} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default ProjectCard;
