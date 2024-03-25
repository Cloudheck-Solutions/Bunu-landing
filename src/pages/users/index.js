// material-ui
import { Box, Tab, Tabs } from '@mui/material';
import { useState, useEffect } from 'react';

// project import
import MainCard from 'components/MainCard';
import { setShowAlert, setAlertType, setAlertMessage } from 'store/reducers/alert';
import { useDispatch } from 'react-redux';
import { allArtisanUsers, allClientUsers } from 'services/userService';
import { serviceError } from 'utils/helper';
import UserTab from './UserTab';

// ==============================|| Users ||============================== //

const Users = () => {
  const [tabValue, setTabValue] = useState(0);

  const [cPage, setCPage] = useState(0);
  const [cCount, setCCount] = useState(0);
  const [cPerPage, setCPerPage] = useState(10);
  const [cQuery, setCQuery] = useState('');

  const [aPage, setAPage] = useState(0);
  const [aCount, setACount] = useState(0);
  const [aPerPage, setAPerPage] = useState(10);
  const [aQuery, setAQuery] = useState('');

  const [isLoadingClient, setIsLoadingClient] = useState(true);
  const [isLoadingArtisan, setIsLoadingArtisan] = useState(true);

  const [clients, setClients] = useState([]);
  const [artisans, setArtisans] = useState([]);

  const dispatch = useDispatch();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const fetchClient = async (pg = cPage, ppg = cPerPage, q = cQuery) => {
    setIsLoadingClient(true);
    try {
      const res = await allClientUsers(pg, ppg, q);
      if (res.status === 200) {
        setCPage(res.data.data.currentPage);
        setCCount(res.data.data.totalData);
        setCPerPage(parseInt(res.data.data.pageLimit, 10));
        setClients(res.data.data.data);
      }
    } catch (err) {
      dispatch(setAlertMessage({ alertMessage: serviceError(err) }));
      dispatch(setAlertType({ alertType: 'error' }));
      dispatch(setShowAlert({ showAlert: true }));
      setTimeout(() => {
        dispatch(setShowAlert({ showAlert: false }));
      }, 3000);
    }
    setIsLoadingClient(false);
  };

  const fetchArtisan = async (pg = aPage, ppg = aPerPage, q = aQuery) => {
    setIsLoadingArtisan(true);
    try {
      const res = await allArtisanUsers(pg, ppg, q);
      if (res.status === 200) {
        setAPage(res.data.data.currentPage);
        setACount(res.data.data.totalData);
        setAPerPage(parseInt(res.data.data.pageLimit, 10));
        setArtisans(res.data.data.data);
      }
    } catch (err) {
      dispatch(setAlertMessage({ alertMessage: serviceError(err) }));
      dispatch(setAlertType({ alertType: 'error' }));
      dispatch(setShowAlert({ showAlert: true }));
      setTimeout(() => {
        dispatch(setShowAlert({ showAlert: false }));
      }, 3000);
    }
    setIsLoadingArtisan(false);
  };

  const handleClientChangePage = (event, newPage) => {
    setCPage(newPage);
    fetchClient(newPage, cPerPage, cQuery);
  };

  const handleArtisanChangePage = (event, newPage) => {
    setAPage(newPage);
    fetchArtisan(newPage, aPerPage, aQuery);
  };

  const handleClientChangeRowsPerPage = (event) => {
    setCPerPage(parseInt(event.target.value, 10));
    fetchClient(cPage, event.target.value);
  };

  const handleArtisanChangeRowsPerPage = (event) => {
    setAPerPage(parseInt(event.target.value, 10));
    fetchArtisan(aPage, event.target.value);
  };

  useEffect(() => {
    fetchClient();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cQuery]);

  useEffect(() => {
    fetchArtisan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aQuery]);

  return (
    <MainCard title="Users">
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Client" />
            <Tab label="Artisan" />
          </Tabs>
        </Box>
        {tabValue === 0 && (
          <UserTab
            users={clients}
            isLoading={isLoadingClient}
            query={cQuery}
            setQuery={setCQuery}
            count={cCount}
            perPage={cPerPage}
            page={cPage}
            handleChangePage={handleClientChangePage}
            handleChangeRowsPerPage={handleClientChangeRowsPerPage}
          />
        )}
        {tabValue === 1 && (
          <UserTab
            users={artisans}
            isLoading={isLoadingArtisan}
            query={aQuery}
            setQuery={setAQuery}
            count={aCount}
            perPage={aPerPage}
            page={aPage}
            handleChangePage={handleArtisanChangePage}
            handleChangeRowsPerPage={handleArtisanChangeRowsPerPage}
          />
        )}
      </Box>
    </MainCard>
  );
};

export default Users;
