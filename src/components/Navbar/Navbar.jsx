import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getInitials = (name) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
  };

  const navLinks = [
    { name: 'Feed', path: '/' },
    { name: 'Gigs', path: '/gigs' },
    ...(isAuthenticated ? [{ name: 'Profile', path: '/profile' }] : [])
  ];

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="navbar glass-panel">
      <div className="navbar-container">
        <NavLink to="/" className="brand" onClick={() => setIsMobileMenuOpen(false)}>
          <span className="brand-glow">GROW</span>URK
        </NavLink>

        {/* Desktop Nav */}
        <nav className="desktop-actions">
          <div className="desktop-links">
            {navLinks.map(link => (
              <NavLink key={link.path} to={link.path} className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                {link.name}
              </NavLink>
            ))}
          </div>

          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {isAuthenticated ? (
            <div className="auth-section">
              <div className="user-info">
                <div className="avatar-small">{getInitials(user?.fullName)}</div>
              </div>
              <button onClick={handleLogout} className="btn-secondary logout-btn">Logout</button>
            </div>
          ) : (
            <div className="auth-links">
              <NavLink to="/login" className="btn-secondary">Login</NavLink>
              <NavLink to="/register" className="btn-primary">Register</NavLink>
            </div>
          )}
        </nav>

        {/* Mobile Toggle */}
        <div className="mobile-toggle">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="hamburger" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mobile-nav glass-panel"
          >
            {navLinks.map(link => (
              <NavLink 
                key={link.path} 
                to={link.path} 
                className="mobile-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}

            <div className="mobile-auth-divider"></div>

            {isAuthenticated ? (
              <div className="mobile-user">
                <div className="user-info">
                  <div className="avatar-small">{getInitials(user?.fullName)}</div>
                  <span>{user?.fullName}</span>
                </div>
                <button onClick={handleLogout} className="btn-secondary mobile-logout">Logout</button>
              </div>
            ) : (
              <div className="mobile-auth">
                <NavLink to="/login" className="btn-secondary" onClick={() => setIsMobileMenuOpen(false)}>Login</NavLink>
                <NavLink to="/register" className="btn-primary" onClick={() => setIsMobileMenuOpen(false)}>Register</NavLink>
              </div>
            )}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
