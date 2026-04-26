import './StarRating.css';

const StarRating = ({ rating, reviewCount }) => {
  const filledStars = Math.round(rating);

  return (
    <div className="star-rating">
      <div className="stars">
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} className={i < filledStars ? 'star filled' : 'star'}>
            ★
          </span>
        ))}
      </div>
      <span className="rating-text">
        {rating} ({reviewCount} reviews)
      </span>
    </div>
  );
};

export default StarRating;