import React, {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectCart} from '../../store/cart/selectors';
import CartItem from "../../components/CartItem/CartItem";
import {Link} from "react-router-dom";
import {CART_ROUTE, CATALOG_ROUTE, SHOP_ROUTE} from '../../utils/consts';
import {clearItems} from "../../store/cart/cartSlice";
import {getCartFromLS} from "../../utils/getCartFromLs";
import styles from "./Cart.module.css";
import {ReactComponent as LeftArrow} from "../../static/leftarrow.svg";
import Modal from "../../components/modals/Modal";

const Cart: FC = () => {
    const dispatch = useDispatch()
    const {totalPrice, cartItems} = useSelector(selectCart);
    const [orderedVisible, setOrderedVisible] = useState(false);

    useEffect(() => {
        getCartFromLS()
    }, [orderedVisible])

    useEffect(() => {
        document.title = `Корзина`;
    }, [])

    if (!cartItems.length) return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "51vh"
        }}>
            <p>Нет товаров в корзине</p>
            <Link style={{textDecoration: "underline", fontWeight: "500"}} to={CATALOG_ROUTE}>Вернуться в каталог</Link>
        </div>
    )

    return (
        <div className={styles.cart}>
            <div className={`${styles.breadcrumbs} ${styles.pc}`}>
                <Link to={SHOP_ROUTE} className={styles.breadcrumb}> Главная </Link>
                <div className={styles.vl}></div>
                <Link to={CART_ROUTE} className={`${styles.breadcrumb} ${styles.active}`}> Корзина </Link>
            </div>
            <div className={`${styles.breadcrumbs} ${styles.mobile}`}>
                <Link to={SHOP_ROUTE} className={styles.breadcrumb}>
                    <div className={styles.arrow}>
                        <LeftArrow/>
                    </div>
                    <span>
            Назад
          </span>
                </Link>
            </div>
            <div className={styles.hl}></div>


            {cartItems.map(i =>
                <div key={i.code} className={styles.cart__items}>
                    <CartItem i={i}/>
                    <div className={styles.hl}></div>
                </div>
            )}

            <div className={styles.buy}>
                <button className={styles.btn__text} onClick={() => setOrderedVisible(true)
                }>
                    Оформить заказ
                </button>
                <strong> {Math.ceil(totalPrice * 10) / 10} &#8376; </strong>
            </div>
            <Modal show={orderedVisible} onHide={() => {
                dispatch(clearItems())
                setOrderedVisible(false)
            }}>
                <h2>Спасибо за заказ</h2>
                <p>Наш менеджер свяжется с вами в ближайшее время</p>
            </Modal>
        </div>
    );
};

export default Cart;
