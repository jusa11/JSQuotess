import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const quotesSlice = createSlice({
  name: 'quote',
  initialState,
  reducers: {
    setAddQuote: (state, action) => {
      state.push(action.payload);
    },
    setDeleteQuote: (state, action) => {
      return state.filter((quote) => quote.id !== action.payload);
    },
    setdeleteAllQuote: () => initialState,
  },
});

export const { setAddQuote, setDeleteQuote, setdeleteAllQuote } =
  quotesSlice.actions;

export const selectQuote = (state) => state.quote;

export default quotesSlice.reducer;
