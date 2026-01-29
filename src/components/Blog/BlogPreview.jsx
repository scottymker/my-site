import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import BlogCard from './BlogCard';
import { blogPosts } from '../../data/blogPosts';

function BlogPreview() {
  const recentPosts = blogPosts.slice(0, 3);

  return (
    <section id="blog" className="blog-preview">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-tag">// Blog</span>
          <h2 className="section-title">
            Latest <span className="text-gradient">Articles</span>
          </h2>
          <p className="section-description">
            Practical tips and insights to help your business thrive online.
          </p>
        </motion.div>

        <div className="blog-grid">
          {recentPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>

        <motion.div
          className="blog-preview-cta"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link to="/blog" className="btn btn-secondary">
            View All Articles
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default BlogPreview;
