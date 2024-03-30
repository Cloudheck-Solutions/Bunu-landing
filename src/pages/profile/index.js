// material-ui
import { Grid, TextField, IconButton, /* FormControl, InputLabel, Select, MenuItem, Chip,*/ Button, Avatar } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import PageLoader from 'components/PageLoader';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setShowAlert, setAlertType, setAlertMessage } from 'store/reducers/alert';
import { currentProfile } from 'store/reducers/user';

import { serviceError } from 'utils/helper';
import { CloudUploadOutlined } from '@ant-design/icons';
import ReactFileReader from 'react-file-reader';
import { getUserById, updateUser, updateUserDp } from 'services/userService';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

// ==============================|| Profile ||============================== //

const Profile = () => {
  const dispatch = useDispatch();

  const [isLoading] = useState(false);
  const { profile } = useSelector((state) => state.user);
  const [selectedFile, setSelectedFile] = useState(null);
  const [user, setUser] = useState({
    dateOfBirth: profile.dob ?? '',
    email: profile.email ?? '',
    address: profile.address ?? '',
    city: profile.city ?? '',
    state: profile.state ?? '',
    country: profile.country ?? '',
    phoneNumber: profile.phoneNumber ?? ''
  });
  const getUser = async (id) => {
    try {
      const res = await getUserById(id);
      if (res.status === 200) {
        localStorage.setItem('user', JSON.stringify(res.data.data));
        dispatch(currentProfile({ profile: res.data.data }));
      }
    } catch (err) {
      dispatch(setAlertMessage({ alertMessage: serviceError(err) }));
      dispatch(setAlertType({ alertType: 'error' }));
      dispatch(setShowAlert({ showAlert: true }));
      setTimeout(() => {
        dispatch(setShowAlert({ showAlert: false }));
      }, 3000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleDateChange = (e) => {
    setUser({ ...user, dateOfBirth: e.format('YYYY-MM-DD') });
  };

  const handleSubmit = async () => {
    try {
      const userDetail = { ...user };
      for (let key in userDetail) {
        if (userDetail[key] === null || userDetail[key] === '') {
          delete userDetail[key];
        }
      }
      const res = await updateUser(profile.id, userDetail);
      if (res.status === 200) {
        dispatch(setAlertMessage({ alertMessage: 'Profile Updated Successfully' }));
        dispatch(setAlertType({ alertType: 'success' }));
        dispatch(setShowAlert({ showAlert: true }));
        getUser(profile.id);
        setTimeout(() => {
          dispatch(setShowAlert({ showAlert: false }));
        }, 3000);
      }
    } catch (err) {
      dispatch(setAlertMessage({ alertMessage: serviceError(err) }));
      dispatch(setAlertType({ alertType: 'error' }));
      dispatch(setShowAlert({ showAlert: true }));
      setTimeout(() => {
        dispatch(setShowAlert({ showAlert: false }));
      }, 3000);
    }
  };

  const handleFiles = async (e) => {
    setSelectedFile(e[0]);
    try {
      const payload = new FormData();
      payload.append('image', e[0]);
      const res = await updateUserDp(profile.id, payload);
      if (res.status === 200) {
        dispatch(setAlertMessage({ alertMessage: 'Profile Image Updated Successfully' }));
        dispatch(setAlertType({ alertType: 'success' }));
        dispatch(setShowAlert({ showAlert: true }));
        getUser(profile.id);
        setTimeout(() => {
          dispatch(setShowAlert({ showAlert: false }));
        }, 3000);
      }
    } catch (err) {
      setSelectedFile(null);
      dispatch(setAlertMessage({ alertMessage: serviceError(err) }));
      dispatch(setAlertType({ alertType: 'error' }));
      dispatch(setShowAlert({ showAlert: true }));
      setTimeout(() => {
        dispatch(setShowAlert({ showAlert: false }));
      }, 3000);
    }
  };

  return (
    <MainCard title="Profile">
      {isLoading ? (
        <PageLoader />
      ) : (
        <Grid container spacing={2} align="center" justify="center" alignItems="center">
          <Grid item xs={12} sm={12}>
            <ReactFileReader handleFiles={handleFiles} fileTypes={'image/*'}>
              <Button variant="text">
                {selectedFile ? (
                  <Avatar
                    alt="Profile Picture"
                    src={URL.createObjectURL(selectedFile)}
                    sx={{
                      width: 100,
                      height: 100,
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'scale(1.1)'
                      },
                      cursor: 'pointer'
                    }}
                  />
                ) : (
                  <Avatar
                    alt="Profile Picture"
                    src={profile.dpUrl}
                    sx={{
                      width: 100,
                      height: 100,
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'scale(1.1)'
                      },
                      cursor: 'pointer'
                    }}
                  />
                )}
              </Button>
            </ReactFileReader>
          </Grid>
          <Grid item xs={12} sm={12}>
            <ReactFileReader handleFiles={handleFiles} fileTypes={'image/*'}>
              <IconButton color="secondary" size="large" sx={{ width: 100 }}>
                <CloudUploadOutlined />
              </IconButton>
            </ReactFileReader>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField id="email" name="email" label="Email" type="email" value={user.email} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="phoneNumber"
              name="phoneNumber"
              label="Phone Number"
              value={user.phoneNumber}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date of Birth"
                onChange={handleDateChange}
                value={user.dateOfBirth && dayjs(user.dateOfBirth)}
                name="dateOfBirth"
                id="dateOfBirth"
                sx={{ width: '100%' }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField id="address" name="address" label="Address" value={user.address} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField id="city" name="city" label="City" value={user.city} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField id="state" name="state" label="State" value={user.state} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField id="country" name="country" label="country" value={user.country} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Save Configuration
            </Button>
          </Grid>
        </Grid>
      )}
    </MainCard>
  );
};

export default Profile;
