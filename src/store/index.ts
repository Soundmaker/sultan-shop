
import {configureStore} from "@reduxjs/toolkit";
import items from './items/itemsSlice'
import cart from './cart/cartSlice'

export const store  = configureStore({ reducer: {items,cart} })

export type RootState = ReturnType<typeof store.getState>;




