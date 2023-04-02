import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { getCartFromLS } from '../../utils/getCartFromLs';
import { CartItem, CartSliceState } from './types';

const initialState: CartSliceState = getCartFromLS();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.cartItems.find((obj) => obj.code === action.payload.code);
      findItem ? findItem.count += action.payload.count : state.cartItems.push({...action.payload})
      state.totalPrice = calcTotalPrice(state.cartItems);
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.cartItems.find((obj) => obj.code === action.payload);
      findItem && findItem.count--
      state.totalPrice = calcTotalPrice(state.cartItems);
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    removeItem(state, action: PayloadAction<string>) {
      state.cartItems = state.cartItems.filter((obj) => obj.code !== action.payload);
      state.totalPrice = calcTotalPrice(state.cartItems);
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    clearItems(state) {
      state.cartItems = [];
      state.totalPrice = 0;
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    setTotalPrice(state){
      state.totalPrice = calcTotalPrice(state.cartItems)
    }
  },
});

export const { addItem, removeItem, minusItem, clearItems, setTotalPrice } = cartSlice.actions;

export default cartSlice.reducer;
