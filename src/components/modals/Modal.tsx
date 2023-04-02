import React, {FC} from 'react';
import styles from "./Modal.module.css";
import {ReactComponent as Close} from "../../static/close.svg";
import {ReactComponent as Completed} from "../../static/completed.svg";


interface iModal {
  show: boolean,
  onHide: () => void,
  children?: React.ReactNode;
}
const Modal: FC<iModal> = ({show, onHide, children}) => {
  return show ? (
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.modal__top}>
          <button onClick={onHide} className={styles.btn__close}>
            <Close/>
          </button>
        </div>

        <div className={styles.modal__content}>
          <button className={styles.btn__img} onClick={onHide}>
            <Completed/>
          </button>
          {children}
        </div>

      </div>
    ):
    <div></div>
};

export default Modal;
