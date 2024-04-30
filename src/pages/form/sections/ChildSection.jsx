import React from 'react';
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
// import { calculateAgeInMonths } from '../../Data/Calculations';

const childSection = ({ formik, handleInputChange }) => {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Child Information
      </Typography>
      <br />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Surname"
            variant="outlined"
            name="last_name"
            value={formik.values.last_name}
            onChange={handleInputChange}
            error={Boolean(formik.errors.last_name)}
            helperText={formik.touched.last_name && formik.errors.last_name}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="First Name"
            variant="outlined"
            name="first_name"
            value={formik.values.first_name}
            onChange={handleInputChange}
            error={Boolean(formik.errors.first_name)}
            helperText={formik.touched.first_name && formik.errors.first_name}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Middle Name"
            variant="outlined"
            name="middle_name"
            value={formik.values.middle_name}
            onChange={handleInputChange}
            error={formik.touched.middle_name && Boolean(formik.errors.middle_name)}
            helperText={formik.touched.middle_name && formik.errors.middle_name}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField fullWidth label="Suffix" variant="outlined" name="suffix" value={formik.values.suffix} onChange={handleInputChange} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Birthdate"
            type="date"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            name="date_of_birth"
            value={formik.values.date_of_birth}
            onChange={handleInputChange}
            error={formik.touched.date_of_birth && Boolean(formik.errors.date_of_birth)}
            helperText={formik.touched.date_of_birth && formik.errors.date_of_birth}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl variant="outlined" fullWidth error={formik.touched.gender && Boolean(formik.errors.gender)}>
            <InputLabel>Gender</InputLabel>
            <Select
              label="gender"
              name="gender"
              value={formik.values.gender}
              onChange={handleInputChange}
              error={formik.touched.gender && Boolean(formik.errors.gender)}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Birth Weight"
            variant="outlined"
            name="birth_weight"
            value={formik.values.birth_weight}
            onChange={handleInputChange}
            error={formik.touched.birth_weight && Boolean(formik.errors.birth_weight)}
            helperText={formik.touched.birth_weight && formik.errors.birth_weight}
            type="number"
            onKeyPress={(e) => {
              // Allow only numeric characters and the backspace key
              if (!/^\d*\.?\d*$/.test(e.target.value + e.key)) {
                e.preventDefault();
              }
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Birth Order"
            variant="outlined"
            name="birth_order"
            value={formik.values.birth_order}
            onChange={handleInputChange}
            error={formik.touched.birth_order && Boolean(formik.errors.birth_order)}
            helperText={formik.touched.birth_order && formik.errors.birth_order}
            type="number"
            onKeyPress={(e) => {
              // Allow only numeric characters and the backspace key
              if (!/^\d$/.test(e.key) && e.key !== 'Backspace') {
                e.preventDefault();
              }
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default childSection;
