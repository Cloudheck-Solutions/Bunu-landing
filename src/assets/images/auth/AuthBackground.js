import { Box } from '@mui/material';

import logo from 'assets/images/landing/logo.png';

const AuthBackground = () => {
  return (
    <Box sx={{ position: 'absolute', filter: 'blur(18px)', zIndex: -1, bottom: 0 }}>
      <img src={logo} alt="bg" />
    </Box>
  );
};

export default AuthBackground;
