import { configureStore } from '@reduxjs/toolkit';
import snackBarReducer from './snackBarReducer';

const storer = configureStore({
  reducer: {
    snack: snackBarReducer,
  },
});

export default storer;
