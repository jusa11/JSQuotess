import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  statsStatus: '',
};

const statsBarSlice = createSlice({
  name: 'statsBar',
  initialState,
  reducers: {
    setStatBar: (state, action) => {
      state.statsStatus = action.payload;
    },
  },
});

export const { setStatBar } = statsBarSlice.actions;
export const selectStatsStatus = (state) => state.statsBar.statsStatus;
export default statsBarSlice.reducer;
