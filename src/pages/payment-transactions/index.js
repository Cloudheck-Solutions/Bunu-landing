// material-ui
import { Grid } from '@mui/material';
import CustomTable from '../../components/CustomTable';
import { TableHead, TableRow, TableCell, OutlinedInput, Link, Stack, Typography, useMediaQuery, TablePagination } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro';
import { capitalizeFirstLetter, dateConverter, serviceError, stableSort, getComparator } from 'utils/helper';

import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

// third-party
import { NumericFormat } from 'react-number-format';

// project import
import Dot from 'components/@extended/Dot';
import { useEffect, useState } from 'react';

import { setShowAlert, setAlertType, setAlertMessage } from 'store/reducers/alert';
import { useDispatch } from 'react-redux';
import { transactions } from 'services/paymentService';
import dayjs from 'dayjs';
import PageLoader from 'components/PageLoader';

// ==============================|| Payment Transaction ||============================== //

const headCells = [
  {
    id: 'date',
    align: 'left',
    disablePadding: false,
    label: 'Date'
  },
  {
    id: 'username',
    align: 'left',
    disablePadding: true,
    label: 'Paid By'
  },
  {
    id: 'channel',
    align: 'left',
    disablePadding: true,
    label: 'Channel'
  },
  {
    id: 'description',
    align: 'right',
    disablePadding: false,
    label: 'Description'
  },
  {
    id: 'status',
    align: 'left',
    disablePadding: false,
    label: 'Status'
  },
  {
    id: 'type',
    align: 'left',
    disablePadding: false,
    label: 'Payment Type'
  },
  {
    id: 'amount',
    align: 'right',
    disablePadding: false,
    label: 'Amount Paid'
  },
  {
    id: 'reference',
    align: 'right',
    disablePadding: false,
    label: 'Reference Number'
  }
];

function PaymentTableHead({ order, orderBy }) {
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

PaymentTableHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string
};

const CustomTableStatus = ({ status }) => {
  let color;
  let title;

  switch (status) {
    case 'success':
      color = 'success';
      title = 'Successful';
      break;
    default:
      color = 'error';
      title = 'Failed';
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
};

CustomTableStatus.propTypes = {
  status: PropTypes.string
};

function PaymentTableRow({ payments, order, orderBy }) {
  const [selected] = useState([]);

  const isSelected = (date) => selected.indexOf(date) !== -1;
  return (
    <>
      {payments &&
        payments.length > 0 &&
        stableSort(payments, getComparator(order, orderBy)).map((row, index) => {
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
              <TableCell component="th" id={labelId} scope="row" align="left">
                <Link color="secondary" component={RouterLink} to="">
                  {dateConverter(row.date)}
                </Link>
              </TableCell>
              <TableCell align="left">{row.username}</TableCell>
              <TableCell align="left">{capitalizeFirstLetter(row.channel)}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="left">
                <CustomTableStatus status={row.status} />
              </TableCell>
              <TableCell align="right">{capitalizeFirstLetter(row.type)}</TableCell>
              <TableCell align="right">
                <NumericFormat value={row.amount} displayType="text" thousandSeparator prefix="₦" />
              </TableCell>
              <TableCell align="right">{row.reference}</TableCell>
            </TableRow>
          );
        })}
    </>
  );
}

PaymentTableRow.propTypes = {
  payments: PropTypes.array,
  order: PropTypes.string,
  orderBy: PropTypes.string
};

const PaymentTransactions = () => {
  const dispatch = useDispatch();
  const [payments, setPayments] = useState([]);
  //   const [isLoading, setIsLoading] = useState(true);

  const [order] = useState('asc');
  const [orderBy] = useState('date');

  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [query, setQuery] = useState('');
  const [endDate, setEndDate] = useState(dayjs());
  const [startDate, setStartDate] = useState(dayjs().subtract(30, 'day'));

  const isLgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  const handleDateChange = (value) => {
    setStartDate(value[0]);
    setEndDate(value[1]);
  };

  const fetchPayments = async (sd = startDate, ed = endDate, pg = page, ppg = perPage, q = query) => {
    setIsLoading(true);
    try {
      const res = await transactions(sd.format('YYYY-MM-DD'), ed.format('YYYY-MM-DD'), pg, ppg, q);
      if (res.status === 200) {
        setPage(res.data.data.currentPage);
        setCount(res.data.data.totalData);
        setPerPage(parseInt(res.data.data.pageLimit, 10));
        setPayments(res.data.data.data);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    fetchPayments(startDate, endDate, newPage, perPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPerPage(parseInt(event.target.value, 10));
    fetchPayments(startDate, endDate, page, event.target.value);
  };

  useEffect(() => {
    fetchPayments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate, query]);

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
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
        <CustomTable TableHead={PaymentTableHead} order={order} orderBy={orderBy}>
          <PaymentTableRow payments={payments} order={order} orderBy={orderBy} />
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
    </Grid>
  );
};

export default PaymentTransactions;
