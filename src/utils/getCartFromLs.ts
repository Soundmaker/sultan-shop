import {calcTotalPrice} from './calcTotalPrice';
import {CartItem} from "../store/cart/types";

export const getCartFromLS = () => {
    const data = localStorage.getItem('cart');

    const cartItems = data ? JSON.parse(data) : []

    const totalPrice = calcTotalPrice(cartItems);

    return {
        cartItems: cartItems as CartItem[],
        totalPrice,
    };
};
