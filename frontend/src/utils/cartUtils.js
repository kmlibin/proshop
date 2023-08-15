export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};


//updates local storage
export const updateCart = (state) => {
  //calculate all items price...0 is the default for the accumulator. go through each and multiply item.price * qty
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  //calculate shipping price, over 100 it's free, otherwise 10
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
  //calculate tax, 15%
  state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));
  //calculate total price
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  localStorage.setItem("cart", JSON.stringify(state));
  return state
};
