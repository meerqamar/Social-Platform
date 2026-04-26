import './SavedGigsPanel.css';

const SavedGigsPanel = ({ savedGigs, allGigs }) => {
  const savedGigTitles = savedGigs.map(id => {
    const gig = allGigs.find(g => g.id === id);
    return gig ? gig.title : '';
  }).filter(title => title);

  return (
    <div className="saved-gigs-panel">
      <h2>Saved Gigs ({savedGigs.length})</h2>
      {savedGigTitles.length > 0 ? (
        <ul>
          {savedGigTitles.map((title, index) => (
            <li key={index}>{title}</li>
          ))}
        </ul>
      ) : (
        <p>No saved gigs yet.</p>
      )}
    </div>
  );
};

export default SavedGigsPanel;