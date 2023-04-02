import React, {useEffect, useState} from 'react';
import styles from './Header.module.css'
import consultant from '../../static/consultant.png'
import logo from '../../static/main-logo.svg';

import {ReactComponent as LensIcon} from '../../static/lens.svg';
import {ReactComponent as CatalogIcon} from '../../static/catalog.svg';
import {ReactComponent as AddressIcon} from '../../static/address.svg';
import {ReactComponent as EmailIcon} from '../../static/email.svg';
import {ReactComponent as DownloadIcon} from '../../static/download.svg';
import {ReactComponent as CartIcon} from '../../static/cart.svg';
import {ReactComponent as HamburgerIcon} from '../../static/hamburger-white.svg';

import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

import {CART_ROUTE, CATALOG_ROUTE, SHOP_ROUTE} from '../../utils/consts';
import {selectCart} from "../../store/cart/selectors";
import {CartItem} from "../../store/cart/types";


const Header = () => {
    const {totalPrice, cartItems} = useSelector(selectCart);
    const dispatch = useDispatch()
    const countAmount = (it: CartItem[]): number => {
        return it.reduce((i, next) => i + next.count, 0)
    }
    const [amount, setAmount] = useState(0)
    const [price, setPrice] = useState(0)

    useEffect(() => {
        setAmount(() => countAmount(cartItems));
        setPrice(() => Math.ceil(totalPrice * 10) / 10)
    }, [dispatch, cartItems, totalPrice])


    return (
        <header className={styles.header}>
            <div className={styles.head}>
                <div className={styles.contact}>

                    <div className={styles.contact__container}>
                        <AddressIcon/>
                        <p>
                            <strong>г.Кокчетав, ул.Ж. Ташенова 129Б</strong><br/>
                            (Рынок Восточный)
                        </p>
                    </div>

                    <div className={styles.contact__container}>
                        <EmailIcon/>
                        <p>
                            <strong>opt.sultan@mail.ru</strong><br/>
                            На связи в любое время
                        </p>

                    </div>
                </div>
                <ul className={styles.navigation}>
                    <li className={styles.navigation__item}>
                        <Link to={"#"}>О компании</Link>
                    </li>

                    <li className={styles.navigation__item}>
                        <Link to={"#"}>Доставка и оплата</Link>
                    </li>

                    <li className={styles.navigation__item}>
                        <Link to={"#"}>Возврат</Link>
                    </li>

                    <li className={styles.navigation__item}>
                        <Link to={"#"}>Контакты</Link>
                    </li>
                </ul>
            </div>

            <nav className={styles.nav}>
                <button className={styles.menu__open}>
                    <HamburgerIcon/>
                </button>

                <Link to={SHOP_ROUTE}>
                    <img src={logo} alt="Logo"/>
                </Link>

                <div className={styles.col}>
                    <Link to={CATALOG_ROUTE} className={`${styles.btn} ${styles.btn__text}`}>
                        <p>Каталог</p>
                        <CatalogIcon/>
                    </Link>
                </div>

                <div className={styles.col}>
                    <input type="text" placeholder={"Поиск..."}/>
                    <button className={`${styles.btn} ${styles.btn__img}`}>
                        <LensIcon/>
                    </button>
                </div>

                <div className={styles.col}>
                    <strong>+7 (777) 490-00-91</strong>
                    <p>время работы: 9:00-20:00</p>
                    <p>Заказать звонок</p>
                </div>

                <div className={`${styles.col} ${styles.nav__img}`}>
                    <img src={consultant} alt="consultant"/>
                </div>

                <div className={styles.col}>
                    <button className={`${styles.btn} ${styles.btn__text}`}>
                        <p>Прайс-лист</p>
                        <DownloadIcon/>
                    </button>
                </div>

                <div className={styles.cart}>
                    <Link to={CART_ROUTE} className={styles.btn__cart}>
                        <CartIcon/>
                        <p className={`${styles.btn} ${styles.btn__indicator}`}>{amount}</p>
                    </Link>

                    <div className={styles.col}>
                        <Link to={CART_ROUTE}>Корзина</Link>
                        <strong>{price} тенге</strong>
                    </div>
                </div>

            </nav>
            <div className={styles.mobile}>
                <div className={styles.mobile__btn}>
                    <Link to={CATALOG_ROUTE} className={styles.mobile__btn}>
                        <CatalogIcon className={styles.mobile__img}/>
                        <p>Каталог</p>
                    </Link>
                </div>

                <div className={styles.mobile__btn}>
                    <Link to={"#"} className={styles.mobile__btn}>
                        <LensIcon className={styles.mobile__img}/>
                        <p>Поиск</p>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;