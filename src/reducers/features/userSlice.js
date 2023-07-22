import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: '',
  error: '',
  user: {
    id: '',
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    picture: '',
    status: '',
    loginToken: '',
  },
};

export const registerUser = createAsyncThunk(
  'register',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/register`,
        {
          ...values,
        }
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.status = '';
      state.error = '';
      state.user = {
        id: '',
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        picture: '',
        status: '',
        loginToken: '',
      };
    },
    changeStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'success';
        state.error = '';
        const { message, ...rest } = action.payload;
        state.user = rest;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'fail';
        state.error = action.payload;
      });
  },
});

export const { logout, changeStatus } = userSlice.actions;

export default userSlice.reducer;
