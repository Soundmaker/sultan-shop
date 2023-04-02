import React, {useEffect, useState} from 'react';
import styles from './Header.module.css'
import HeaderMobile from "./HeaderMobile";
import HeaderMain from "./HeaderMain";
import {setTotalPrice} from "../../store/cart/cartSlice";
import {useDispatch, useSelector} from "react-redux";
import {selectCart} from "../../store/cart/selectors";
import {selectItemData} from "../../store/items/selectors";
import {CartItem} from "../../store/cart/types";


const Header = () => {

  const { totalPrice, cartItems } = useSelector(selectCart);
  const { items } = useSelector(selectItemData);
  const dispatch = useDispatch()
  const countAmount = (it: CartItem[]): number => {
    return  it.reduce((i, next) => i+next.count,0)
  }
  const [amount, setAmount] = useState(0)
  const [price, setPrice] = useState(0)

  useEffect(() => {
    setAmount(() => countAmount(cartItems));
    setPrice(() => (Math.ceil(totalPrice*10)/10))
    dispatch(setTotalPrice())
  }, [dispatch, cartItems, totalPrice, items])

  return (
    <header className={styles.header}>
      <HeaderMobile amount={amount}/>

      <HeaderMain price={price} amount={amount}/>
    </header>
  );
};

export default Header;
