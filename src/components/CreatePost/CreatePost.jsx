import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Image, Send } from 'lucide-react';
import './CreatePost.css';

const CreatePost = ({ onPostCreated }) => {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [showImageInput, setShowImageInput] = useState(false);
  const MAX_CHARS = 280;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim() && !imageUrl.trim()) return;

    const newPost = {
      id: Date.now(),
      author: {
        name: user?.fullName || 'Anonymous',
        username: `@${user?.fullName?.split(' ')[0].toLowerCase() || 'user'}`,
        avatar: `https://i.pravatar.cc/150?u=${user?.email || 'anon'}`
      },
      content,
      image: imageUrl,
      likes: 0,
      comments: 0,
      createdAt: new Date().toISOString()
    };

    if (onPostCreated) {
      onPostCreated(newPost);
    }

    setContent('');
    setImageUrl('');
    setShowImageInput(false);
  };

  const charsLeft = MAX_CHARS - content.length;
  const isOverLimit = charsLeft < 0;

  return (
    <div className="create-post glass-panel">
      <form onSubmit={handleSubmit}>
        <textarea
          className="post-textarea"
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
        />
        
        {showImageInput && (
          <input
            type="url"
            className="form-input image-url-input"
            placeholder="Paste image URL here..."
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        )}

        <div className="create-post-actions">
          <div className="action-left">
            <button 
              type="button" 
              className={`icon-btn ${showImageInput ? 'active' : ''}`}
              onClick={() => setShowImageInput(!showImageInput)}
            >
              <Image size={20} />
            </button>
            <span className={`char-counter ${isOverLimit ? 'over-limit' : ''}`}>
              {charsLeft}
            </span>
          </div>
          
          <button 
            type="submit" 
            className="btn-primary flex-center gap-2"
            disabled={isOverLimit || (!content.trim() && !imageUrl.trim())}
          >
            <Send size={16} /> Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
