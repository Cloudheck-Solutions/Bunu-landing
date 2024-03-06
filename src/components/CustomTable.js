// material-ui
import { Grid } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import PropTypes from 'prop-types';

// material-ui
import { Box, Table, TableContainer, TableBody } from '@mui/material';

// ==============================|| Custom Table ||============================== //

const CustomTable = ({ TableHead, children, order, orderBy }) => {
  return (
    <Grid item xs={12} md={12} lg={12}>
      <MainCard sx={{ mt: 2 }} content={false}>
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
              <TableHead order={order} orderBy={orderBy} />
              <TableBody>
                {/* <TableBodyRows payment={payment} order={order} orderBy={orderBy} /> */}
                {children}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </MainCard>
    </Grid>
  );
};

CustomTable.propTypes = {
  TableHead: PropTypes.elementType.isRequired,
  children: PropTypes.node,
  payment: PropTypes.array,
  order: PropTypes.string,
  orderBy: PropTypes.string
};
export default CustomTable;
