// import { Link } from 'react-router-dom';

// material-ui
import { Grid, Stack, Typography, Box } from '@mui/material';

// project import
import AuthLogin from './auth-forms/AuthLogin';
import AuthWrapper from './AuthWrapper';

// ================================|| LOGIN ||================================ //

const Login = () => (
  <AuthWrapper>
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
          <Typography variant="h3">Login</Typography>
          {/* <Typography component={Link} to="/register" variant="body1" sx={{ textDecoration: 'none' }} color="primary">
            Don&apos;t have an account?
          </Typography> */}
        </Stack>
        <AuthLogin />
      </Grid>
      <Grid item xs={12} md={6}>
        <Box sx={{ mt: 3, p: 3, backgroundColor: '#ffeb3b', borderRadius: 1, textAlign: 'center' }}>
          <Typography variant="h6" color="textPrimary" gutterBottom>
            <strong>Attention:</strong> This is a demonstration page.
          </Typography>
          <Typography variant="body1" color="textPrimary" gutterBottom>
            Some sensitive data and features are hidden for security reasons.
          </Typography>
          <Typography variant="body1" color="textPrimary" gutterBottom>
            To login, use the following credentials:
          </Typography>
          <Typography variant="body1" color="textPrimary" gutterBottom>
            <strong>Username:</strong> admin@gmail.com
          </Typography>
          <Typography variant="body1" color="textPrimary">
            <strong>Password:</strong> admin_pass
          </Typography>
        </Box>
      </Grid>
    </Grid>
  </AuthWrapper>
);

export default Login;

// // import { Link } from 'react-router-dom';

// // material-ui
// import { Grid, Stack, Typography } from '@mui/material';

// // project import
// import AuthLogin from './auth-forms/AuthLogin';
// import AuthWrapper from './AuthWrapper';

// // ================================|| LOGIN ||================================ //

// const Login = () => (
//   <AuthWrapper>
//     <Grid container spacing={3}>
//       <Grid item xs={12}>
//         <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
//           <Typography variant="h3">Login</Typography>
//           {/* <Typography component={Link} to="/register" variant="body1" sx={{ textDecoration: 'none' }} color="primary">
//             Don&apos;t have an account?
//           </Typography> */}
//         </Stack>
//       </Grid>
//       <Grid item xs={12}>
//         <AuthLogin />
//       </Grid>
//     </Grid>
//   </AuthWrapper>
// );

// export default Login;
