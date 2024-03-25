import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import PropTypes from 'prop-types';

const CustomDeleteDialog = ({ maxWidth, open, onClose, action }) => {
  return (
    <Dialog maxWidth={maxWidth} open={open} onClose={onClose}>
      <DialogTitle>Delete Confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to Delete.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button onClick={action} autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CustomDeleteDialog.propTypes = {
  maxWidth: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  action: PropTypes.func
};
export default CustomDeleteDialog;
