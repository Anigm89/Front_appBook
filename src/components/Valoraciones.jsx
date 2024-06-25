import { useState } from 'react';
import ReactStars from 'react-rating-stars-component';

const Valoraciones = () => {
  const [rating, setRating] = useState(0);

  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  return (
    <div className='valoraciones'>
      <h3>Valora este libro</h3>
      <ReactStars
        count={5}
        onChange={ratingChanged}
        size={30}
        activeColor="#ffd700"
        color={'#ccc'}
      />
    </div>
  );
};


export default Valoraciones;