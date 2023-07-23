import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: '',
  error: '',
  conversations: [],
  activeConversation: {},
  notifications: [],
};

export const getConversations = createAsyncThunk(
  'conversation/all',
  async (loginToken, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getAllConversations`,
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const createOrOpenConversation = createAsyncThunk(
  'conversation/createOrOpen',
  async (values, { rejectWithValue }) => {
    try {
      const { loginToken, receiverId } = values;

      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/conversation`,
        { receiverId },
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setActiveConversation: (state, action) => {
      state.activeConversation = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getConversations.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getConversations.fulfilled, (state, action) => {
        state.status = 'success';
        state.conversations = action.payload;
      })
      .addCase(getConversations.rejected, (state, action) => {
        state.status = 'fail';
        state.error = action.payload;
      })
      .addCase(createOrOpenConversation.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(createOrOpenConversation.fulfilled, (state, action) => {
        state.status = 'success';
        state.activeConversation = action.payload;
      })
      .addCase(createOrOpenConversation.rejected, (state, action) => {
        state.status = 'fail';
        state.error = action.payload;
      });
  },
});

export const { setActiveConversation } = chatSlice.actions;

export default chatSlice.reducer;
