import React, { useContext } from 'react';
import { Box, Typography, Stack, Button, Paper } from '@mui/material';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  const downloadPDF = () => {
    const doc = new jsPDF();
    let yPosition = 20;

    // Title
    doc.setFontSize(20);
    doc.text('My Workout Plan', 20, yPosition);
    yPosition += 15;

    // Date
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, yPosition);
    yPosition += 10;

    // Exercises
    doc.setFontSize(12);
    doc.text('Exercises:', 20, yPosition);
    yPosition += 8;

    doc.setFontSize(10);
    cart.forEach((exercise, index) => {
      const exerciseText = `${index + 1}. ${exercise.name.toUpperCase()}`;
      const bodyPartText = `Body Part: ${exercise.bodyPart} | Target: ${exercise.target}`;
      const equipmentText = `Equipment: ${exercise.equipment}`;
      const descriptionText = exercise.description 
        ? `Description: ${exercise.description.substring(0, 100)}...` 
        : 'Description: N/A';

      doc.text(exerciseText, 20, yPosition);
      yPosition += 6;
      doc.setFontSize(9);
      doc.text(bodyPartText, 25, yPosition);
      yPosition += 5;
      doc.text(equipmentText, 25, yPosition);
      yPosition += 5;
      doc.text(descriptionText, 25, yPosition);
      yPosition += 7;
      doc.setFontSize(10);

      // Add new page if content goes too long
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
    });

    doc.save('workout-plan.pdf');
  };

  if (cart.length === 0) {
    return (
      <Box sx={{ mt: { lg: '109px' } }} mt="50px" p="20px" textAlign="center">
        <Typography variant="h4" fontWeight="bold" mb="20px">Your Workout Cart</Typography>
        <Typography fontSize="18px" mb="20px">Your cart is empty</Typography>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Button sx={{ background: '#FF2625', color: '#fff', textTransform: 'capitalize' }}>
            Continue Shopping
          </Button>
        </Link>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: { lg: '109px' } }} mt="50px" p="20px">
      <Typography variant="h4" fontWeight="bold" mb="30px">Your Workout Cart ({cart.length})</Typography>
      
      <Stack spacing={2} mb="30px">
        {cart.map((exercise) => (
          <Paper key={exercise.cartId} sx={{ p: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography fontWeight="bold" fontSize="18px" textTransform="capitalize">
                {exercise.name}
              </Typography>
              <Typography fontSize="14px" color="gray">
                Body Part: {exercise.bodyPart} | Target: {exercise.target}
              </Typography>
              <Typography fontSize="14px" color="gray">
                Equipment: {exercise.equipment}
              </Typography>
              {exercise.description && (
                <Typography fontSize="13px" color="gray" mt="5px">
                  {exercise.description.substring(0, 100)}...
                </Typography>
              )}
            </Box>
            <Button 
              onClick={() => removeFromCart(exercise.cartId)}
              sx={{ background: '#FF2625', color: '#fff', textTransform: 'capitalize' }}
            >
              Remove
            </Button>
          </Paper>
        ))}
      </Stack>

      <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Button sx={{ background: '#FF2625', color: '#fff', textTransform: 'capitalize' }}>
            Add More Exercises
          </Button>
        </Link>
        <Button 
          onClick={clearCart}
          sx={{ background: '#999', color: '#fff', textTransform: 'capitalize' }}
        >
          Clear Cart
        </Button>
        <Button 
          onClick={downloadPDF}
          sx={{ background: '#FEC503', color: '#000', textTransform: 'capitalize', fontWeight: 'bold' }}
        >
          Save Workout Plan (PDF)
        </Button>
      </Stack>
    </Box>
  );
};

export default Cart;
