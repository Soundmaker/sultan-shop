import {CartItem} from '../store/cart/types';
import {getItemsFromAdmin} from "./getItemsFromAdmin";
import ItemsType from "../types/items-type";

export const calcTotalPrice = (cartItems: CartItem[]) => {

    return cartItems.reduce((sum, obj) => {
        const findItem = [...getItemsFromAdmin()].find((item: ItemsType) => {
            return item.code === obj.code
        })
        return findItem ? findItem.price * obj.count + sum : sum
    }, 0);
};
