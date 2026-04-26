import { useState } from 'react';
import './CharacterCounter.css';

const CharacterCounter = () => {
  const [description, setDescription] = useState('');
  const MAX = 500;
  const length = description.length;
  const percentage = (length / MAX) * 100;

  const getColor = () => {
    if (percentage >= 95) return 'red';
    if (percentage >= 80) return 'orange';
    return 'black';
  };

  const handleClear = () => {
    setDescription('');
  };

  const handleSubmit = () => {
    alert('Gig description submitted!');
  };

  return (
    <div className="character-counter">
      <h3>Exercise 1: Live Character Counter</h3>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter your gig description..."
        maxLength={MAX}
      />
      <div className="counter" style={{ color: getColor() }}>
        {length} / {MAX} characters
      </div>
      <div className="buttons">
        <button onClick={handleClear}>Clear</button>
        <button onClick={handleSubmit} disabled={length < 50}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default CharacterCounter;