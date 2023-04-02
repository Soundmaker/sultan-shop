import React, {FC} from 'react';
import styles from "../Header/Header.module.css";
import {ReactComponent as AddressIcon} from "../../static/address.svg";
import {ReactComponent as EmailIcon} from "../../static/email.svg";
import {Link} from "react-router-dom";
import {ADMIN_ROUTE} from "../../utils/consts";
import {ReactComponent as DownloadIcon} from "../../static/download.svg";
import {ReactComponent as CallIcon} from "../../static/call.svg";


interface iModal {
  show: boolean,
}

const BurgerModal: FC<iModal> = ({show}) => {
  return show ? (
    <div className={styles.mobile}>
      <div className={styles.burger}>
        <div></div>
        <div className={styles.burger__row}>
          <AddressIcon/>
          <p>
            <strong>г.Кокчетав, ул.Ж. Ташенова 129Б</strong><br/>
            (Рынок Восточный)
          </p>
        </div>

        <div className={styles.burger__row}>
          <EmailIcon/>
          <p>
            <strong>opt.sultan@mail.ru</strong><br/>
            На связи в любое время
          </p>
        </div>

        <div className={styles.burger__row}>
          <CallIcon fill={"black!important"}/>
          <p>
            <strong className={styles.header__call__item}>Отдел продаж</strong><br/>
            +7 (777) 490-00-91 <br/>
            время работы: 9:00-20:00
          </p>
        </div>

        <div className={styles.burger__row}>
          <button className={styles.btn__img}>
            <CallIcon/>
          </button>
          <a className={styles.header__call__item}>Заказать звонок</a>
        </div>

        <div className={styles.hl}></div>

        <h2>
          Меню сайта:
        </h2>

        <ul className={styles.burger__navs}>

          <li className={`${styles.burger__nav} ${styles.admin}`}>
            <Link to={ADMIN_ROUTE}>Админка</Link>
          </li>

          <li className={styles.burger__nav}>
            <Link to={"#"}>О компании</Link>
          </li>
          <li className={styles.burger__nav}>
            <Link to={"#"}>Доставка и оплата</Link>
          </li>
          <li className={styles.burger__nav}>
            <Link to={"#"}>Возврат</Link>
          </li>
          <li className={styles.burger__nav}>
            <Link to={"#"}>Контакты</Link>
          </li>
        </ul>

        <div style={{display: "flex", flexDirection: "column"}}>
          <button className={styles.btn__text}>
            <span>Прайс-лист</span>
            <DownloadIcon/>
          </button>
        </div>

      </div>

    </div>
  ):
    <></>
};

export default BurgerModal;
