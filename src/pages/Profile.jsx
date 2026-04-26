import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, LayoutGrid, Settings, LogOut } from 'lucide-react';
import { generateMockPosts } from '../data/posts';
import './Profile.css';

const profileSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  bio: z.string().max(160, 'Bio must be less than 160 characters').optional(),
  website: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});

const Profile = () => {
  const { user, updateUser, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [userPosts] = useState(() => generateMockPosts(6, 900));

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user?.fullName || '',
      bio: user?.bio || 'Passionate software engineer and coffee enthusiast.',
      website: user?.website || '',
    }
  });

  const getInitials = (name) => name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';

  const onSubmit = (data) => {
    updateUser(data);
    setIsEditing(false);
  };

  return (
    <div className="main-content">
      <div className="profile-header glass-panel">
        <div className="profile-cover"></div>
        <div className="profile-info-container">
          <div className="profile-avatar-large">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.fullName} />
            ) : (
              <span>{getInitials(user?.fullName)}</span>
            )}
          </div>
          
          <div className="profile-details">
            <div className="profile-name-row">
              <div>
                <h2>{user?.fullName}</h2>
                <p className="profile-username">@{user?.fullName?.split(' ')[0].toLowerCase() || 'user'}</p>
              </div>
              <div className="profile-actions">
                <button onClick={() => setIsEditing(!isEditing)} className="btn-secondary flex-center gap-2">
                  <Edit2 size={16} /> Edit Profile
                </button>
                <button onClick={logout} className="btn-secondary flex-center icon-only">
                  <LogOut size={16} />
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {isEditing ? (
                <motion.form 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="edit-profile-form" 
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="form-group">
                    <label>Full Name</label>
                    <input {...register('fullName')} className={`form-input ${errors.fullName ? 'error' : ''}`} />
                    {errors.fullName && <span className="error-text">{errors.fullName.message}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label>Bio</label>
                    <textarea {...register('bio')} className={`form-input ${errors.bio ? 'error' : ''}`} rows={3} />
                    {errors.bio && <span className="error-text">{errors.bio.message}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label>Website</label>
                    <input {...register('website')} type="url" className={`form-input ${errors.website ? 'error' : ''}`} />
                    {errors.website && <span className="error-text">{errors.website.message}</span>}
                  </div>

                  <div className="form-actions">
                    <button type="button" className="btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
                    <button type="submit" className="btn-primary">Save Changes</button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="profile-bio-section"
                >
                  <p className="profile-bio">{user?.bio || 'Passionate software engineer and coffee enthusiast.'}</p>
                  {user?.website && (
                    <a href={user.website} target="_blank" rel="noopener noreferrer" className="profile-link">
                      {user.website}
                    </a>
                  )}
                  <div className="profile-stats">
                    <span><strong>124</strong> following</span>
                    <span><strong>1.2k</strong> followers</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-tabs glass-panel">
          <button className="tab active"><LayoutGrid size={18} /> Posts</button>
          <button className="tab"><Settings size={18} /> Settings</button>
        </div>

        <div className="profile-grid">
          {userPosts.map(post => (
            <div key={post.id} className="grid-item">
              {post.image ? (
                <img src={post.image} alt="Post" />
              ) : (
                <div className="text-post">
                  <p>{post.content.substring(0, 100)}...</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
