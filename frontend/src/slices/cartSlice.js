import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

//we store the cart items in local storage, so first check local storage
const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : {
      cartItems: [],
      itemsPrice: 0.0,
      taxPrice: 0.0,
      shippingPrice: 0.0,
      totalPrice: 0.0,
    };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //action
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((i) => item._id === i._id);
      //updates quantity
      if (existItem) {
        state.cartItems = state.cartItems.map((i) =>
          i._id === existItem._id ? item : i
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      //updates shipping, tax, price
     return updateCart(state);
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
