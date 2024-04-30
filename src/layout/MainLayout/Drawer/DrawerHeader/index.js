import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Stack, Avatar, Typography } from '@mui/material';

// project import
import DrawerHeaderStyled from './DrawerHeaderStyled';
// import Logo from 'components/Logo';
import lt_logo from '../../../../assets/lt_logo.ico';

// ==============================|| DRAWER HEADER ||============================== //

const DrawerHeader = ({ open }) => {
  const theme = useTheme();

  return (
    // only available in paid version
    <DrawerHeaderStyled theme={theme} open={open}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Avatar
          alt="LT Logo"
          src={lt_logo}
          variant="square"
          sx={{
            width: { xs: 40, sm: 50 },
            height: { xs: 40, sm: 50 }
          }}
        />
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontSize: { xs: '1.25rem', sm: '1.5rem' },
            fontWeight: 'bold'
          }}
        >
          LTCNSRS
        </Typography>
      </Stack>
    </DrawerHeaderStyled>
  );
};

DrawerHeader.propTypes = {
  open: PropTypes.bool
};

export default DrawerHeader;
