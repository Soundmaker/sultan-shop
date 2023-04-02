import React, {FC} from "react";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {addItem, removeItem, subtractItem} from "../../store/cart/cartSlice";
import {CartItem as CartItemType} from "../../store/cart/types";
import {PRODUCT_ROUTE} from "../../utils/consts";

import styles from "./CartItem.module.css";
import {ReactComponent as BoxIcon} from "../../assets/icons/box.svg";
import {ReactComponent as LitIcon} from "../../assets/icons/lit.svg";
import {ReactComponent as TrashIcon} from "../../assets/icons/delete.svg";
import {getItemsFromAdmin} from "../../utils/getItemsFromAdmin";
import ItemsType from "../../types/items-type";
import placeholder from "../../assets/image/placeholder.png";

interface CIType {
    i: CartItemType;
}

const CartItem: FC<CIType> = ({i}) => {
    const dispatch = useDispatch();

    const plus = () => {
        const item: CartItemType = {...i, count: 1};
        dispatch(addItem(item));
    };

    const remove = () =>
        window.confirm("Вы действительно хотите удалить товар?") &&
        dispatch(removeItem(i.code));

    const item = getItemsFromAdmin().find(
        (item: ItemsType) => item.barcode === i.code
    );

    const minus = () => {
        i.count > 1 && dispatch(subtractItem(i.code));
        i.count === 1 && remove();
    };

    if (!item)
        return (
            <div className={styles.cart__item} key={i.code}>
                <Link
                    to={"#"}
                    className={styles.cart__img}
                    style={{filter: "blur(5px)", cursor: "default"}}
                >
                    <img
                        src={placeholder}
                        alt="item"
                        style={{width: "160px", height: "160px"}}
                    />
                </Link>
                <div className={styles.col}>
                    <p style={{filter: "blur(5px)", cursor: "default"}}>
                        Товар недоступен
                    </p>
                    <Link to={"#"} style={{cursor: "default"}}>
            <span className={styles.cart__item__name} style={{color: "red"}}>
              Товар недоступен
            </span>
                    </Link>
                    <p style={{width: "450px", filter: "blur(5px)", cursor: "default"}}>
                        Товар недоступен
                    </p>
                </div>
                <span className={styles.cart__btns}>
          <div
              className={styles.cart__item__price}
              style={{filter: "blur(5px)", cursor: "default"}}
          >
            <button
                disabled
                className={styles.amount}
                style={{filter: "blur(5px)", cursor: "default"}}
            >
              -
            </button>
            <div className={styles.amount__value}>
              <span>-</span>
            </div>
            <button
                disabled
                className={styles.amount}
                style={{filter: "blur(5px)", cursor: "default"}}
            >
              +
            </button>
          </div>
          <div className={styles.vl}></div>
          <strong style={{filter: "blur(5px)", cursor: "default"}}>
            {" "}
              0 &#8376;{" "}
          </strong>
          <div className={styles.vl}></div>

          <button className={styles.btn__img} onClick={() => remove()}>
            <TrashIcon/>
          </button>
        </span>
            </div>
        );

    return (
        <div className={styles.cart__item} key={i.code}>
            <Link to={PRODUCT_ROUTE + "/" + item.code} className={styles.cart__img}>
                <img src={item.url} alt="item"/>
            </Link>

            <div className={styles.col}>
                <p className={styles.size}>
                    {item.type === "measurementType" ? <BoxIcon/> : <LitIcon/>}
                    {`  ${item.size}`}
                    {item.type === "measurementType" ? " г" : " мл"}
                </p>
                <Link to={PRODUCT_ROUTE + "/" + i.code}>
          <span className={styles.cart__item__name}>
            {item.brand}{" "}
              {item.name.length >= 35
                  ? `${item.name.substring(0, 35)}...`
                  : item.name}
          </span>
                </Link>
                <p style={{width: "450px"}}>
                    {item.desc.length >= 150
                        ? `${item.desc.substring(0, 150)}...`
                        : item.desc}
                </p>
            </div>

            <span className={styles.cart__btns}>
        <div className={styles.cart__item__price}>
          <button onClick={() => minus()} className={styles.amount}>
            -
          </button>
          <div className={styles.amount__value}>
            <span>{i.count}</span>
          </div>
          <button onClick={() => plus()} className={styles.amount}>
            +
          </button>
        </div>
        <div className={styles.vl}></div>
        <strong> {i.count * item.price} &#8376; </strong>
        <div className={styles.vl}></div>

        <button className={styles.btn__img} onClick={() => remove()}>
          <TrashIcon/>
        </button>
      </span>
        </div>
    );
};

export default CartItem;
