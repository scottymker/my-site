import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, Tag } from 'lucide-react';
import { blogPosts } from '../../data/blogPosts';
import BlogCard from './BlogCard';
import './BlogPost.css';

function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | The Dev Side`;
    }
    return () => {
      document.title = 'The Dev Side';
    };
  }, [post]);

  if (!post) {
    return (
      <div className="blog-post-page">
        <div className="container">
          <div className="blog-post-not-found">
            <h2>Post not found</h2>
            <p>The article you're looking for doesn't exist.</p>
            <Link to="/blog" className="btn btn-primary">Back to Blog</Link>
          </div>
        </div>
      </div>
    );
  }

  const otherPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <div className="blog-post-page">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link to="/blog" className="blog-post-back">
            <ArrowLeft size={18} />
            Back to Blog
          </Link>

          <article className="blog-post-article">
            <header className="blog-post-header">
              <span className="blog-post-category">{post.category}</span>
              <h1 className="blog-post-title">{post.title}</h1>
              <div className="blog-post-meta">
                <span className="blog-post-date">
                  <Calendar size={16} />
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
                <span className="blog-post-read-time">
                  <Clock size={16} />
                  {post.readTime}
                </span>
              </div>
            </header>

            <div className="blog-post-content">
              {post.content.map((block, index) => {
                switch (block.type) {
                  case 'heading':
                    return <h2 key={index}>{block.text}</h2>;
                  case 'paragraph':
                    return <p key={index}>{block.text}</p>;
                  case 'list':
                    return (
                      <ul key={index}>
                        {block.items.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    );
                  case 'callout':
                    return (
                      <blockquote key={index} className="blog-callout">
                        {block.text}
                      </blockquote>
                    );
                  default:
                    return null;
                }
              })}
            </div>

            <footer className="blog-post-footer">
              <div className="blog-post-tags">
                {post.tags.map((tag) => (
                  <span key={tag} className="blog-tag">
                    <Tag size={12} />
                    {tag}
                  </span>
                ))}
              </div>
            </footer>
          </article>
        </motion.div>

        {otherPosts.length > 0 && (
          <motion.div
            className="blog-more-articles"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="blog-more-title">More Articles</h3>
            <div className="blog-grid">
              {otherPosts.map((p, index) => (
                <BlogCard key={p.id} post={p} index={index} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default BlogPost;
