import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Stack, Badge } from '@mui/material';
import { CartContext } from '../context/CartContext';

import Logo from '../assets/images/Logo.png';

const Navbar = () => {
  const { cart } = useContext(CartContext);

  return (
    <Stack direction="row" justifyContent="space-around" sx={{ gap: { sm: '123px', xs: '40px' }, mt: { sm: '32px', xs: '20px' }, justifyContent: 'none' }} px="20px">
      <Link to="/">
        <img src={Logo} alt="logo" style={{ width: '128px', height: '128px', margin: '0px 20px' }} />
      </Link>
      <Stack
        direction="row"
        gap="40px"
        fontFamily="Alegreya"
        fontSize="24px"
        alignItems="flex-end"
      >
        <Link to="/" style={{ textDecoration: 'none', color: '#3A1212', borderBottom: '3px solid #FF2625' }}>Home</Link>
        <a href="#exercises" style={{ textDecoration: 'none', color: '#3A1212' }}>Exercises</a>
        <Link to="/bmi-calculator" style={{ textDecoration: 'none', color: '#3A1212' }}>BMI</Link>
        <Link to="/cart" style={{ textDecoration: 'none', color: '#3A1212' }}>
          <Badge badgeContent={cart.length} color="error">
            <span>Cart</span>
          </Badge>
        </Link>
      </Stack>
    </Stack>
  );
};

export default Navbar;