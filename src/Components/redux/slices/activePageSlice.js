import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  page: 'mainPage',
};

const activePageSlice = createSlice({
  name: 'activePage',
  initialState,
  reducers: {
    setActivePage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { setActivePage } = activePageSlice.actions;
export const selectActivePage = (state) => state.activePage.page;
export default activePageSlice.reducer;
