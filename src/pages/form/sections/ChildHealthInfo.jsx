import React from 'react';
import { Typography, Grid, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { lengthForAgeStatus, weightForAgeStatus, weigthForLengthStatus } from '../Data/Calculations';

const ChildHealthInfo = ({ formik, handleInputChange }) => {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Nutritional Status Information
      </Typography>
      <br />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Date of Weighing"
            type="date"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            name="date_of_weighing"
            value={formik.values.date_of_weighing}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Weight (kg)"
            variant="outlined"
            name="weight"
            value={formik.values.weight}
            onChange={handleInputChange}
            type="number"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Height (cm)"
            variant="outlined"
            name="height"
            value={formik.values.height}
            onChange={handleInputChange}
            type="number"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Mid-upper Arm Circumference"
            variant="outlined"
            name="muac"
            value={formik.values.muac}
            onChange={handleInputChange}
            type="number"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="BPE (Bilateral Pitting Edema)"
            variant="outlined"
            name="bpe"
            value={formik.values.bpe}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Disability</InputLabel>
            <Select label="Disability" name="disability" value={formik.values.disability} onChange={handleInputChange}>
              <MenuItem value="none">None</MenuItem>
              <MenuItem value="hearing">Hearing</MenuItem>
              <MenuItem value="sight">Sight</MenuItem>
              <MenuItem value="smell">Smell</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Additional Info ============================================================ */}
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Length-for-Age Status"
            variant="outlined"
            name="lfa"
            value={lengthForAgeStatus(formik.values.date_of_birth, formik.values.height, formik.values.gender)}
            InputProps={{ readOnly: true }} // Make the field read-only
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Weight-for-Age Status"
            variant="outlined"
            name="wfa"
            value={weightForAgeStatus(formik.values.date_of_birth, formik.values.weight, formik.values.gender)}
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Weight-for-Length Status"
            variant="outlined"
            name="wfl"
            value={weigthForLengthStatus(formik.values.date_of_birth, formik.values.height, formik.values.weight, formik.values.gender)}
            InputProps={{ readOnly: true }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ChildHealthInfo;
