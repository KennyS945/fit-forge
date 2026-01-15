import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Stack, Typography } from '@mui/material';
import { CartContext } from '../context/CartContext';

const ExerciseCard = ({ exercise }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(exercise);
    alert(`${exercise.name} added to cart!`);
  };

  // Use the ExerciseDB API to get the exercise image/GIF
  const gifUrl = `https://exercisedb.p.rapidapi.com/image?resolution=1080&exerciseId=${exercise.id}`;

  return (
    <Link className="exercise-card" to={`/exercise/${exercise.id}`}>
      <img 
        src={gifUrl} 
        alt={exercise.name} 
        loading="lazy" 
        style={{ height: '326px', objectFit: 'cover', width: '100%' }} 
      />
      <Stack direction="row" mt="10px">
        <Button sx={{ ml: '21px', color: '#fff', background: '#FFA9A9', fontSize: '14px', borderRadius: '20px', textTransform: 'capitalize' }}>
          {exercise.bodyPart}
        </Button>
        <Button sx={{ ml: '21px', color: '#fff', background: '#FCC757', fontSize: '14px', borderRadius: '20px', textTransform: 'capitalize' }}>
          {exercise.target}
        </Button>
      </Stack>
      <Typography ml="21px" color="#000" fontWeight="bold" sx={{ fontSize: { lg: '24px', xs: '20px' } }} mt="11px" pb="10px" textTransform="capitalize">
        {exercise.name}
      </Typography>
      <Button 
        onClick={handleAddToCart}
        sx={{ ml: '21px', mr: '21px', mt: '10px', color: '#fff', background: '#FF2625', fontSize: '14px', borderRadius: '4px', textTransform: 'capitalize', width: 'calc(100% - 42px)' }}
      >
        Add to Cart
      </Button>
    </Link>
  );
};

export default ExerciseCard;