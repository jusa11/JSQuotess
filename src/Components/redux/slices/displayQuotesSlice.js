import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lastQuotes: [],
  popularQuotes: [],
  userQuotes: [],
  isChange: false,
};

const displayQuotesSlice = createSlice({
  name: 'displayQuotes',
  initialState,
  reducers: {
    setLastQuotes: (state, action) => {
      state.lastQuotes = action.payload;
    },
    setQuotesUser: (state, action) => {
      state.userQuotes = action.payload;
    },
    setPopularQuotes: (state, action) => {
      state.popularQuotes = action.payload;
    },
    setAddQuotes: (state, action) => {
      state.lastQuotes = [action.payload, ...state.lastQuotes];
      state.isChange = true;
    },
    resetIsChange: (state) => {
      state.isChange = false;
    },
  },
});

export const {
  setAddQuotes,
  setLastQuotes,
  setPopularQuotes,
  setQuotesUser,
  resetIsChange,
} = displayQuotesSlice.actions;

export const selectDisplayLastQuotes = (state) =>
  state.displayQuotes.lastQuotes;
export const selectDisplayPopularQuotes = (state) =>
  state.displayQuotes.popularQuotes;
export const selectDisplayUserQuotes = (state) =>
  state.displayQuotes.userQuotes;
export const selectDisplayIsChange = (state) => state.displayQuotes.isChange;
export default displayQuotesSlice.reducer;
