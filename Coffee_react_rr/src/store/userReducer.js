import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    username : " ",
    email : " ",
    phone: " ",
};

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
    },
    updateUser: (state, action) => {
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.phone = action.payload.phone;
    },
    deleteUser: (state) => {
        state.username = "";
        state.email = "";
        state.phone = "";
    }
  },
});

export const { setUser, updateUser , deleteUser } = userReducer.actions;

export default userReducer;