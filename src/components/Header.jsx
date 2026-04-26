import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = ({ onNavigate }) => {
  const { user, logout, isAuthenticated } = useAuth();

  const getInitials = (name) => {
    return name
      ?.split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase() || 'U';
  };

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo" onClick={() => onNavigate('/')} style={{ cursor: 'pointer' }}>
          coWorkly
        </h1>

        <nav className="nav">
          {isAuthenticated ? (
            <div className="auth-section">
              <div className="user-info">
                <div className="avatar-small">{getInitials(user?.fullName)}</div>
                <div>
                  <p className="user-name">{user?.fullName}</p>
                  <p className="user-role">{user?.role}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  logout();
                  onNavigate('/');
                }}
                className="logout-link"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-links">
              <button onClick={() => onNavigate('/login')} className="login-link">
                Login
              </button>
              <button onClick={() => onNavigate('/register')} className="register-link">
                Register
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;