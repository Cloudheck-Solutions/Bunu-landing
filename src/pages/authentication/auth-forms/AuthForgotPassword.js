// material-ui
import { Button, FormHelperText, Grid, InputLabel, OutlinedInput, Stack } from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import PropTypes from 'prop-types';

// project import
import AnimateButton from 'components/@extended/AnimateButton';
import { forgotPassword } from 'services/authenticationService';
import { serviceError } from 'utils/helper';
import { useDispatch } from 'react-redux';

import { setShowAlert, setAlertType, setAlertMessage } from 'store/reducers/alert';

// ============================|| FIREBASE - ForgotPassword ||============================ //

const AuthForgotPassword = ({ resetType }) => {
  const dispatch = useDispatch();
  return (
    <>
      <Formik
        initialValues={{
          email: '',
          phone: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: resetType === 'email' ? Yup.string().email('Must be a valid email').max(255).required('Email is required') : Yup.string(),
          phone: resetType === 'phone' ? Yup.string().max(14).required('Phone is required') : Yup.string()
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            setSubmitting(true);
            const payload = {
              medium: resetType === 'email' ? values.email : values.phone,
              type: resetType
            };
            const res = await forgotPassword(payload);
            if (res.status === 200) {
              setStatus({ success: true });
              setSubmitting(false);
              dispatch(setAlertMessage({ alertMessage: res.data.message }));
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
                {resetType === 'email' ? (
                  <Stack spacing={1}>
                    <InputLabel htmlFor="email-signup">Email Address*</InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.email && errors.email)}
                      id="email-login"
                      type="email"
                      value={values.email}
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="demo@company.com"
                      inputProps={{}}
                    />
                    {touched.email && errors.email && (
                      <FormHelperText error id="helper-text-email-signup">
                        {errors.email}
                      </FormHelperText>
                    )}
                  </Stack>
                ) : (
                  <Stack spacing={1}>
                    <InputLabel htmlFor="phone-signup">Phone Number*</InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.phone && errors.phone)}
                      id="phone-login"
                      type="text"
                      value={values.phone}
                      name="phone"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="07000000000"
                      inputProps={{}}
                    />
                    {touched.phone && errors.phone && (
                      <FormHelperText error id="helper-text-phone-signup">
                        {errors.phone}
                      </FormHelperText>
                    )}
                  </Stack>
                )}
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

AuthForgotPassword.propTypes = {
  resetType: PropTypes.string.isRequired
};

export default AuthForgotPassword;
