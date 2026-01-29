import { motion } from 'framer-motion';
import BlogCard from './BlogCard';
import { blogPosts } from '../../data/blogPosts';
import './Blog.css';

function Blog() {
  return (
    <div className="blog-page">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="section-tag">// Blog</span>
          <h1 className="section-title">
            Insights & <span className="text-gradient">Resources</span>
          </h1>
          <p className="section-description">
            Practical advice for small business owners navigating the web.
          </p>
        </motion.div>

        <motion.div
          className="blog-video-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="blog-video-wrapper">
            <video
              controls
              preload="metadata"
              className="blog-video"
              poster=""
            >
              <source src="/video/promo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <p className="blog-video-caption">See what The Dev Side can do for your business</p>
        </motion.div>

        <div className="blog-grid">
          {blogPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blog;
