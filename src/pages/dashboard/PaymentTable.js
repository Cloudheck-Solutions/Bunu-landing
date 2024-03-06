import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { setShowAlert, setAlertType, setAlertMessage } from 'store/reducers/alert';
import { capitalizeFirstLetter, dateConverter, serviceError, stableSort, getComparator } from 'utils/helper';
import { useDispatch } from 'react-redux';
// material-ui
import { Box, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

// third-party
import { NumericFormat } from 'react-number-format';

// project import
import Dot from 'components/@extended/Dot';
import { recentPayment } from 'services/dashboardService';

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

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

// ==============================|| ORDER TABLE - HEADER ||============================== //

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

// ==============================|| PAYMENT TABLE - STATUS ||============================== //

const PaymentStatus = ({ status }) => {
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

PaymentStatus.propTypes = {
  status: PropTypes.number
};

// ==============================|| ORDER TABLE ||============================== //

export default function PaymentTable() {
  const [order] = useState('asc');
  const [orderBy] = useState('date');
  const [selected] = useState([]);
  const [payments, setPayments] = useState([]);
  const dispatch = useDispatch();

  const isSelected = (date) => selected.indexOf(date) !== -1;

  useEffect(() => {
    const fetchChart = async () => {
      try {
        const res = await recentPayment();
        if (res.status === 200) {
          setPayments(res.data.data);
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
    fetchChart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          sx={{
            '& .MuiTableCell-root:first-of-type': {
              pl: 2
            },
            '& .MuiTableCell-root:last-of-type': {
              pr: 3
            }
          }}
        >
          <PaymentTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {stableSort(payments, getComparator(order, orderBy)).map((row, index) => {
              const isItemSelected = isSelected(row.date);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.date}
                  selected={isItemSelected}
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
                    <PaymentStatus status={row.status} />
                  </TableCell>
                  <TableCell align="right">{capitalizeFirstLetter(row.type)}</TableCell>
                  <TableCell align="right">
                    <NumericFormat value={row.amount} displayType="text" thousandSeparator prefix="₦" />
                  </TableCell>
                  <TableCell align="right">{row.reference}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
