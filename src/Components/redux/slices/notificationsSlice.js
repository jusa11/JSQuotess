import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  error: '',
  success: '',
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
    clearError: () => initialState,
  },
});

export default notificationsSlice.reducer;

export const { setError, setSuccess, clearError } = notificationsSlice.actions;

export const selectErrorMessage = (state) => state.notifications.error;
export const selectSuccessMessage = (state) => state.notifications.success;
