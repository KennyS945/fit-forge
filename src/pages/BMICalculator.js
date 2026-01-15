import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Stack, Paper, MenuItem } from '@mui/material';

const BMICalculator = () => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [feet, setFeet] = useState('');
  const [inches, setInches] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBMI] = useState(null);
  const [category, setCategory] = useState('');

  const calculateBMI = () => {
    if (!feet || !inches || !weight) {
      alert('Please fill in Height and Weight');
      return;
    }

    // Convert feet and inches to total inches, then to meters
    const totalInches = parseInt(feet) * 12 + parseInt(inches);
    const heightInMeters = totalInches * 0.0254;
    const weightInKg = parseInt(weight) * 0.453592;

    // Calculate BMI
    const calculatedBMI = weightInKg / (heightInMeters * heightInMeters);
    setBMI(calculatedBMI.toFixed(1));

    // Determine category
    if (calculatedBMI < 18.5) {
      setCategory('Underweight');
    } else if (calculatedBMI < 25) {
      setCategory('Normal weight');
    } else if (calculatedBMI < 30) {
      setCategory('Overweight');
    } else {
      setCategory('Obese');
    }
  };

  const resetCalculator = () => {
    setAge('');
    setGender('');
    setFeet('');
    setInches('');
    setWeight('');
    setBMI(null);
    setCategory('');
  };

  const getBMIColor = () => {
    if (!bmi) return '#ccc';
    if (bmi < 18.5) return '#3498db'; // Blue - Underweight
    if (bmi < 25) return '#2ecc71'; // Green - Normal
    if (bmi < 30) return '#f39c12'; // Orange - Overweight
    return '#e74c3c'; // Red - Obese
  };

  return (
    <Box sx={{ mt: { lg: '109px' } }} mt="50px" p="20px">
      <Typography variant="h4" fontWeight="bold" mb="30px" textAlign="center">
        BMI Calculator
      </Typography>

      <Stack spacing={3} maxWidth="500px" margin="0 auto">
        {/* Age */}
        <TextField
          label="Age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          fullWidth
          variant="outlined"
        />

        {/* Gender */}
        <TextField
          select
          label="Gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          fullWidth
          variant="outlined"
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </TextField>

        {/* Height */}
        <Typography fontWeight="bold">Height</Typography>
        <Stack direction="row" spacing={2}>
          <TextField
            label="Feet"
            type="number"
            value={feet}
            onChange={(e) => setFeet(e.target.value)}
            fullWidth
            variant="outlined"
            inputProps={{ min: '0', max: '8' }}
          />
          <TextField
            label="Inches"
            type="number"
            value={inches}
            onChange={(e) => setInches(e.target.value)}
            fullWidth
            variant="outlined"
            inputProps={{ min: '0', max: '11' }}
          />
        </Stack>

        {/* Weight */}
        <TextField
          label="Weight (lbs)"
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          fullWidth
          variant="outlined"
          inputProps={{ min: '0' }}
        />

        {/* Calculate Button */}
        <Button
          onClick={calculateBMI}
          sx={{
            background: '#FF2625',
            color: '#fff',
            textTransform: 'capitalize',
            padding: '12px',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          Calculate BMI
        </Button>

        {/* Results */}
        {bmi && (
          <Paper
            sx={{
              p: '30px',
              textAlign: 'center',
              backgroundColor: getBMIColor(),
              color: '#fff',
              borderRadius: '10px'
            }}
          >
            <Typography variant="h5" mb="10px">Your BMI</Typography>
            <Typography variant="h2" fontWeight="bold" mb="15px">
              {bmi}
            </Typography>
            <Typography variant="h6" mb="15px">
              {category}
            </Typography>
            <Typography fontSize="14px">
              {category === 'Normal weight' && 'You have a healthy weight. Keep up the good work!'}
              {category === 'Underweight' && 'You may want to consult a healthcare provider.'}
              {category === 'Overweight' && 'Consider increasing physical activity and a balanced diet.'}
              {category === 'Obese' && 'Please consult with a healthcare provider.'}
            </Typography>
          </Paper>
        )}

        {/* Reset Button */}
        {bmi && (
          <Button
            onClick={resetCalculator}
            sx={{
              background: '#999',
              color: '#fff',
              textTransform: 'capitalize',
              padding: '12px'
            }}
          >
            Reset
          </Button>
        )}
      </Stack>

      {/* BMI Chart */}
      <Box sx={{ mt: '50px', maxWidth: '500px', margin: '50px auto 0' }}>
        <Typography fontWeight="bold" mb="15px" textAlign="center">BMI Categories</Typography>
        <Stack spacing={1}>
          <Paper sx={{ p: '10px', backgroundColor: '#3498db', color: '#fff' }}>
            <Typography>Underweight: BMI less than 18.5</Typography>
          </Paper>
          <Paper sx={{ p: '10px', backgroundColor: '#2ecc71', color: '#fff' }}>
            <Typography>Normal weight: BMI 18.5 - 24.9</Typography>
          </Paper>
          <Paper sx={{ p: '10px', backgroundColor: '#f39c12', color: '#fff' }}>
            <Typography>Overweight: BMI 25 - 29.9</Typography>
          </Paper>
          <Paper sx={{ p: '10px', backgroundColor: '#e74c3c', color: '#fff' }}>
            <Typography>Obese: BMI 30 and above</Typography>
          </Paper>
        </Stack>
      </Box>
    </Box>
  );
};

export default BMICalculator;
