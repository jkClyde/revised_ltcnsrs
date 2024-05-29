// material-ui
// import { useTheme } from '@mui/material/styles';
import { Box, Avatar } from '@mui/material';
import lt_logo from '../../../assets/lt_logo.ico';

// ==============================|| AUTH BLUR BACK SVG ||============================== //

const AuthBackground = () => {
  // const theme = useTheme();
  return (
    <Box sx={{ position: 'absolute', filter: 'blur(18px)', zIndex: -1, bottom: 0, opacity: 0.4 }}>
      <Avatar
        alt="LT Logo"
        src={lt_logo}
        variant="square"
        sx={{
          width: '100%',
          height: 'calc(100vh - 175px)'
        }}
      />
    </Box>
  );
};

export default AuthBackground;
