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
  TablePagination
} from '@mui/material';
import { serviceError, stableSort, getComparator } from 'utils/helper';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { setShowAlert, setAlertType, setAlertMessage } from 'store/reducers/alert';
import { useDispatch } from 'react-redux';
import PageLoader from 'components/PageLoader';
import CustomModal from 'components/CustomModal';

import { addSkill, deleteSkillById, editSkill, getSkills } from 'services/skillService';
import CustomDeleteDialog from 'components/CustomDeleteDialog';

// ==============================|| SAMPLE PAGE ||============================== //

const headCells = [
  {
    id: 'id',
    align: 'center',
    disablePadding: false,
    label: 'S/N'
  },
  {
    id: 'name',
    align: 'center',
    disablePadding: true,
    label: 'Name'
  },
  {
    id: 'id',
    align: 'center',
    disablePadding: true,
    label: 'Action'
  }
];

function SkillTableHead({ order, orderBy }) {
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

SkillTableHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string
};

function SkillTableRow({ skills, order, orderBy, handleEdit, handleDelete }) {
  const [selected] = useState([]);

  const isSelected = (name) => selected.indexOf(name) !== -1;
  return (
    <>
      {skills &&
        skills.length > 0 &&
        stableSort(skills, getComparator(order, orderBy)).map((row, index) => {
          const isItemSelected = isSelected(row.name);
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
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">
                <Button variant="contained" color="primary" sx={{ mr: 1 }} onClick={() => handleEdit(row.id, row.name)}>
                  Edit
                </Button>
                <Button variant="contained" color="error" onClick={() => handleDelete(row.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
    </>
  );
}

SkillTableRow.propTypes = {
  skills: PropTypes.array,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func
};

const Skills = () => {
  const dispatch = useDispatch();
  const [skills, setSkills] = useState([]);
  const [skill, setSkill] = useState('');
  const [skillId, setSkillId] = useState(0);
  const [openDelete, setOpenDelete] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCloseCreateModal = () => {
    setOpenCreate(false);
    setSkill('');
  };

  const handleOpenCreateModal = () => {
    setOpenCreate(true);
  };

  const handleCloseEditModal = () => {
    setOpenEdit(false);
    setSkill('');
    setSkillId(0);
  };

  const handleOpenEditModal = (id, name) => {
    setOpenEdit(true);
    setSkill(name);
    setSkillId(id);
  };

  const handleDeleteDialog = (id) => {
    setSkillId(id);
    setOpenDelete(true);
  };

  const handleCloseDeleteDialog = () => {
    setSkillId(0);
    setOpenDelete(false);
  };

  const [order] = useState('asc');
  const [orderBy] = useState('name');
  const isLgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(true);

  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [query, setQuery] = useState('');

  const fetchSkills = async (pg = page, ppg = perPage, q = query) => {
    setIsLoading(true);
    try {
      const res = await getSkills(pg, ppg, q);
      if (res.status === 200) {
        setPage(res.data.data.currentPage);
        setCount(res.data.data.totalData);
        setPerPage(parseInt(res.data.data.pageLimit, 10));
        setSkills(res.data.data.data);
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
    fetchSkills();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload, query]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    fetchSkills(newPage, perPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPerPage(parseInt(event.target.value, 10));
    fetchSkills(page, event.target.value);
  };

  const createSkill = async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        name: skill
      };

      const res = await addSkill(payload);
      if (res.status === 200) {
        dispatch(setAlertMessage({ alertMessage: 'Skill added Successfully' }));
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

  const updateSkill = async () => {
    try {
      const payload = {
        name: skill
      };

      const res = await editSkill(skillId, payload);
      if (res.status === 200) {
        dispatch(setAlertMessage({ alertMessage: 'Skill Updated Successfully' }));
        dispatch(setAlertType({ alertType: 'success' }));
        dispatch(setShowAlert({ showAlert: true }));
        setTimeout(() => {
          dispatch(setShowAlert({ showAlert: false }));
        }, 3000);
        setReload((prev) => !prev);
        handleCloseEditModal();
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

  const deleteSkill = async () => {
    try {
      const res = await deleteSkillById(skillId);
      if (res.status === 200) {
        dispatch(setAlertMessage({ alertMessage: 'Skill Deleted Successfully' }));
        dispatch(setAlertType({ alertType: 'success' }));
        dispatch(setShowAlert({ showAlert: true }));
        setTimeout(() => {
          dispatch(setShowAlert({ showAlert: false }));
        }, 3000);
        setReload((prev) => !prev);
        handleCloseDeleteDialog();
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
            <Button variant="contained" color="primary" onClick={handleOpenCreateModal}>
              Create Skill
            </Button>
          </Grid>
          <Grid item />
        </Grid>
      </Grid>
      {isLoading ? (
        <Grid item xs={12} md={12} lg={12}>
          <PageLoader />
        </Grid>
      ) : (
        <CustomTable TableHead={SkillTableHead} order={order} orderBy={orderBy}>
          <SkillTableRow
            skills={skills}
            order={order}
            orderBy={orderBy}
            handleEdit={handleOpenEditModal}
            handleDelete={handleDeleteDialog}
          />
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
      <CustomModal open={openCreate} handleClose={handleCloseCreateModal} title="Create Skill">
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ mt: 2, mb: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Skill</InputLabel>
            <OutlinedInput
              type="text"
              name="name"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              placeholder="Skill"
              fullWidth={isLgUp ? false : true}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" disabled={isSubmitting} fullWidth size="large" type="submit" color="primary" onClick={createSkill}>
            Submit
          </Button>
        </Grid>
      </CustomModal>
      <CustomModal open={openEdit} handleClose={handleCloseEditModal} title="Edit Skill">
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ mt: 2, mb: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Edit Skill</InputLabel>
            <OutlinedInput
              type="text"
              name="name"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              placeholder="Skill"
              fullWidth={isLgUp ? false : true}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" disabled={isSubmitting} fullWidth size="large" type="submit" color="primary" onClick={updateSkill}>
            Submit
          </Button>
        </Grid>
      </CustomModal>
      <CustomDeleteDialog open={openDelete} onClose={handleCloseDeleteDialog} maxWidth="xs" action={deleteSkill} />
    </Grid>
  );
};

export default Skills;
