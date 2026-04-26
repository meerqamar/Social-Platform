import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import './AuthPages.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Basic mock authentication
    if (email && password) {
      if (password.length >= 6) {
        login({ 
          email, 
          fullName: email.split('@')[0],
          role: 'Member'
        });
        navigate('/');
      } else {
        setError('Password must be at least 6 characters');
      }
    } else {
      setError('Please fill in all fields');
    }
  };

  return (
    <div className="auth-container">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="auth-form glass-panel"
      >
        <h2>Welcome Back</h2>
        <p>Login to connect with the community</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group" style={{ marginBottom: '24px' }}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="btn-primary auth-button">
            Login
          </button>
        </form>

        <div className="auth-switch">
          Don't have an account? 
          <NavLink to="/register" className="auth-switch-link">Register</NavLink>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;