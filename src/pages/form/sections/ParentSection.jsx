import React, { useState } from 'react';
import { Grid, TextField, Typography, Tabs, Tab } from '@mui/material';

const ParentSection = ({ formik, handleInputChange }) => {
  const [selectedTab, setSelectedTab] = useState(0); // State for managing the active tab

  const handleChange = (event, newTab) => {
    setSelectedTab(newTab);
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Parents Information
      </Typography>
      <Tabs value={selectedTab} onChange={handleChange}>
        <Tab label="Father" />
        <Tab label="Mother" />
        <Tab label="Guardian" />
      </Tabs>
      <br />
      {selectedTab === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Father Surname"
              variant="outlined"
              name="father_last_name"
              value={formik.values.father_last_name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Father First Name"
              variant="outlined"
              name="father_first_name"
              value={formik.values.father_first_name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Father Middle Name"
              variant="outlined"
              name="father_middle_name"
              value={formik.values.father_middle_name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Father Suffix"
              variant="outlined"
              name="father_suffix"
              value={formik.values.father_suffix}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Father Age"
              variant="outlined"
              name="father_age"
              value={formik.values.father_age}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Father Ethnicity"
              variant="outlined"
              name="father_ethnicity"
              value={formik.values.father_ethnicity}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Father Occupation"
              variant="outlined"
              name="father_occupation"
              value={formik.values.father_occupation}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Father Religion"
              variant="outlined"
              name="father_religion"
              value={formik.values.father_religion}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Father Contact Number"
              variant="outlined"
              name="father_contact_number"
              value={formik.values.father_contact_number}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
      )}
      {selectedTab === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Mother Surname"
              variant="outlined"
              name="mother_last_name"
              value={formik.values.mother_last_name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Mother First Name"
              variant="outlined"
              name="mother_first_name"
              value={formik.values.mother_first_name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Mother Middle Name"
              variant="outlined"
              name="mother_middle_name"
              value={formik.values.mother_middle_name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Mother Suffix"
              variant="outlined"
              name="mother_suffix"
              value={formik.values.mother_suffix}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Mother Age"
              variant="outlined"
              name="mother_age"
              value={formik.values.mother_age}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Mother Ethnicity"
              variant="outlined"
              name="mother_ethnicity"
              value={formik.values.mother_ethnicity}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Mother Occupation"
              variant="outlined"
              name="mother_occupation"
              value={formik.values.mother_occupation}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Mother Religion"
              variant="outlined"
              name="mother_religion"
              value={formik.values.mother_religion}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Mother Contact Number"
              variant="outlined"
              name="mother_contact_number"
              value={formik.values.mother_contact_number}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
      )}
      {selectedTab === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Guardian Surname"
              variant="outlined"
              name="guardian_last_name"
              value={formik.values.guardian_last_name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Guardian First Name"
              variant="outlined"
              name="guardian_first_name"
              value={formik.values.guardian_first_name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Guardian Middle Name"
              variant="outlined"
              name="guardian_middle_name"
              value={formik.values.guardian_middle_name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Guardian Suffix"
              variant="outlined"
              name="guardian_suffix"
              value={formik.values.guardian_suffix}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Guardian Age"
              variant="outlined"
              name="guardian_age"
              value={formik.values.guardian_age}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Guardian Ethnicity"
              variant="outlined"
              name="guardian_ethnicity"
              value={formik.values.guardian_ethnicity}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Guardian Occupation"
              variant="outlined"
              name="guardian_occupation"
              value={formik.values.guardian_occupation}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Guardian Religion"
              variant="outlined"
              name="guardian_religion"
              value={formik.values.guardian_religion}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Guardian Contact Number"
              variant="outlined"
              name="guardian_contact_number"
              value={formik.values.guardian_contact_number}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default ParentSection;
