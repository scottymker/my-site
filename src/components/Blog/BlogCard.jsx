import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ArrowUpRight, Tag } from 'lucide-react';

function BlogCard({ post, index }) {
  return (
    <motion.article
      className="blog-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Link to={`/blog/${post.slug}`} className="blog-card-link">
        <div className="blog-card-header">
          <span className="blog-card-category">{post.category}</span>
          <span className="blog-card-date">{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>

        <h3 className="blog-card-title">
          {post.title}
          <ArrowUpRight className="blog-card-arrow" size={18} />
        </h3>

        <p className="blog-card-excerpt">{post.excerpt}</p>

        <div className="blog-card-footer">
          <span className="blog-card-read-time">
            <Clock size={14} />
            {post.readTime}
          </span>
          <div className="blog-card-tags">
            {post.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="blog-tag">
                <Tag size={10} />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default BlogCard;
