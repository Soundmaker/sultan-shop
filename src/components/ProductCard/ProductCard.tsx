import React, {FC} from "react";
import ItemsType from "../../types/items-type";
import {Link} from "react-router-dom";
import {PRODUCT_ROUTE} from "../../utils/consts";

import {ReactComponent as GrIcon} from "../../assets/icons/box.svg";
import {ReactComponent as LitIcon} from "../../assets/icons/lit.svg";
import {ReactComponent as CartIcon} from "../../assets/icons/cart.svg";

import styles from "./ProductCard.module.css";
import {addItem} from "../../store/cart/cartSlice";
import {useDispatch, useSelector} from "react-redux";
import {selectItemData} from "../../store/items/selectors";
import {Categories} from "../../store/items/itemsTypes";

interface IType {
    i: ItemsType;
}

const ProductCard: FC<IType> = ({i}) => {
    const dispatch = useDispatch();
    const {categories} = useSelector(selectItemData);

    return (
        <div className={styles.item} key={i.barcode}>
            <div className={styles.img__container}>
                <Link to={PRODUCT_ROUTE + "/" + i.barcode}>
                    <img src={i.url} alt="product" className={styles.img}/>
                </Link>
            </div>

            <div className={styles.text__container}>
                <p className={styles.size}>
                    {i.measurementType === "г" ? <GrIcon/> : <LitIcon/>}
                    <span>
            {`${i.measurement}`} {i.measurementType}
          </span>
                </p>
                <Link to={PRODUCT_ROUTE + "/" + i.barcode}>
                    <p className={styles.name}>
                        {" "}
                        <strong>{i.brand.toUpperCase()}</strong> {i.title}{" "}
                    </p>
                </Link>
                <div className={styles.info__container}>
                    <p>
                        Штрихкод: <span className={styles.item__info}>{i.barcode}</span>
                    </p>

                    <p>
                        Производитель: <span className={styles.item__info}>{i.manufacturer}</span>
                    </p>

                    <p>
                        Бренд:{" "}
                        <span className={styles.item__info}>{i.brand.toUpperCase()}</span>
                    </p>

                    <p>
                        Тип ухода:{" "}
                        <span>
              <select>
                {categories.find((c: Categories) => {
                    return (
                        c.itemsCodes.find((item) => item === i.barcode) === i.barcode
                    );
                }) ? (
                    categories
                        .filter((c: Categories) => {
                            return (
                                c.itemsCodes.find((item) => item === i.barcode) === i.barcode
                            );
                        })
                        .map((f: any) => <option key={f.name}>{f.name}</option>)
                ) : (
                    <option>Не указан </option>
                )}
              </select>
            </span>
                    </p>
                </div>
            </div>
            <div className={styles.bottom}>
                <strong> {Math.ceil(i.price)} &#8376; </strong>

                <button
                    onClick={() => dispatch(addItem({
                        ...i, count: 1,
                        code: ""
                    }))}
                    className={`${styles.btn} ${styles.btn__text}`}
                >
                    <span>В корзину</span>
                    <CartIcon/>
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
