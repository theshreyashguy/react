import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  itemsliked: [],
  username : "",
  email : "",
  phone: "",
  id: ""
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      //if(state.items.filter(item => item.id === action.payload.id).length == 0){state.items.push(action.payload)};
      state.items.push(action.payload);
    },
    removeFromCart: (state, action) => {
      // Find the index of the first item that matches the payload
      const index = state.items.findIndex(item => (
        item.id === action.payload.id &&
        item.name === action.payload.name &&
        item.price === action.payload.price &&
        item.quantity === action.payload.quantity &&
        item.size === action.payload.size
      ));

      // If such an item is found, remove it
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
    removeAllFromCart: (state) => {
      state.items = [];
    },
    addToLiked: (state, action) => {
      if(state.itemsliked.filter(item => item.id === action.payload.id).length == 0){state.itemsliked.push(action.payload);}
    },
    removeFromLikes: (state, action) => {
      state.itemsliked = state.itemsliked.filter(item => (item.id !== action.payload.id));
    },
    switchsnackbar: (state, action) => {
      state.showSnackBar = !state.showSnackBar;
    },
    setUser: (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.id =  action.payload.id; 
    },
    updateUser: (state, action) => {
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.phone = action.payload.phone;
        state.id =  action.payload.id; 
    },
    deleteUser: (state) => {
        state.username = "";
        state.email = "";
        state.phone = "";
        state.id =  ""; 
    }
  },
});

export const { addToCart, removeFromCart ,removeAllFromCart, addToLiked, removeFromLikes, switchsnackbar , setUser , updateUser , deleteUser} = cartSlice.actions;

export default cartSlice.reducer;
