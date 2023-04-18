import React from 'react';
import styles from './Header.module.css'
import HeaderMobile from "./HeaderMobile";
import HeaderMain from "./HeaderMain";
import {useSelector} from "react-redux";
import {selectCart} from '../../store/cart/selectors';
import {calcCartAmount} from "../../utils/calcCartAmount";


const Header = () => {

    const {totalPrice, cartItems} = useSelector(selectCart);
    const amount = calcCartAmount(cartItems);
    const price = (Math.ceil(totalPrice * 10) / 10);

    return (
        <header className={styles.header}>
            <HeaderMobile amount={amount}/>
            <HeaderMain price={price} amount={amount}/>
        </header>
    );
};

export default Header;
