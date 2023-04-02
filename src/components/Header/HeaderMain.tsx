import React, {FC} from 'react';
import styles from "./Header.module.css";
import {ReactComponent as AddressIcon} from "../../static/address.svg";
import {ReactComponent as EmailIcon} from "../../static/email.svg";
import {Link} from "react-router-dom";
import {ADMIN_ROUTE, CART_ROUTE, CATALOG_ROUTE, SHOP_ROUTE} from "../../utils/consts";
import logo from "../../static/main-logo.svg";
import {ReactComponent as CatalogIcon} from "../../static/catalog.svg";
import {ReactComponent as LensIcon} from "../../static/lens.svg";
import consultant from "../../static/consultant.png";
import {ReactComponent as DownloadIcon} from "../../static/download.svg";
import {ReactComponent as CartIcon} from "../../static/cart.svg";

interface iHeader {
    price: number,
    amount: number
}

const HeaderMain: FC<iHeader> = ({price, amount}) => {

    return (
        <div className={styles.header__pc}>
            <div className={styles.head}>
                <div className={styles.contact}>
                    <div className={styles.contact__container}>
                        <AddressIcon/>
                        <p>
                            <strong>г.Кокчетав, ул.Ж. Ташенова 129Б</strong><br/>
                            (Рынок Восточный)
                        </p>
                    </div>
                    <div className={styles.vl}></div>
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
                    <div className={styles.vl}></div>
                    <li className={styles.navigation__item}>
                        <Link to={"#"}>Доставка и оплата</Link>
                    </li>
                    <div className={styles.vl}></div>
                    <li className={styles.navigation__item}>
                        <Link to={"#"}>Возврат</Link>
                    </li>
                    <div className={styles.vl}></div>
                    <li className={styles.navigation__item}>
                        <Link to={"#"}>Контакты</Link>
                    </li>
                    <li className={`${styles.navigation__item} ${styles.admin}`} style={{marginLeft: "20px"}}>
                        <Link to={ADMIN_ROUTE}>Админка</Link>
                    </li>
                </ul>
            </div>

            <nav className={styles.nav}>
                <Link to={SHOP_ROUTE} className={styles.main_logo}>
                    <img src={logo} alt="Logo"/>
                </Link>

                <div className={styles.col}>
                    <Link to={CATALOG_ROUTE} className={styles.btn__text}>
                        <span>Каталог</span>
                        <CatalogIcon/>
                    </Link>
                </div>

                <div className={`${styles.col} ${styles.input}`}>
                    <input type={"search"} placeholder={"Поиск..."}/>
                    <button type={"submit"} className={`${styles.btn} ${styles.btn__img}`}>
                        <LensIcon/>
                    </button>
                </div>

                <div className={styles.call}>
                    <strong className={styles.header__call__item}>+7 (777) 490-00-91</strong>
                    <p className={styles.header__call__item}>время работы: 9:00-20:00</p>
                    <a className={styles.header__call__item}>Заказать звонок</a>
                </div>

                <div className={`${styles.col} ${styles.nav__img}`}>
                    <img src={consultant} alt="consultant"/>
                </div>

                <div className={styles.col}>
                    <Link to={"#"} className={styles.btn__text}>
                        <span>Прайс-лист</span>
                        <DownloadIcon/>
                    </Link>
                </div>

                <div className={styles.cart}>
                    <Link to={CART_ROUTE} className={styles.btn__cart}>
                        <CartIcon/>
                        <p className={`${styles.btn__indicator}`}>{amount}</p>
                    </Link>

                    <div className={styles.col}>
                        <Link to={CART_ROUTE}>Корзина</Link>
                        <strong> {price < 1000000 ? +price : `${String(price).substring(0, 6)}...`} &#8376; </strong>
                    </div>
                </div>

            </nav>
            <div className={styles.mobile}>
                <div className={styles.mobile__btn}>
                    <Link to={CATALOG_ROUTE} className={`${styles.mobile__link}`}>
                        <CatalogIcon className={styles.mobile__img}/>
                        <p>Каталог</p>
                    </Link>
                </div>
                <div className={`${styles.mobile} ${styles.vl}`}></div>
                <div className={styles.mobile__btn}>
                    <Link to={"#"} className={`${styles.mobile__link}`}>
                        <LensIcon className={styles.mobile__img}/>
                        <p>Поиск</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HeaderMain;
