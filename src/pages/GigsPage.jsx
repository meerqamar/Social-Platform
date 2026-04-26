import React, { useState, useMemo, useCallback } from 'react';
import GigGrid from '../components/GigCard/GigGrid';
import SavedGigsPanel from '../components/GigCard/SavedGigsPanel';
import CharacterCounter from '../components/HooksLab/CharacterCounter';
import CountdownTimer from '../components/HooksLab/CountdownTimer';
import TypingIndicator from '../components/HooksLab/TypingIndicator';
import OrderTracker from '../components/HooksLab/OrderTracker';
import { gigs as initialGigs } from '../data/gigs';
import { Search } from 'lucide-react';

const GigsPage = () => {
  const [savedGigs, setSavedGigs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fix 2: useCallback on parent callback to prevent GigCard re-renders
  const handleSaveGig = useCallback((gigId) => {
    setSavedGigs(prev => 
      prev.includes(gigId) 
        ? prev.filter(id => id !== gigId) 
        : [...prev, gigId]
    );
  }, []);

  // Fix 3: useMemo for filtered list
  const filteredGigs = useMemo(() => {
    if (!searchQuery) return initialGigs;
    return initialGigs.filter(g => 
      g.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="main-content" style={{ display: 'flex', flexDirection: 'column', gap: '48px', maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      
      <section>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '40px', color: 'var(--text-color)' }}>coWorkly Gig Listings</h1>
        
        {/* Lab 5 Search Box */}
        <div style={{ marginBottom: '40px', position: 'relative', maxWidth: '400px' }}>
          <Search size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            className="form-input" 
            placeholder="Search 200+ gigs... (Profile me!)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <GigGrid gigs={filteredGigs} onSaveGig={handleSaveGig} savedGigs={savedGigs} />
        <SavedGigsPanel savedGigs={savedGigs} allGigs={initialGigs} />
      </section>

      <section style={{ marginTop: '48px' }}>
        <h2 style={{ marginBottom: '24px' }}>React Hooks Lab</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          <CharacterCounter />
          <CountdownTimer />
          <TypingIndicator />
          <OrderTracker />
        </div>
      </section>

    </div>
  );
};

export default GigsPage;
