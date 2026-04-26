import { useState, useEffect, useCallback } from 'react';
import PostCard from '../components/PostCard/PostCard';
import CreatePost from '../components/CreatePost/CreatePost';
import { generateMockPosts } from '../data/posts';
import { useInView } from 'react-intersection-observer';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const POSTS_PER_PAGE = 10;

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Hook for infinite scroll trigger
  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: '200px', // Load before it comes into view
  });

  // Initial load
  useEffect(() => {
    const initialPosts = generateMockPosts(POSTS_PER_PAGE, 1);
    setPosts(initialPosts);
  }, []);

  // Load more when scrolled to bottom
  const loadMorePosts = useCallback(() => {
    if (loading || !hasMore) return;
    setLoading(true);
    
    // Simulate network delay
    setTimeout(() => {
      const startId = page * POSTS_PER_PAGE + 1;
      const newPosts = generateMockPosts(POSTS_PER_PAGE, startId);
      
      if (startId > 100) { // arbitrary limit for demo
        setHasMore(false);
      } else {
        setPosts(prev => [...prev, ...newPosts]);
        setPage(prev => prev + 1);
      }
      setLoading(false);
    }, 800);
  }, [loading, hasMore, page]);

  useEffect(() => {
    if (inView) {
      loadMorePosts();
    }
  }, [inView, loadMorePosts]);

  const handlePostCreated = (newPost) => {
    setPosts(prev => [newPost, ...prev]);
  };

  return (
    <div className="main-content feed-container" style={{ maxWidth: '680px' }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <CreatePost onPostCreated={handlePostCreated} />
      </motion.div>

      <div className="posts-feed">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Infinite Scroll Trigger */}
      {hasMore && (
        <div ref={ref} style={{ display: 'flex', justifyContent: 'center', padding: '32px' }}>
          {loading && <Loader2 className="spinner" size={32} color="var(--primary)" style={{ animation: 'spin 1s linear infinite' }} />}
        </div>
      )}

      {!hasMore && (
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', margin: '32px 0' }}>
          You've caught up on all the posts!
        </p>
      )}
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}} />
    </div>
  );
};

export default Feed;
