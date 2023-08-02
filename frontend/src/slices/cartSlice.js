import { createSlice } from "@reduxjs/toolkit";

//we store the cart items in local storage, so first check local storage
const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //action
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((i) => item._id === i._id);
      //updates quantity?
      if (existItem) {
        state.cartItems = state.cartItems.map((i) =>
          i._id === existItem._id ? item : i
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      //calculate all items price...0 is the default for the accumulator. go through each and multiply item.price * qty
      state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );
      //calculate shipping price, over 100 it's free, otherwise 10
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
      //calculate tax, 15%
      state.taxPrice = addDecimals(
        Number((0.15 * state.itemsPrice).toFixed(2))
      );
      //calculate total price
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);

      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
