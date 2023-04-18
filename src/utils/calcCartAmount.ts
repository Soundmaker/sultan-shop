import {CartItem} from "../store/cart/types";

export const calcCartAmount = (arr: CartItem[]): number => arr.reduce((a, b: CartItem) => a + b.count, 0)