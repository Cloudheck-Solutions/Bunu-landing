// material-ui

// project import
import MainCard from 'components/MainCard';
import { Box, Tab, Tabs } from '@mui/material';
import { useState, useEffect } from 'react';
import { setShowAlert, setAlertType, setAlertMessage } from 'store/reducers/alert';
import { useDispatch } from 'react-redux';
import { allAdminUsers, allOrganizationAdminUsers } from 'services/userService';
import UserTab from 'pages/users/UserTab';

// ==============================|| Admin Users ||============================== //

const AdminUsers = () => {
  const [tabValue, setTabValue] = useState(0);

  const [oPage, setOPage] = useState(0);
  const [oCount, setOCount] = useState(0);
  const [oPerPage, setOPerPage] = useState(10);
  const [oQuery, setOQuery] = useState('');

  const [aPage, setAPage] = useState(0);
  const [aCount, setACount] = useState(0);
  const [aPerPage, setAPerPage] = useState(10);
  const [aQuery, setAQuery] = useState('');

  const [isLoadingAdmin, setIsLoadingAdmin] = useState(true);
  const [isLoadingOrganizationAdmin, setIsLoadingOrganizationAdmin] = useState(true);

  const [adminUser, setAdminUsers] = useState([]);
  const [organizationAdminUser, setOrganizationAdminUsers] = useState([]);
  const dispatch = useDispatch();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const fetchAdmin = async (pg = aPage, ppg = aPerPage, q = aQuery) => {
    setIsLoadingAdmin(true);
    try {
      const res = await allAdminUsers(pg, ppg, q);
      if (res.status === 200) {
        setAPage(res.data.data.currentPage);
        setACount(res.data.data.totalData);
        setAPerPage(parseInt(res.data.data.pageLimit, 10));
        setAdminUsers(res.data.data.data);
      }
    } catch (err) {
      dispatch(setAlertMessage({ alertMessage: serviceError(err) }));
      dispatch(setAlertType({ alertType: 'error' }));
      dispatch(setShowAlert({ showAlert: true }));
      setTimeout(() => {
        dispatch(setShowAlert({ showAlert: false }));
      }, 3000);
    }
    setIsLoadingAdmin(false);
  };

  const fetchOrganizationAdmin = async (pg = oPage, ppg = oPerPage, q = oQuery) => {
    setIsLoadingOrganizationAdmin(true);
    try {
      const res = await allOrganizationAdminUsers(pg, ppg, q);
      if (res.status === 200) {
        setOPage(res.data.data.currentPage);
        setOCount(res.data.data.totalData);
        setOPerPage(parseInt(res.data.data.pageLimit, 10));
        setOrganizationAdminUsers(res.data.data.data);
      }
    } catch (err) {
      dispatch(setAlertMessage({ alertMessage: serviceError(err) }));
      dispatch(setAlertType({ alertType: 'error' }));
      dispatch(setShowAlert({ showAlert: true }));
      setTimeout(() => {
        dispatch(setShowAlert({ showAlert: false }));
      }, 3000);
    }
    setIsLoadingOrganizationAdmin(false);
  };

  useEffect(() => {
    fetchAdmin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aQuery]);

  useEffect(() => {
    fetchOrganizationAdmin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oQuery]);

  const handleOrganizationAdminChangePage = (event, newPage) => {
    setOPage(newPage);
    fetchOrganizationAdmin(newPage, oPerPage, oQuery);
  };

  const handleAdminChangePage = (event, newPage) => {
    setAPage(newPage);
    fetchOrganizationAdmin(newPage, aPerPage, aQuery);
  };

  const handleOrganizationAdminChangeRowsPerPage = (event) => {
    setOPerPage(parseInt(event.target.value, 10));
    fetchOrganizationAdmin(oPage, event.target.value);
  };

  const handleAdminChangeRowsPerPage = (event) => {
    setAPerPage(parseInt(event.target.value, 10));
    fetchAdmin(aPage, event.target.value);
  };
  console.log(adminUser, organizationAdminUser);
  return (
    <MainCard title="Admin Users">
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Admin" />
            <Tab label="Organization Admin" />
          </Tabs>
        </Box>
        {tabValue === 0 && (
          <UserTab
            users={adminUser}
            isLoading={isLoadingAdmin}
            query={aQuery}
            setQuery={setAQuery}
            count={aCount}
            perPage={aPerPage}
            page={aPage}
            handleChangePage={handleAdminChangePage}
            handleChangeRowsPerPage={handleAdminChangeRowsPerPage}
          />
        )}
        {tabValue === 1 && (
          <UserTab
            users={organizationAdminUser}
            isLoading={isLoadingOrganizationAdmin}
            query={oQuery}
            setQuery={setOQuery}
            count={oCount}
            perPage={oPerPage}
            page={oPage}
            handleChangePage={handleOrganizationAdminChangePage}
            handleChangeRowsPerPage={handleOrganizationAdminChangeRowsPerPage}
          />
        )}
      </Box>
    </MainCard>
  );
};

export default AdminUsers;
