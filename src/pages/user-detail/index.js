// project import
import MainCard from 'components/MainCard';
import {
  Typography,
  Avatar,
  Button,
  Grid,
  Box,
  Tab,
  Tabs,
  Select,
  FormControl,
  Chip,
  InputLabel,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  MenuItem
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { capitalizeFirstLetter, dateConverter, nullStringCheck, serviceError } from 'utils/helper';
import { getUserById, updateUserStatus, userVerification } from 'services/userService';
import PageLoader from 'components/PageLoader';
import { setShowAlert, setAlertType, setAlertMessage } from 'store/reducers/alert';
import { useDispatch } from 'react-redux';
import CustomModal from 'components/CustomModal';
import { addUserToRole, getRoles, getUserRoles, removeUserFromRole } from 'services/roleService';
import { getDocuments, updateDocumentStatus } from 'services/verificationService';

// ==============================|| User Detail ||============================== //
const Details = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column'
}));

const Content = styled('div')(() => ({
  flex: '1 0 auto'
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(10),
  height: theme.spacing(10),
  marginRight: theme.spacing(2)
}));

const UserDetail = () => {
  const [openRoleModal, setOpenRoleModal] = useState(false);
  const [openRemoveRoleModal, setOpenRemoveRoleModal] = useState(false);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [openVerifyModal, setOpenVerifyModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittingDoc, setIsSubmittingDoc] = useState(false);

  const [fetchRoles, setFetchRoles] = useState(false);

  const [role, setRole] = useState('');
  const [userRole, setUserRole] = useState('');
  const [status, setStatus] = useState('');
  const [medium, setMedium] = useState([]);
  const [roles, setRoles] = useState([]);
  const [userRoles, setUserRoles] = useState([]);

  const [user, setUser] = useState(null);
  const [documents, setDocuments] = useState([]);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        const res = await getUserById(id);
        if (res.status === 200) {
          setUser(res.data.data);
          setFetchRoles(true);
        }
      } catch (err) {
        dispatch(setAlertMessage({ alertMessage: serviceError(err) }));
        dispatch(setAlertType({ alertType: 'error' }));
        dispatch(setShowAlert({ showAlert: true }));
        setTimeout(() => {
          dispatch(setShowAlert({ showAlert: false }));
        }, 3000);
      }
      setIsLoading(false);
    };
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, reload]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getRoles();
        if (res.status === 200) {
          const rolesArray = user.roles.split(',').map((name) => name.trim());
          const filteredPeople = res.data.data.filter((role) => !rolesArray.includes(role.name));
          setRoles(filteredPeople);
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (fetchRoles) {
      fetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchRoles]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getUserRoles(id);
        if (res.status === 200) {
          setUserRoles(res.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, reload]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getDocuments(id, 'user');
        if (res.status === 200) {
          setDocuments(res.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, reload]);

  const handleOpenRoleModal = () => {
    setOpenRoleModal(true);
  };

  const handleOpenRemoveRoleModal = () => {
    setOpenRemoveRoleModal(true);
  };

  const handleCloseRemoveRoleModal = () => {
    setOpenRemoveRoleModal(false);
  };

  const handleCloseRoleModal = () => {
    setOpenRoleModal(false);
  };

  const handleOpenStatusModal = () => {
    setOpenStatusModal(true);
  };

  const handleCloseStatusModal = () => {
    setOpenStatusModal(false);
  };

  const handleOpenVerifyModal = () => {
    setOpenVerifyModal(true);
  };

  const handleCloseVerifyModal = () => {
    setOpenVerifyModal(false);
  };

  const handleAddUserToRole = async () => {
    setIsSubmitting(true);
    try {
      if (role !== '') {
        const payload = {
          userId: user.id,
          roleId: role
        };

        const result = await addUserToRole(payload);
        if (result.status === 200) {
          dispatch(setAlertMessage({ alertMessage: 'User added to Role' }));
          dispatch(setAlertType({ alertType: 'success' }));
          dispatch(setShowAlert({ showAlert: true }));
          setTimeout(() => {
            dispatch(setShowAlert({ showAlert: false }));
          }, 3000);
          setRole('');
          setReload((prev) => !prev);
          handleCloseRoleModal();
        }
      }
    } catch (err) {
      dispatch(setAlertMessage({ alertMessage: serviceError(err) }));
      dispatch(setAlertType({ alertType: 'error' }));
      dispatch(setShowAlert({ showAlert: true }));
      setTimeout(() => {
        dispatch(setShowAlert({ showAlert: false }));
      }, 3000);
    }
    setIsSubmitting(false);
  };

  const handleRemoveUserFromRole = async () => {
    setIsSubmitting(true);
    try {
      if (userRole !== '') {
        const result = await removeUserFromRole(userRole);
        if (result.status === 204) {
          dispatch(setAlertMessage({ alertMessage: 'User removed from Role' }));
          dispatch(setAlertType({ alertType: 'success' }));
          dispatch(setShowAlert({ showAlert: true }));
          setTimeout(() => {
            dispatch(setShowAlert({ showAlert: false }));
          }, 3000);
          setReload((prev) => !prev);
          setUserRole('');
          handleCloseRemoveRoleModal();
        }
      }
    } catch (err) {
      dispatch(setAlertMessage({ alertMessage: serviceError(err) }));
      dispatch(setAlertType({ alertType: 'error' }));
      dispatch(setShowAlert({ showAlert: true }));
      setTimeout(() => {
        dispatch(setShowAlert({ showAlert: false }));
      }, 3000);
    }
    setIsSubmitting(false);
  };

  const handleUserStatusUpdate = async () => {
    setIsSubmitting(true);
    try {
      if (status !== '') {
        const payload = {
          userId: id,
          status: status
        };
        const result = await updateUserStatus(payload);
        if (result.status === 200) {
          dispatch(setAlertMessage({ alertMessage: 'User Status Updated' }));
          dispatch(setAlertType({ alertType: 'success' }));
          dispatch(setShowAlert({ showAlert: true }));
          setTimeout(() => {
            dispatch(setShowAlert({ showAlert: false }));
          }, 3000);
          setReload((prev) => !prev);
          setStatus('');
          handleCloseStatusModal();
        }
      }
    } catch (err) {
      dispatch(setAlertMessage({ alertMessage: serviceError(err) }));
      dispatch(setAlertType({ alertType: 'error' }));
      dispatch(setShowAlert({ showAlert: true }));
      setTimeout(() => {
        dispatch(setShowAlert({ showAlert: false }));
      }, 3000);
    }
    setIsSubmitting(false);
  };

  const handleVerification = async () => {
    setIsSubmitting(true);
    try {
      if (medium.length > 0) {
        const payload = {
          userId: id,
          medium: medium
        };
        const result = await userVerification(payload);
        if (result.status === 200) {
          dispatch(setAlertMessage({ alertMessage: 'User Verification Updated' }));
          dispatch(setAlertType({ alertType: 'success' }));
          dispatch(setShowAlert({ showAlert: true }));
          setTimeout(() => {
            dispatch(setShowAlert({ showAlert: false }));
          }, 3000);
          setReload((prev) => !prev);
          setMedium([]);
          handleCloseVerifyModal();
        }
      }
    } catch (err) {
      dispatch(setAlertMessage({ alertMessage: serviceError(err) }));
      dispatch(setAlertType({ alertType: 'error' }));
      dispatch(setShowAlert({ showAlert: true }));
      setTimeout(() => {
        dispatch(setShowAlert({ showAlert: false }));
      }, 3000);
    }
    setIsSubmitting(false);
  };

  const handleVerificationSelect = (event) => {
    const {
      target: { value }
    } = event;
    setMedium(typeof value === 'string' ? value.split(',') : value);
  };

  const handleDocumentStatus = async (id, status) => {
    setIsSubmittingDoc(true);
    try {
      const result = await updateDocumentStatus(id, status);
      if (result.status === 200) {
        dispatch(setAlertMessage({ alertMessage: `Document ${status ? 'Approved' : 'Denied'}` }));
        dispatch(setAlertType({ alertType: 'success' }));
        dispatch(setShowAlert({ showAlert: true }));
        setTimeout(() => {
          dispatch(setShowAlert({ showAlert: false }));
        }, 3000);
        setReload((prev) => !prev);
        setMedium([]);
        handleCloseVerifyModal();
      }
    } catch (err) {
      dispatch(setAlertMessage({ alertMessage: serviceError(err) }));
      dispatch(setAlertType({ alertType: 'error' }));
      dispatch(setShowAlert({ showAlert: true }));
      setTimeout(() => {
        dispatch(setShowAlert({ showAlert: false }));
      }, 3000);
    }
    setIsSubmittingDoc(false);
  };
  //   const handleRoleNameDisplay = (value) => {
  //     if (value === '' || roles.length < 1) {
  //       return '';
  //     }
  //     console.log(roles.find((x) => x.id === value));
  //     return '';
  //   };
  //   console.log(role);
  return (
    <MainCard title="User Details">
      {isLoading ? (
        <PageLoader />
      ) : (
        <Details>
          <Content>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
              <ProfileAvatar alt="Profile Picture" src={user.dpUrl} />
              <Typography component="h5" variant="h5">
                {capitalizeFirstLetter(user.name)}
              </Typography>
            </div>
            <Typography variant="subtitle1" color="textSecondary">
              {user.roles}
            </Typography>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={handleTabChange}>
                  <Tab label="Details" />
                  <Tab label="Verification Documents" />
                </Tabs>
              </Box>
              {tabValue === 0 && (
                <>
                  <Grid container alignItems="center" justifyContent="space-between" sx={{ mt: 2 }}>
                    <Grid item xs={12} md={12} lg={6} sx={{ mb: 2 }}>
                      <Typography variant="body1">
                        <b>Email:</b>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={12} lg={6} sx={{ mb: 2 }}>
                      <Typography variant="body1">{nullStringCheck(user.email, 'N/A')}</Typography>
                    </Grid>

                    <Grid item xs={12} md={12} lg={6} sx={{ mb: 2 }}>
                      <Typography variant="body1">
                        <b>Phone Number:</b>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={12} lg={6} sx={{ mb: 2 }}>
                      <Typography variant="body1">{nullStringCheck(user.phoneNumber, 'N/A')}</Typography>
                    </Grid>

                    <Grid item xs={12} md={12} lg={6} sx={{ mb: 2 }}>
                      <Typography variant="body1">
                        <b>Date of Birth:</b>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={12} lg={6} sx={{ mb: 2 }}>
                      <Typography variant="body1">{user.dob ? dateConverter(user.dob) : 'N/A'}</Typography>
                    </Grid>

                    <Grid item xs={12} md={12} lg={6} sx={{ mb: 2 }}>
                      <Typography variant="body1">
                        <b>Address:</b>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={12} lg={6} sx={{ mb: 2 }}>
                      <Typography variant="body1">{nullStringCheck(user.address, 'N/A')}</Typography>
                    </Grid>

                    <Grid item xs={12} md={12} lg={6} sx={{ mb: 2 }}>
                      <Typography variant="body1">
                        <b>City:</b>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={12} lg={6} sx={{ mb: 2 }}>
                      <Typography variant="body1">{nullStringCheck(user.city, 'N/A')}</Typography>
                    </Grid>

                    <Grid item xs={12} md={12} lg={6} sx={{ mb: 2 }}>
                      <Typography variant="body1">
                        <b>State:</b>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={12} lg={6} sx={{ mb: 2 }}>
                      <Typography variant="body1">{nullStringCheck(user.state, 'N/A')}</Typography>
                    </Grid>

                    <Grid item xs={12} md={12} lg={6} sx={{ mb: 2 }}>
                      <Typography variant="body1">
                        <b>Country:</b>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={12} lg={6} sx={{ mb: 2 }}>
                      <Typography variant="body1">{nullStringCheck(user.country, 'N/A')}</Typography>
                    </Grid>

                    <Grid item xs={12} md={12} lg={6} sx={{ mb: 2 }}>
                      <Typography variant="body1">
                        <b>Status:</b>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={12} lg={6} sx={{ mb: 2 }}>
                      <Typography variant="body1">{capitalizeFirstLetter(user.status)}</Typography>
                    </Grid>

                    <Grid item xs={12} md={12} lg={6} sx={{ mb: 2 }}>
                      <Typography variant="body1">
                        <b>Whatsapp Number:</b>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={12} lg={6} sx={{ mb: 2 }}>
                      <Typography variant="body1">{nullStringCheck(user.whatsappNumber, 'N/A')}</Typography>
                    </Grid>

                    <Grid item xs={12} md={12} lg={6} sx={{ mb: 2 }}>
                      <Typography variant="body1">
                        <b>Verified?:</b>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={12} lg={6} sx={{ mb: 2 }}>
                      <Typography variant="body1">{user.isVerified ? 'Verified' : 'Unverified'}</Typography>
                    </Grid>

                    <Grid item xs={12} md={12} lg={6} sx={{ mb: 2 }}>
                      <Typography variant="body1">
                        <b>Email Verified?:</b>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={12} lg={6} sx={{ mb: 2 }}>
                      <Typography variant="body1">{user.isEmailVerified ? 'Verified' : 'Unverified'}</Typography>
                    </Grid>

                    <Grid item xs={12} md={12} lg={6} sx={{ mb: 2 }}>
                      <Typography variant="body1">
                        <b>Phone Number Verified?:</b>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={12} lg={6} sx={{ mb: 2 }}>
                      <Typography variant="body1">{user.isPhoneNumberVerified ? 'Verified' : 'Unverified'}</Typography>
                    </Grid>

                    <Grid item xs={12} md={12} lg={6} sx={{ mb: 2 }}>
                      <Typography variant="body1">
                        <b>Availability:</b>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={12} lg={6} sx={{ mb: 2 }}>
                      <Typography variant="body1">{user.isAvailable ? 'Available' : 'Unavailable'}</Typography>
                    </Grid>
                  </Grid>
                  <Grid alignItems="center" justifyContent="space-between">
                    <Button variant="contained" color="primary" onClick={handleOpenRoleModal} sx={{ mr: 1 }}>
                      Add User to Role
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleOpenRemoveRoleModal} sx={{ mr: 1 }}>
                      Remove User from Role
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleOpenStatusModal} sx={{ mr: 1 }}>
                      Change Status
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleOpenVerifyModal} sx={{ mr: 1 }}>
                      Verify User
                    </Button>
                  </Grid>
                </>
              )}
              {tabValue === 1 && (
                <>
                  <Grid container alignItems="center" justifyContent="space-between" sx={{ mt: 2 }}>
                    <Grid item xs={12} md={12} lg={12}>
                      <ImageList>
                        {documents.map((item) => (
                          <ImageListItem key={item.id} rows={1} cols={1} sx={{ width: '250px', height: '150px', m: 1 }}>
                            <img
                              srcSet={`${item.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                              src={`${item.url}?w=248&fit=crop&auto=format`}
                              alt={item.fileType}
                              loading="lazy"
                            />
                            <ImageListItemBar
                              title={item.fileType}
                              subtitle={
                                <a target="_blank" href={item.url} rel="noreferrer">
                                  View
                                </a>
                              }
                              position="below"
                            />
                            <ImageListItemBar
                              title={<Typography>Document Number: {item.fileNo}</Typography>}
                              subtitle={
                                <Typography>
                                  Status: {item.isApproved === null ? 'PENDING' : item.isApproved ? 'APPROVED' : 'DENIED'}
                                </Typography>
                              }
                              position="below"
                            />
                            {item.isApproved === null && (
                              <ImageListItemBar
                                title={
                                  <Button
                                    variant="contained"
                                    fullWidth
                                    disabled={isSubmittingDoc}
                                    size="small"
                                    type="submit"
                                    color="primary"
                                    onClick={() => handleDocumentStatus(item.id, true)}
                                    sx={{ mb: 1 }}
                                  >
                                    Approve
                                  </Button>
                                }
                                subtitle={
                                  <Button
                                    variant="contained"
                                    fullWidth
                                    disabled={isSubmittingDoc}
                                    size="small"
                                    type="submit"
                                    color="error"
                                    onClick={() => handleDocumentStatus(item.id, true)}
                                  >
                                    Deny
                                  </Button>
                                }
                                position="below"
                              />
                            )}
                          </ImageListItem>
                        ))}
                      </ImageList>
                    </Grid>
                  </Grid>
                </>
              )}
            </Box>
          </Content>
        </Details>
      )}
      <CustomModal open={openRoleModal} handleClose={handleCloseRoleModal} title="Add User to Role">
        <Grid item xs={12} sm={6} sx={{ mt: 2, mb: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Roles</InputLabel>
            <Select value={role} onChange={(e) => setRole(e.target.value)}>
              {roles.map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  {role.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            disabled={isSubmitting}
            fullWidth
            size="large"
            type="submit"
            color="primary"
            onClick={handleAddUserToRole}
          >
            Submit
          </Button>
        </Grid>
      </CustomModal>
      <CustomModal open={openRemoveRoleModal} handleClose={handleCloseRemoveRoleModal} title="Remove User From Role">
        <Grid item xs={12} sm={6} sx={{ mt: 2, mb: 2 }}>
          <FormControl fullWidth>
            <InputLabel>User Roles</InputLabel>
            <Select value={userRole} onChange={(e) => setUserRole(e.target.value)}>
              {userRoles.map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  {role.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            disabled={isSubmitting}
            fullWidth
            size="large"
            type="submit"
            color="primary"
            onClick={handleRemoveUserFromRole}
          >
            Submit
          </Button>
        </Grid>
      </CustomModal>
      <CustomModal open={openStatusModal} handleClose={handleCloseStatusModal} title="Manage User Status">
        <Grid item xs={12} sm={6} sx={{ mt: 2, mb: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="banned">Banned</MenuItem>
              <MenuItem value="deleted">Deleted</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            disabled={isSubmitting}
            fullWidth
            size="large"
            type="submit"
            color="primary"
            onClick={handleUserStatusUpdate}
          >
            Submit
          </Button>
        </Grid>
      </CustomModal>
      <CustomModal open={openVerifyModal} handleClose={handleCloseVerifyModal} title="User Verification">
        <Grid item xs={12} sm={6} sx={{ mt: 2, mb: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Verify?</InputLabel>
            <Select
              value={medium}
              multiple
              onChange={handleVerificationSelect}
              renderValue={(selected) => (
                <div>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </div>
              )}
            >
              <MenuItem value="kyc">KYC</MenuItem>
              <MenuItem value="email">Email</MenuItem>
              <MenuItem value="phoneNumber">Phone Number</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            disabled={isSubmitting}
            fullWidth
            size="large"
            type="submit"
            color="primary"
            onClick={handleVerification}
          >
            Submit
          </Button>
        </Grid>
      </CustomModal>
    </MainCard>
  );
};

export default UserDetail;
