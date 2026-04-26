import { useState, useRef, useEffect } from 'react';
import './TypingIndicator.css';

const TypingIndicator = () => {
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    // Auto-focus on mount
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInput = (e) => {
    setIsTyping(true);
    // Clear previous timeout
    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="typing-indicator">
      <h3>Exercise 3: Typing Indicator</h3>
      <input
        ref={inputRef}
        type="text"
        placeholder="Type a message..."
        onChange={handleInput}
      />
      {isTyping && <div className="indicator">User is typing...</div>}
    </div>
  );
};

export default TypingIndicator;