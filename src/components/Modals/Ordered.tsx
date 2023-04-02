import React, {FC} from 'react';
import styles from "./AddToCartModal.module.css";

import {ReactComponent as Completed} from "../../assets/icons/completed.svg";
import {ReactComponent as Close} from "../../assets/icons/close.svg";


interface ModalType {
    show: boolean,
    onHide: () => void,
}

const Ordered: FC<ModalType> = ({show, onHide}) => {
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
                        <button className={styles.btn__img} onClick={onHide}>
                            <Completed/>
                        </button>
                        <h2>Спасибо за заказ</h2>
                        <p>Наш менеджер свяжется с вами в ближайшее время</p>
                    </div>
                </div>
            }
        </div>
    );
};

export default Ordered;
