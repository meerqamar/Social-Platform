import React, { createContext, useContext } from 'react';
import SellerBadge from './SellerBadge';
import StarRating from './StarRating';
import './GigCard.css';

const GigCardContext = createContext();

const GigCard = ({ gig, onSaveGig, isSaved, children }) => {
  return (
    <GigCardContext.Provider value={{ gig, onSaveGig, isSaved }}>
      <div className="gig-card glass-panel" style={{ overflow: 'hidden' }}>
        {children}
      </div>
    </GigCardContext.Provider>
  );
};

const useGigCard = () => {
  const context = useContext(GigCardContext);
  if (!context) {
    throw new Error('GigCard sub-components must be used within GigCard');
  }
  return context;
};

GigCard.Image = () => {
  const { gig } = useGigCard();
  return (
    <div className="gig-image-wrapper">
      <img src={gig.image} alt={gig.title} className="gig-image" />
    </div>
  );
};

GigCard.Body = ({ children }) => <div className="gig-content">{children}</div>;

GigCard.Title = () => {
  const { gig } = useGigCard();
  return <h3 className="gig-title">{gig.title}</h3>;
};

GigCard.Seller = () => {
  const { gig } = useGigCard();
  return <SellerBadge name={gig.seller.name} level={gig.seller.level} avatar={gig.seller.avatar} />;
};

GigCard.Tags = () => {
  const { gig } = useGigCard();
  return (
    <div className="gig-tags">
      {gig.tags.map((tag, index) => (
        <span key={index} className="tag">{tag}</span>
      ))}
    </div>
  );
};

GigCard.Rating = () => {
  const { gig } = useGigCard();
  return <StarRating rating={gig.rating} reviewCount={gig.reviewCount} />;
};

GigCard.Footer = ({ gigId }) => {
  const { gig, onSaveGig, isSaved } = useGigCard();
  return (
    <div className="gig-footer">
      <span className="delivery" style={{ color: 'var(--text-muted)' }}>Delivery in {gig.deliveryDays} days</span>
      <div className="footer-right">
        <span className="price" style={{ color: 'var(--text-color)' }}>Starting at ${gig.price}</span>
        <GigCard.SaveButton onSaveGig={onSaveGig} isSaved={isSaved} gigId={gigId} />
      </div>
    </div>
  );
};

GigCard.SaveButton = ({ onSaveGig, isSaved, gigId }) => {
  return (
    <button 
      className={`btn-secondary ${isSaved ? 'saved' : ''}`} 
      style={{ padding: '6px 12px', fontSize: '14px', borderColor: isSaved ? 'var(--secondary)' : '', color: isSaved ? 'var(--secondary)' : '' }}
      onClick={() => onSaveGig(gigId)}
    >
      {isSaved ? '♥' : '♡'} Save
    </button>
  );
};

// Fix 1 — React.memo on GigCard
const MemoizedGigCard = React.memo(GigCard);

// Re-attach compound components to the memoized version
MemoizedGigCard.Image = GigCard.Image;
MemoizedGigCard.Body = GigCard.Body;
MemoizedGigCard.Title = GigCard.Title;
MemoizedGigCard.Seller = GigCard.Seller;
MemoizedGigCard.Tags = GigCard.Tags;
MemoizedGigCard.Rating = GigCard.Rating;
MemoizedGigCard.Footer = GigCard.Footer;
MemoizedGigCard.SaveButton = GigCard.SaveButton;

export default MemoizedGigCard;