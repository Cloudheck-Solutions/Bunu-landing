import CustomTable from '../../components/CustomTable';
import {
  TableHead,
  TableRow,
  TableCell,
  OutlinedInput,
  Link,
  Grid,
  InputLabel,
  Button,
  FormControl,
  useMediaQuery,
  TablePagination,
  Autocomplete,
  TextField,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import { serviceError, stableSort, getComparator, dateConverter } from 'utils/helper';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { setShowAlert, setAlertType, setAlertMessage } from 'store/reducers/alert';
import { useDispatch } from 'react-redux';
import PageLoader from 'components/PageLoader';
import CustomModal from 'components/CustomModal';

import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro';
import dayjs from 'dayjs';

import { addNotification, getNotifications } from 'services/notificationService';
import { usersSummary } from 'services/userService';

// ==============================|| Notification PAGE ||============================== //

const headCells = [
  {
    id: 'id',
    align: 'center',
    disablePadding: false,
    label: 'S/N'
  },
  {
    id: 'date',
    align: 'center',
    disablePadding: false,
    label: 'Date'
  },
  {
    id: 'title',
    align: 'center',
    disablePadding: true,
    label: 'Title'
  },
  {
    id: 'recipient',
    align: 'center',
    disablePadding: true,
    label: 'Recipient'
  },
  {
    id: 'body',
    align: 'left',
    disablePadding: true,
    label: 'Body'
  }
];

function NotificationTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

NotificationTableHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string
};

function NotificationTableRow({ notifications, order, orderBy }) {
  const [selected] = useState([]);

  const isSelected = (name) => selected.indexOf(name) !== -1;
  return (
    <>
      {notifications &&
        notifications.length > 0 &&
        stableSort(notifications, getComparator(order, orderBy)).map((row, index) => {
          const isItemSelected = isSelected(row.date);
          const labelId = `enhanced-table-checkbox-${index}`;
          return (
            <TableRow
              hover
              role="checkbox"
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              aria-checked={isItemSelected}
              tabIndex={-1}
              selected={isItemSelected}
              key={index}
            >
              <TableCell component="th" id={labelId} scope="row" align="center">
                <Link color="secondary">{index + 1}</Link>
              </TableCell>
              <TableCell component="th" id={labelId} scope="row" align="center">
                {dateConverter(row.date)}
              </TableCell>
              <TableCell align="center">{row.title}</TableCell>
              <TableCell align="center">{row.recipient}</TableCell>
              <TableCell align="left">{row.body}</TableCell>
            </TableRow>
          );
        })}
    </>
  );
}

NotificationTableRow.propTypes = {
  notifications: PropTypes.array,
  order: PropTypes.string,
  orderBy: PropTypes.string
};

const Notifications = () => {
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState([]);
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [userId, setUserId] = useState(null);
  const [checked, setChecked] = useState(false);

  const [openCreate, setOpenCreate] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCloseCreateModal = () => {
    setOpenCreate(false);
    setUserId(null);
    setTitle('');
    setBody('');
  };

  const handleOpenCreateModal = () => {
    setOpenCreate(true);
  };

  const [order] = useState('asc');
  const [orderBy] = useState('date');

  const [endDate, setEndDate] = useState(dayjs());
  const [startDate, setStartDate] = useState(dayjs().subtract(30, 'day'));

  const isLgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(true);

  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [query, setQuery] = useState('');

  const fetchNotifications = async (sd = startDate, ed = endDate, pg = page, ppg = perPage, q = query) => {
    setIsLoading(true);
    try {
      const res = await getNotifications(sd.format('YYYY-MM-DD'), ed.format('YYYY-MM-DD'), pg, ppg, q);
      if (res.status === 200) {
        setPage(res.data.data.currentPage);
        setCount(res.data.data.totalData);
        setPerPage(parseInt(res.data.data.pageLimit, 10));
        setNotifications(res.data.data.data);
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

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await usersSummary();
        if (res.status === 200) {
          setUsers(res.data.data);
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
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate, reload, query]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    fetchNotifications(newPage, perPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPerPage(parseInt(event.target.value, 10));
    fetchNotifications(page, event.target.value);
  };

  const handleDateChange = (value) => {
    setStartDate(value[0]);
    setEndDate(value[1]);
  };

  const createNotification = async () => {
    setIsSubmitting(true);
    try {
      if (!checked && userId === null) {
        dispatch(setAlertMessage({ alertMessage: 'User is empty' }));
        dispatch(setAlertType({ alertType: 'success' }));
        dispatch(setShowAlert({ showAlert: true }));
        setTimeout(() => {
          dispatch(setShowAlert({ showAlert: false }));
        }, 3000);
        setIsSubmitting(false);
        return;
      }

      if (title === '') {
        dispatch(setAlertMessage({ alertMessage: 'Title is empty' }));
        dispatch(setAlertType({ alertType: 'success' }));
        dispatch(setShowAlert({ showAlert: true }));
        setTimeout(() => {
          dispatch(setShowAlert({ showAlert: false }));
        }, 3000);
        setIsSubmitting(false);
        return;
      }

      if (body === '') {
        dispatch(setAlertMessage({ alertMessage: 'Body is empty' }));
        dispatch(setAlertType({ alertType: 'success' }));
        dispatch(setShowAlert({ showAlert: true }));
        setTimeout(() => {
          dispatch(setShowAlert({ showAlert: false }));
        }, 3000);
        setIsSubmitting(false);
        return;
      }
      const payload = {
        title: title,
        userId: userId,
        body: body
      };

      const res = await addNotification(payload);
      if (res.status === 200) {
        dispatch(setAlertMessage({ alertMessage: 'Notification sent' }));
        dispatch(setAlertType({ alertType: 'success' }));
        dispatch(setShowAlert({ showAlert: true }));
        setTimeout(() => {
          dispatch(setShowAlert({ showAlert: false }));
        }, 3000);
        setReload((prev) => !prev);
        handleCloseCreateModal();
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

  const handleUserSelect = (value) => {
    setUserId(value.id);
  };

  const handleCheck = (event) => {
    if (event.target.checked) {
      setUserId(null);
    }
    setChecked(event.target.checked);
  };

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} md={12} lg={12}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs={12} md={12} lg={6} sx={{ mb: 1 }}>
            <Button variant="contained" color="primary" onClick={handleOpenCreateModal}>
              Send Notification
            </Button>
          </Grid>
          <Grid item />
        </Grid>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs={12} md={12} lg={6} sx={{ mb: 2 }}>
            <OutlinedInput
              type="text"
              name="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              fullWidth={isLgUp ? false : true}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={6} sx={{ mb: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateRangePicker
                onChange={handleDateChange}
                localeText={{ start: 'Start Date', end: 'End Date' }}
                value={[startDate, endDate]}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item />
        </Grid>
      </Grid>
      {isLoading ? (
        <Grid item xs={12} md={12} lg={12}>
          <PageLoader />
        </Grid>
      ) : (
        <CustomTable TableHead={NotificationTableHead} order={order} orderBy={orderBy}>
          <NotificationTableRow notifications={notifications} order={order} orderBy={orderBy} />
        </CustomTable>
      )}
      <Grid item xs={12} md={12} lg={12}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs={12} md={12} lg={6} sx={{ mb: 2 }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              component="div"
              count={count}
              rowsPerPage={perPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Grid>
        </Grid>
      </Grid>
      <CustomModal open={openCreate} handleClose={handleCloseCreateModal} title="Send Notification">
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ mt: 2, mb: 2 }}>
          <FormControl fullWidth>
            <Autocomplete
              options={users}
              disabled={checked}
              getOptionLabel={(option) => option.fullname}
              filterOptions={(options, state) => {
                const inputValue = state.inputValue.trim().toLowerCase();
                const inputRegex = new RegExp(`^${inputValue}`, 'i');
                return options.filter(
                  (option) =>
                    inputRegex.test(option.fullname.toLowerCase()) || (option.email && inputRegex.test(option.email.toLowerCase()))
                );
              }}
              renderInput={(params) => <TextField {...params} label="Users" variant="outlined" />}
              onChange={(event, value) => handleUserSelect(event, value)}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ mt: 2, mb: 2 }}>
          <FormControl fullWidth>
            <FormControlLabel
              control={<Checkbox checked={checked} onChange={handleCheck} inputProps={{ 'aria-label': 'controlled' }} />}
              label="Send to all Users"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ mt: 2, mb: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Title</InputLabel>
            <OutlinedInput
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              fullWidth={isLgUp ? false : true}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ mt: 2, mb: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Body</InputLabel>
            <OutlinedInput
              type="text"
              name="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Body"
              fullWidth={isLgUp ? false : true}
            />
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
            onClick={createNotification}
          >
            Submit
          </Button>
        </Grid>
      </CustomModal>
    </Grid>
  );
};

export default Notifications;
