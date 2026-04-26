import { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';
import './PostCard.css';

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    if (liked) {
      setLikesCount(prev => prev - 1);
    } else {
      setLikesCount(prev => prev + 1);
    }
    setLiked(!liked);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="post-card glass-panel"
    >
      <div className="post-header">
        <div className="post-author-info">
          <img src={post.author.avatar} alt={post.author.name} className="post-avatar" />
          <div className="author-details">
            <h4 className="author-name">{post.author.name}</h4>
            <span className="author-username">{post.author.username} • {formatDate(post.createdAt)}</span>
          </div>
        </div>
        <button className="post-options-btn"><MoreHorizontal size={20} /></button>
      </div>

      <div className="post-body">
        <p className="post-content">{post.content}</p>
        {post.image && (
          <div className="post-image-container">
            <img src={post.image} alt="Post attachment" className="post-image" loading="lazy" />
          </div>
        )}
      </div>

      <div className="post-footer">
        <button className={`post-action-btn ${liked ? 'liked' : ''}`} onClick={handleLike}>
          <Heart size={20} className={liked ? 'fill-current' : ''} />
          <span>{likesCount}</span>
        </button>
        <button className="post-action-btn">
          <MessageCircle size={20} />
          <span>{post.comments}</span>
        </button>
        <button className="post-action-btn">
          <Share2 size={20} />
          <span>Share</span>
        </button>
      </div>
    </motion.div>
  );
};

export default PostCard;
