import { useState } from 'react';

// material-ui
import { Grid, Stack, Typography, Button } from '@mui/material';

// project import
import AuthForgotPassword from './auth-forms/AuthForgotPassword';
import AuthWrapper from './AuthWrapper';

// ================================|| REGISTER ||================================ //

const ForgotPassword = () => {
  const [resetType, setResetType] = useState('email');
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Forgot Password</Typography>
            <Button variant="text" onClick={() => setResetType((prev) => (prev === 'email' ? 'phone' : 'email'))}>
              Reset with {resetType === 'email' ? 'Phone Number' : 'Email'}
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthForgotPassword resetType={resetType} />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default ForgotPassword;
