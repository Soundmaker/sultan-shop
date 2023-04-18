import {RootState} from '../index';

export const selectCart = (state: RootState) => state.cart;

export const selectCartItemById = (code: string) => (state: RootState) =>
    state.cart.cartItems.find((obj) => obj.code === code);

