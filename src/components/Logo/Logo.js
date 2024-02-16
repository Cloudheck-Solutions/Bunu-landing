import logo from 'assets/images/landing/logo.png';
import { Grid, Typography } from '@mui/material';

const Logo = () => {
  return (
    <>
      <Grid item>
        <img src={logo} alt="logo" />
      </Grid>
      <Grid item sx={{ ml: 2 }}>
        <Typography variant="h3">Bunu</Typography>
      </Grid>
    </>
  );
};

export default Logo;
