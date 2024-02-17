// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
  profile: {},
  roles: []
};

// ==============================|| SLICE - User ||============================== //

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    currentProfile(state, action) {
      state.profile = action.payload.profile;
    },

    currentRoles(state, action) {
      state.roles = action.payload.roles;
    }
  }
});

export default user.reducer;

export const { currentProfile, currentRoles } = user.actions;
