import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

// Lazy loaded feature pages
const Feed = React.lazy(() => import('./pages/Feed'));
const GigsPage = React.lazy(() => import('./pages/GigsPage'));
const Profile = React.lazy(() => import('./pages/Profile'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const RegisterPage = React.lazy(() => import('./pages/RegisterPage'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <div className="app-container">
      <Navbar />
      
      {/* Code Splitting with React.lazy and Suspense */}
      <Suspense fallback={<div className="page-loader">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/gigs" element={<GigsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProtectedRoute component={Profile} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
