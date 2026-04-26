import './GigCardSkeleton.css';

const GigCardSkeleton = () => {
  return (
    <div className="gig-card-skeleton">
      <div className="skeleton image"></div>
      <div className="skeleton-content">
        <div className="skeleton title"></div>
        <div className="skeleton seller"></div>
        <div className="skeleton rating"></div>
        <div className="skeleton tags"></div>
        <div className="skeleton footer"></div>
      </div>
    </div>
  );
};

export default GigCardSkeleton;