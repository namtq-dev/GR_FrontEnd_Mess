import { createSlice } from '@reduxjs/toolkit';

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
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
