import React, {FC, useState} from 'react';
import styles from "./Header.module.css";
import {ReactComponent as CloseIcon} from "../../static/close.svg";
import {ReactComponent as HamburgerIcon} from "../../static/hamburger-white.svg";
import {Link} from "react-router-dom";
import {CART_ROUTE, CATALOG_ROUTE, SHOP_ROUTE} from "../../utils/consts";
import logo from "../../static/main-logo.svg";
import {ReactComponent as CatalogIcon} from "../../static/catalog.svg";
import {ReactComponent as LensIcon} from "../../static/lens.svg";
import {ReactComponent as CartIcon} from "../../static/cart.svg";

import BurgerModal from "../modals/BurgerModal";

interface iHeader {
  amount: number
}

const HeaderMobile: FC<iHeader> = ({amount}) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className={styles.header__mobile} onClick={() => setModalOpen(() => false)} style={modalOpen ?{ position: "relative"} : {overflowY : "unset"}}>
      <nav className={styles.nav} onClick={e => e.stopPropagation()}>
        <button className={styles.btn__img} onClick={() => setModalOpen(!modalOpen)}>
          {modalOpen ? <CloseIcon/> : <HamburgerIcon/>}
        </button>

        <Link to={SHOP_ROUTE} className={styles.main_logo}>
          <img src={logo} alt="Logo"/>
        </Link>

        <div className={styles.cart}>
          <Link to={CART_ROUTE} className={styles.btn__cart}>
            <CartIcon/>
            <p className={`${styles.btn__indicator}`}>{amount}</p>
          </Link>
        </div>

      </nav>

      <div className={styles.bottom} onClick={e => e.stopPropagation()}>
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
      <BurgerModal show={modalOpen}/>
    </div>

  );
};

export default HeaderMobile;
