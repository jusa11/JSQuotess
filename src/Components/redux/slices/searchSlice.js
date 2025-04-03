import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { URL, SEARCH } from '../../../config';

const initialState = {
  query: '',
  type: 'all',
  results: [],
  status: 'idle',
  hasMore: true,
  isChoosed: false,
  page: 1,
  error: null,
};

export const fetchSearch = createAsyncThunk(
  'search/fetchSearch',
  async ({ query, type, username, page }) => {
    const res = await axios.get(`${URL}${SEARCH}`, {
      params: { query, type, username, page },
    });

    return res.data;
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    setResult: (state, action) => {
      state.results = action.payload;
    },
    setChoosedSearch: (state, action) => {
      state.isChoosed = action.payload;
    },
    setReset: (state) => {
      state.query = '';
      state.results = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearch.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchSearch.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
    builder.addCase(fetchSearch.fulfilled, (state, action) => {
      state.status = 'success';
      state.status = 'success';
      state.results =
        action.meta.arg.page === 1
          ? action.payload.quotes
          : [...state.results, ...action.payload.quotes];
      state.hasMore = action.payload.hasMore;
      state.page = action.meta.arg.page + 1; 
      state.hasMore = action.payload.hasMore;
      state.page += 1;
    });
  },
});

export const { setQuery, setType, setResult, setReset, setChoosedSearch } =
  searchSlice.actions;

export const selectQuery = (state) => state.search.query;
export const selectType = (state) => state.search.type;
export const selectResults = (state) => state.search.results;
export const selectStatus = (state) => state.search.status;
export const selectPage = (state) => state.search.page;
export const selectHasMore = (state) => state.search.hasMore;
export const selectChosedSearch = (state) => state.search.isChoosed;
export const selectError = (state) => state.search.error;

export default searchSlice.reducer;
