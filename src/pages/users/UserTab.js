import PropTypes from 'prop-types';
import { OutlinedInput, useMediaQuery, TablePagination } from '@mui/material';
import { Grid } from '@mui/material';
import CustomUserTable from 'components/CustomUserTable';
import PageLoader from 'components/PageLoader';

const UserTab = ({ users, isLoading, query, setQuery, count, perPage, page, handleChangePage, handleChangeRowsPerPage }) => {
  const isLgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ mt: 2 }}>
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
          <Grid item />
        </Grid>
      </Grid>
      {isLoading ? (
        <Grid item xs={12} md={12} lg={12}>
          <PageLoader />
        </Grid>
      ) : (
        <CustomUserTable users={users} />
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

UserTab.propTypes = {
  users: PropTypes.array,
  isLoading: PropTypes.bool,
  query: PropTypes.string,
  setQuery: PropTypes.func,
  count: PropTypes.number,
  perPage: PropTypes.number,
  page: PropTypes.number,
  handleChangePage: PropTypes.func,
  handleChangeRowsPerPage: PropTypes.func
};

export default UserTab;
