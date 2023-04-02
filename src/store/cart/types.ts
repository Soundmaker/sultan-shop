export interface CartItem {
    count: number
    code: string
}

export interface CartSliceState {
    totalPrice: number,
    cartItems: CartItem[]
}
