import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const likedQuotesSlice = createSlice({
  name: 'likedQuotes',
  initialState,
  reducers: {
    setLikedQuotes: (state, action) => action.payload,
    toggleLike: (state, action) => {
      const { _id, likes, isLiked } = action.payload;
      const index = state.findIndex((quote) => quote._id === _id);

      if (index === -1) {
        state.push({ _id, likes, isLiked });
      } else {
        state[index].likes = likes; 
        state[index].isLiked = isLiked; 
      }
    },
  },
});

export const { setLikedQuotes, toggleLike } = likedQuotesSlice.actions;
export const selectLikedQuotes = (state) => state.likedQuotes;
export default likedQuotesSlice.reducer;
