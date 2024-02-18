// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
  showAlert: false,
  alertType: 'success',
  alertMessage: ''
};

// ==============================|| SLICE - ALERT ||============================== //

const alert = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setShowAlert(state, action) {
      state.showAlert = action.payload.showAlert;
    },

    setAlertType(state, action) {
      state.alertType = action.payload.alertType;
    },

    setAlertMessage(state, action) {
      state.alertMessage = action.payload.alertMessage;
    }
  }
});

export default alert.reducer;

export const { setShowAlert, setAlertType, setAlertMessage } = alert.actions;
