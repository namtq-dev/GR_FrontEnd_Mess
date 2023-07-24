import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: '',
  error: '',
  conversations: [],
  activeConversation: {},
  messages: [],
  notifications: [],
  files: [],
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

export const getMessages = createAsyncThunk(
  'conversation/messages',
  async (values, { rejectWithValue }) => {
    try {
      const { loginToken, converId } = values;

      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/messages/${converId}`,
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

export const sendMessage = createAsyncThunk(
  'message/send',
  async (values, { rejectWithValue }) => {
    try {
      const { loginToken, message, converId, files } = values;

      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/messages`,
        { message, converId, files },
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
    updateIncomingMessages: (state, action) => {
      // update received message
      let conver = state.activeConversation;
      if (conver._id === action.payload.conversation._id) {
        state.messages = [...state.messages, action.payload];
      }

      // update conversation in side bar
      let newestConversation = {
        ...action.payload.conversation,
        latestMessage: action.payload,
      };
      let newConvers = [...state.conversations].filter(
        (conver) => conver._id !== newestConversation._id
      );
      newConvers.unshift(newestConversation);
      state.conversations = newConvers;
    },
    addFiles: (state, action) => {
      state.files = [...state.files, action.payload];
    },
    clearFiles: (state, action) => {
      state.files = [];
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
        state.files = [];
      })
      .addCase(createOrOpenConversation.rejected, (state, action) => {
        state.status = 'fail';
        state.error = action.payload;
      })
      .addCase(getMessages.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.status = 'success';
        state.messages = action.payload;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.status = 'fail';
        state.error = action.payload;
      })
      .addCase(sendMessage.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.status = 'success';
        state.messages = [...state.messages, action.payload];

        // update conversation in side bar
        let newestConversation = {
          ...action.payload.conversation,
          latestMessage: action.payload,
        };
        let newConvers = [...state.conversations].filter(
          (conver) => conver._id !== newestConversation._id
        );
        newConvers.unshift(newestConversation);
        state.conversations = newConvers;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.status = 'fail';
        state.error = action.payload;
      });
  },
});

export const {
  setActiveConversation,
  updateIncomingMessages,
  addFiles,
  clearFiles,
} = chatSlice.actions;

export default chatSlice.reducer;
