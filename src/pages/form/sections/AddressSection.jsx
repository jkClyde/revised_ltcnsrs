import React from 'react';
import { Grid, TextField, Typography } from '@mui/material';

const AddressSection = ({ formik, handleInputChange }) => {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Address Information
      </Typography>
      <br />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="House Number"
            variant="outlined"
            name="house_number"
            value={formik.values.house_number}
            onChange={handleInputChange}
            error={Boolean(formik.errors.house_number)}
            helperText={formik.touched.house_number && formik.errors.house_number}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Sitio"
            variant="outlined"
            name="sitio"
            value={formik.values.sitio}
            onChange={handleInputChange}
            error={Boolean(formik.errors.sitio)}
            helperText={formik.touched.sitio && formik.errors.sitio}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Barangay"
            variant="outlined"
            name="barangay"
            value={formik.values.barangay}
            onChange={handleInputChange}
            error={Boolean(formik.errors.barangay)}
            helperText={formik.touched.barangay && formik.errors.barangay}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Status of Residency"
            variant="outlined"
            name="status_of_residency"
            value={formik.values.status_of_residency}
            onChange={handleInputChange}
            error={Boolean(formik.errors.status_of_residency)}
            helperText={formik.touched.status_of_residency && formik.errors.status_of_residency}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Length of Stay"
            variant="outlined"
            name="length_of_stay"
            value={formik.values.length_of_stay}
            onChange={handleInputChange}
            error={Boolean(formik.errors.length_of_stay)}
            helperText={formik.touched.length_of_stay && formik.errors.length_of_stay}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Duration Type"
            variant="outlined"
            name="duration_type"
            value={formik.values.duration_type}
            onChange={handleInputChange}
            error={Boolean(formik.errors.duration_type)}
            helperText={formik.touched.duration_type && formik.errors.duration_type}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default AddressSection;
