import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showSnackBar: false,
  // text: '',
  // status: 'error', 
  // containerStyle: {},
  // position: 'top',
};

const snackBarReducer = createSlice({
  name: 'snack',
  initialState,
  reducers: {
    SHOW_SNACKBAR: (state, action) => {
      state.showSnackBar = true;
      // state.status = action?.status;
      // state.text =  action?.text;
      // state.position =  action?.position;
      // state.containerStyle =  action?.containerStyle;
    },
    CLOSE_SNACKBAR: (state, action) => {
      state.showSnackBar = false;
      // state.status = 'error';
      // state.text =  '';
      // state.position =  'top';
      // state.containerStyle = {};
    },
  },
});

export const { SHOW_SNACKBAR, CLOSE_SNACKBAR } = snackBarReducer.actions;

export default snackBarReducer;