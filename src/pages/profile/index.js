import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, Grid, Container } from '@mui/material';
import { connect } from 'react-redux';
import databaseURL from 'database_url';

const UserProfile = ({ access_token }) => {
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    job_description: '',
    barangay: '',
    email: '',
    phone_number: ''
  });

  useEffect(() => {
    if (access_token) {
      fetchUserData();
    }
  }, [access_token]);

  const fetchUserData = () => {
    fetch(`${databaseURL}/auth/users/me/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  };

  const handleChange = (field, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value
    }));
  };

  return (
    <Container maxWidth="lg">
      <Box mt={4} p={3} borderRadius={8} boxShadow={2} bgcolor="#f2f0f0">
        <Typography variant="h3" gutterBottom align="center" color="primary">
          PERSONAL INFORMATION
        </Typography>
        <Box mt={2}>
          <Typography variant="h4" gutterBottom align="center">
            {user.first_name} {user.last_name}
          </Typography>
          <Typography gutterBottom>
            <strong>Job Title:</strong> {user.job_description}
          </Typography>
          <Typography gutterBottom>
            <strong>Address:</strong> {user.barangay}
          </Typography>
          <Typography gutterBottom>
            <strong>Email:</strong> {user.email}
          </Typography>
          <Typography gutterBottom>
            <strong>Phone Number:</strong> {user.phone_number}
          </Typography>
        </Box>
      </Box>

      <Box mt={4} p={4} borderRadius={8} boxShadow={2} bgcolor="#f2f0f0">
        <Typography variant="h4" gutterBottom align="center" color="primary">
          Edit Information
        </Typography>
        <Box mt={3}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                value={user.first_name}
                onChange={(e) => handleChange('first_name', e.target.value)}
                sx={{ '& input': { fontSize: '1.2rem' } }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                value={user.last_name}
                onChange={(e) => handleChange('last_name', e.target.value)}
                sx={{ '& input': { fontSize: '1.2rem' } }}
              />
            </Grid>
          </Grid>
          <TextField
            label="Barangay"
            variant="outlined"
            fullWidth
            value={user.barangay}
            onChange={(e) => handleChange('barangay', e.target.value)}
            sx={{ '& input': { fontSize: '1.2rem' }, mt: 3 }}
          />
          <TextField
            label="Email Address"
            variant="outlined"
            fullWidth
            value={user.email}
            disabled
            sx={{ '& input': { fontSize: '1.2rem' }, mt: 3 }}
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            value={user.phone_number}
            onChange={(e) => handleChange('phone_number', e.target.value)}
            sx={{ '& input': { fontSize: '1.2rem' }, mt: 3 }}
          />
          <Button variant="contained" color="primary" size="large" sx={{ mt: 3 }}>
            Save
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  access_token: state.auth.access
});

export default connect(mapStateToProps, {})(UserProfile);
