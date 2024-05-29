import PropTypes from 'prop-types';

// material-ui
import { Box, Grid, Avatar } from '@mui/material';

// project import
import AuthCard from './AuthCard';
// import Logo from 'components/Logo';
import AuthFooter from 'components/cards/AuthFooter';
import lt_logo from '../../assets/lt_logo.ico';

// assets
// import AuthBackground from 'assets/images/auth/AuthBackground';

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

const AuthWrapper = ({ children }) => (
  <Box sx={{ minHeight: '100vh' }}>
    {/* <AuthBackground /> */}
    <Grid
      container
      direction="column"
      justifyContent="flex-end"
      sx={{
        minHeight: '100vh'
      }}
    >
      <Grid item xs={12} sx={{ ml: 3, mt: 3 }}>
        <Avatar
          alt="LT Logo"
          src={lt_logo}
          variant="square"
          sx={{
            width: { xs: 40, sm: 60 },
            height: { xs: 40, sm: 60 }
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid
          item
          xs={12}
          container
          justifyContent="center"
          alignItems="center"
          sx={{ minHeight: { xs: 'calc(100vh - 134px)', md: 'calc(100vh - 112px)' } }}
        >
          <Grid item>
            <AuthCard>{children}</AuthCard>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
        <AuthFooter />
      </Grid>
    </Grid>
  </Box>
);

AuthWrapper.propTypes = {
  children: PropTypes.node
};

export default AuthWrapper;
