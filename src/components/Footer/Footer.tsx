import React from 'react';
import styles from './Footer.module.css'

import telegram from '../../assets/icons/telegram.svg'
import whatsapp from '../../assets/icons/whatsapp.svg'
import visa from '../../assets/image/visa.png'
import mastercard from '../../assets/image/mastercard.png'
import mainLogoDark from '../../assets/icons/main-logo-white.svg'

import {ReactComponent as DownloadIcon} from '../../assets/icons/donwload.svg';
import {ReactComponent as RightWingIcon} from '../../assets/icons/right-wing.svg';
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.col}>
                <div className={styles.footer__logo}>
                    <img src={mainLogoDark} alt="logo" className={styles.logo}/>
                    <button className={`${styles.btn__text} ${styles.mobile}`}>
                        <span>Прайс-лист</span>
                        <DownloadIcon/>
                    </button>
                </div>
                <p className={styles.long}>
                    Компания «Султан» — снабжаем розничные магазины товарами
                    "под ключ" в Кокчетаве и Акмолинской области
                </p>
                <div className={styles.sub}>
                    <p>Подпишись на скидки и акции</p>
                    <div className={styles.input}>
                        <input type={"text"} placeholder={"Введите ваш E-mail"}/>
                        <button type={"submit"} className={`${styles.btn__img}`}>
                            <RightWingIcon/>
                        </button>
                    </div>
                </div>
            </div>

            <div className={styles.middle}>
                <div className={styles.col}>
                    <h3>Меню сайта:</h3>
                    <Link to={"#"} className={styles.link}>
                        О компании
                    </Link>
                    <Link to={"#"} className={styles.link}>
                        Доставка и оплата
                    </Link>
                    <Link to={"#"} className={styles.link}>
                        Возврат
                    </Link>
                    <Link to={"#"} className={styles.link}>
                        Контакты
                    </Link>
                </div>

                <div className={styles.col}>
                    <h3>Категории:</h3>
                    <Link to={"#"} className={styles.link}>
                        Бытовая химия
                    </Link>
                    <Link to={"#"} className={styles.link}>
                        Косметика и гигиена
                    </Link>
                    <Link to={"#"} className={styles.link}>
                        Товары для дома
                    </Link>
                    <Link to={"#"} className={styles.link}>
                        Товары для детей и мам
                    </Link>
                    <Link to={"#"} className={styles.link}>
                        Посуда
                    </Link>
                </div>
            </div>


            <div className={`${styles.col} ${styles.pc}`}>
        <span className={`${styles.col}`}>
          <h3>Скачать прайс-лист:</h3>
          <button className={`${styles.btn__text}`}>
            <span>Прайс-лист</span>
            <DownloadIcon/>
          </button>
        </span>

                <div className={styles.col}>
                    <p>Связь в мессенджерах:</p>
                    <div className={styles.logos}>
                        <img src={whatsapp} alt="whatsapp"/>
                        <img src={telegram} alt="telegram"/>
                    </div>
                </div>
            </div>

            <div className={styles.col}>
                <h3>Контакты:</h3>

                <div className={styles.footer__calls}>
                    <div>
                        <div className={styles.footer__call}>
                            <strong className={styles.footer__call__item}>+7 (777) 490-00-91</strong>
                            <p className={styles.footer__call__item}>время работы: 9:00-20:00</p>
                            <a className={styles.footer__call__item}>Заказать звонок</a>
                        </div>
                        <div className={styles.footer__call}>
                            <strong className={styles.footer__call__item}>opt.sultan@mail.ru</strong>
                            <p className={styles.footer__call__item}>На связи в любое время</p>
                        </div>
                        <div className={styles.logos}>
                            <img src={visa} alt="visa"/>
                            <img src={mastercard} alt="mc"/>
                        </div>
                    </div>

                    <div className={`${styles.col} ${styles.mobile}`}>
                        <p>Связь в мессенджерах:</p>
                        <div className={styles.logos}>
                            <img src={whatsapp} alt="whatsapp"/>
                            <img src={telegram} alt="teleggram"/>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
