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
      shippingAddress: {
        address: "",
        city: "",
        zipCode: "",
        country: "",
      },
      paymentMethod: "PayPal",
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
      return updateCart(state, item);
      
    },
    deleteFromCart: (state, action) => {
      //payload is item id we want to delete
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
      //update local storage and prices
      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      return updateCart(state)
    },
    clearCartItems: (state, action) => {
      state.cartItems = [];
      return updateCart(state);
    }
  },
});

export const { addToCart, deleteFromCart, saveShippingAddress, savePaymentMethod, clearCartItems } =
  cartSlice.actions;
export default cartSlice.reducer;
