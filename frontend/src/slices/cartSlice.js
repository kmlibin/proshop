import {createSlice} from '@reduxjs/toolkit'

//we store the cart items in local storage, so first check local storage
const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getITem("cart")) : {cartItems: []}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {

    }
})

export default cartSlice.reducer;