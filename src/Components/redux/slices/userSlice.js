import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

export const checkAuth = createAsyncThunk('user/checkAuth', async () => {
  const token = localStorage.getItem('token');

  if (!token) return null;

  if (token) {
    try {
      const decode = jwtDecode(token);

      return {
        username: decode.username,
        userId: decode._id,
        logo: decode.logo,
        isAuth: true,
      };
    } catch (error) {
      console.error(error);
      localStorage.removeItem('token');
      return null;
    }
  }
});

const initialState = {
  username: null,
  userId: null,
  isAuth: false,
  isPopup: false,
  logo: '',
  isLoading: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload.username;

      state.userId = action.payload.userId;
      state.logo = action.payload.logo;
      state.isAuth = true;
      state.isLoading = false;
    },
    logout: (state) => {
      state.username = null;
      state.userId = null;
      state.isAuth = false;
      state.logo = '';
      state.isLoading = false;

      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true; 
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        if (action.payload) {
          state.username = action.payload.username;
          state.userId = action.payload.userId;
          state.logo = action.payload.logo;
          state.isAuth = true;
        } else {
          state.isAuth = false; 
        }
        state.isLoading = false;
      })

      .addCase(checkAuth.rejected, (state) => {
        state.isAuth = false;
        state.isLoading = false; 
      });
  },
});

export const { setUser, logout } = userSlice.actions;
export const selectUser = (state) => state.user;

export default userSlice.reducer;
