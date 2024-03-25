import { TableHead, TableRow, TableCell, Link, Stack, Typography, Button } from '@mui/material';
import CustomTable from './CustomTable';
import PropTypes from 'prop-types';
import { stableSort, getComparator, nullStringCheck } from 'utils/helper';
import Dot from 'components/@extended/Dot';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';

const headCells = [
  {
    id: 'name',
    align: 'left',
    disablePadding: false,
    label: 'Name'
  },
  {
    id: 'email',
    align: 'left',
    disablePadding: true,
    label: 'Email'
  },
  {
    id: 'phoneNumber',
    align: 'left',
    disablePadding: true,
    label: 'Phone Number'
  },
  {
    id: 'status',
    align: 'right',
    disablePadding: false,
    label: 'Status'
  },
  {
    id: 'roles',
    align: 'left',
    disablePadding: false,
    label: 'Roles'
  },
  {
    id: 'address',
    align: 'left',
    disablePadding: false,
    label: 'Address'
  },
  {
    id: 'isVerified',
    align: 'right',
    disablePadding: false,
    label: 'Verified'
  },
  {
    id: 'id',
    align: 'right',
    disablePadding: false,
    label: 'Action'
  }
];

function UserTableHead({ order, orderBy }) {
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

UserTableHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string
};

const UserTableStatus = ({ status }) => {
  let color;
  let title;

  switch (status) {
    case 'active':
      color = 'success';
      title = 'Active';
      break;
    case 'banned':
      color = 'error';
      title = 'Banned';
      break;
    case 'inactive':
      color = 'warning';
      title = 'Inactive';
      break;
    case 'deleted':
      color = 'error';
      title = 'Deleted';
      break;
    default:
      color = 'warning';
      title = 'Inactive';
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
};

UserTableStatus.propTypes = {
  status: PropTypes.number
};

const UserTableVerified = ({ status }) => {
  let color;
  let title;

  switch (status) {
    case true:
      color = 'success';
      title = 'Verified';
      break;
    case false:
      color = 'error';
      title = 'Unverified';
      break;
    default:
      color = 'error';
      title = 'Unverified';
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
};

UserTableVerified.propTypes = {
  status: PropTypes.bool
};

function UserTableRow({ users, order, orderBy }) {
  const [selected] = useState([]);

  const isSelected = (id) => selected.indexOf(id) !== -1;
  return (
    <>
      {users &&
        users.length > 0 &&
        stableSort(users, getComparator(order, orderBy)).map((row, index) => {
          const isItemSelected = isSelected(row.id);
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
                <Link color="secondary" component={RouterLink} to={`/admin/user/${row.id}`}>
                  {row.name}
                </Link>
              </TableCell>
              <TableCell align="left">{nullStringCheck(row.email)}</TableCell>
              <TableCell align="left">{nullStringCheck(row.phoneNumber)}</TableCell>
              <TableCell align="right">
                <UserTableStatus status={row.status} />
              </TableCell>
              <TableCell align="left">{row.roles}</TableCell>
              <TableCell align="right">{`${nullStringCheck(row.address)} ${nullStringCheck(row.city)} ${nullStringCheck(row.state)} ${nullStringCheck(row.country)}`}</TableCell>
              <TableCell align="right">
                <UserTableVerified status={row.isVerified} />
              </TableCell>
              <TableCell align="right">
                <Button variant="contained" color="primary" component={RouterLink} to={`/admin/user/${row.id}`}>
                  View
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
    </>
  );
}

UserTableRow.propTypes = {
  users: PropTypes.array,
  order: PropTypes.string,
  orderBy: PropTypes.string
};

const CustomUserTable = ({ users }) => {
  const [order] = useState('asc');
  const [orderBy] = useState('date');
  return (
    <CustomTable TableHead={UserTableHead} order={order} orderBy={orderBy}>
      <UserTableRow users={users} order={order} orderBy={orderBy} />
    </CustomTable>
  );
};

CustomUserTable.propTypes = {
  users: PropTypes.array
};

export default CustomUserTable;
