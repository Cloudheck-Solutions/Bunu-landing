import React from 'react';
import { useSearchParams } from 'react-router-dom';

// material-ui
import { Button, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack } from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { resetPassword } from 'services/authenticationService';
import { serviceError } from 'utils/helper';
import { useDispatch } from 'react-redux';

import { setShowAlert, setAlertType, setAlertMessage } from 'store/reducers/alert';

// ============================|| Reset Password ||============================ //

const AuthResetPassword = () => {
  const [params] = useSearchParams();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowPasswordConfirmation = () => {
    setShowPasswordConfirmation(!showPasswordConfirmation);
  };

  const [id] = React.useState(params.get('id'));
  const [token] = React.useState(params.get('token'));
  const [type] = React.useState(params.get('type'));

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Formik
        initialValues={{
          password: '',
          password_confirmation: ''
        }}
        validationSchema={Yup.object().shape({
          password: Yup.string().max(255).required('Password is required'),
          password_confirmation: Yup.string()
            .max(255)
            .required('Password Confirmation is required')
            .test('passwords-match', 'Passwords must match', function (value) {
              return this.parent.password === value;
            })
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            setSubmitting(true);
            const payload = {
              token: token,
              id: id,
              type: type,
              password: values.password,
              password_confirmation: values.password_confirmation
            };
            const res = await resetPassword(payload);
            if (res.status === 200) {
              setStatus({ success: true });
              setSubmitting(false);
              dispatch(setAlertMessage({ alertMessage: 'Password reset successful, you can sign-n with your new password' }));
              dispatch(setAlertType({ alertType: 'success' }));
              dispatch(setShowAlert({ showAlert: true }));
              setTimeout(() => {
                dispatch(setShowAlert({ showAlert: false }));
              }, 3000);
            }
          } catch (err) {
            setStatus({ success: false });
            setErrors({ submit: serviceError(err) });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="-password-login"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          size="large"
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="Enter password"
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="standard-weight-helper-text-password-login">
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password_confirmation-login">Password Confirmation</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password_confirmation && errors.password_confirmation)}
                    id="-password_confirmation-login"
                    type={showPasswordConfirmation ? 'text' : 'password'}
                    value={values.password_confirmation}
                    name="password_confirmation"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password confirmation visibility"
                          onClick={handleClickShowPasswordConfirmation}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          size="large"
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="Enter password confirmation"
                  />
                  {touched.password_confirmation && errors.password_confirmation && (
                    <FormHelperText error id="standard-weight-helper-text-password_confirmation-login">
                      {errors.password_confirmation}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    Submit
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthResetPassword;
