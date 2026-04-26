import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import './AuthPages.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const { fullName, email, password, confirmPassword } = formData;

    if (!fullName || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setSuccess('Registration successful!');
    
    // Auto-login after successful registration
    setTimeout(() => {
      login({ 
        email, 
        fullName,
        role: 'Member',
        bio: 'Just joined the community!'
      });
      navigate('/');
    }, 1500);
  };

  return (
    <div className="auth-container">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="auth-form glass-panel"
      >
        <h2>Join coWorkly</h2>
        <p>Create an account to start sharing.</p>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              className="form-input"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
            />
          </div>

          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
            />
          </div>

          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-input"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
            />
          </div>

          <div className="form-group" style={{ marginBottom: '24px' }}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="form-input"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
            />
          </div>

          <button type="submit" className="btn-primary auth-button">
            Register
          </button>
        </form>

        <div className="auth-switch">
          Already have an account? 
          <NavLink to="/login" className="auth-switch-link">Login</NavLink>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;