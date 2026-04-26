import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = ({ onNavigate }) => {
  const { user, logout, updateUser } = useAuth();
  const [displayName, setDisplayName] = useState(user?.fullName || '');
  const [isEditing, setIsEditing] = useState(false);
  const [optimisticName, setOptimisticName] = useState(user?.fullName || '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleUpdateName = async () => {
    try {
      setError('');
      setSuccess('');
      
      // Optimistic update
      setOptimisticName(displayName);
      
      // Simulate API call with 20% failure rate
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (Math.random() < 0.2) {
        throw new Error('API failed');
      }
      
      // Commit the update
      updateUser({ fullName: displayName });
      setSuccess('Name updated successfully!');
      setIsEditing(false);
      
      // Clear success message after 2 seconds
      setTimeout(() => setSuccess(''), 2000);
    } catch (err) {
      // Rollback optimistic update
      setOptimisticName(user?.fullName || '');
      setDisplayName(user?.fullName || '');
      setError('Failed to update name. Please try again.');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleLogout = () => {
    logout();
    onNavigate('/');
  };

  const getInitials = (name) => {
    return name
      ?.split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase() || 'U';
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>

      <div className="dashboard-content">
        <div className="user-card">
          <div className="avatar">{getInitials(optimisticName)}</div>
          <h2>{optimisticName}</h2>
          <p className="role">{user?.role}</p>
          <p className="email">{user?.email}</p>
        </div>

        <div className="profile-section">
          <h3>Update Profile</h3>
          {error && <div className="error-toast">{error}</div>}
          {success && <div className="success-toast">{success}</div>}
          
          {isEditing ? (
            <div className="edit-form">
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Enter your name"
              />
              <div className="edit-buttons">
                <button onClick={handleUpdateName} className="save-button">Save</button>
                <button onClick={() => {
                  setIsEditing(false);
                  setDisplayName(user?.fullName || '');
                }} className="cancel-button">Cancel</button>
              </div>
            </div>
          ) : (
            <div className="profile-display">
              <p>Display Name: <strong>{user?.fullName}</strong></p>
              <button onClick={() => setIsEditing(true)} className="edit-button">Edit Profile</button>
            </div>
          )}
        </div>

        <div className="quick-stats">
          <div className="stat">
            <div className="stat-value">0</div>
            <div className="stat-label">Active Gigs</div>
          </div>
          <div className="stat">
            <div className="stat-value">0</div>
            <div className="stat-label">Earnings</div>
          </div>
          <div className="stat">
            <div className="stat-value">0</div>
            <div className="stat-label">Orders</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;