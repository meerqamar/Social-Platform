import GigCard from './GigCard';
import './GigGrid.css';

const GigGrid = ({ gigs, onSaveGig, savedGigs }) => {
  return (
    <div className="gig-grid">
      {gigs.map((gig) => (
        <GigCard 
          key={gig.id} 
          gig={gig} 
          onSaveGig={onSaveGig} 
          isSaved={savedGigs.includes(gig.id)}
        >
          <GigCard.Image />
          <GigCard.Body>
            <GigCard.Title />
            <GigCard.Seller />
            <GigCard.Rating />
            <GigCard.Tags />
          </GigCard.Body>
          <GigCard.Footer onSaveGig={onSaveGig} isSaved={savedGigs.includes(gig.id)} gigId={gig.id} />
        </GigCard>
      ))}
    </div>
  );
};

export default GigGrid;