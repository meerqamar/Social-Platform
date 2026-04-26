import './SellerBadge.css';

const SellerBadge = ({ name, level, avatar }) => {
  const getBadgeColor = (level) => {
    if (level === 'Top Rated') return 'gold';
    if (level === 'Level 2') return 'green';
    return 'grey';
  };

  return (
    <div className="seller-badge">
      <img src={avatar} alt={`${name} avatar`} className="seller-avatar" />
      <span className="seller-name">{name}</span>
      <span className={`seller-level ${getBadgeColor(level)}`}>{level}</span>
    </div>
  );
};

export default SellerBadge;