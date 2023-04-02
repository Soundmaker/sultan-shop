import React from 'react';

import styles from "./AddToCartModal.module.css"
import {ReactComponent as Close} from "../../assets/icons/close.svg";
import {ReactComponent as Completed} from "../../assets/icons/completed.svg";
import {Link} from "react-router-dom";
import {CART_ROUTE} from "../../utils/consts";

const AddToCartModal = ({show, onHide}: any) => {

    return (
        <div>
            {show &&
                <div className={styles.modal}>
                    <div className={styles.modal__top}>
                        <button onClick={onHide} className={styles.btn__close}>
                            <Close/>
                        </button>
                    </div>

                    <div className={styles.modal__content}>
                        <div className={styles.btn__img}>
                            <Completed/>
                        </div>
                        <h2>Товар успешно добавлен в корзину</h2>
                        <Link to={CART_ROUTE}>КОРЗИНА</Link>
                    </div>
                </div>
            }
        </div>
    )
};

export default AddToCartModal;
