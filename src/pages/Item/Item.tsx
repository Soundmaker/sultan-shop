import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router';
import {CATALOG_ROUTE, PRODUCT_ROUTE, SHOP_ROUTE} from '../../utils/consts';
import {useDispatch, useSelector} from "react-redux";

import {Link} from "react-router-dom";
import {addItem} from "../../store/cart/cartSlice";
import {selectItemData} from "../../store/items/selectors";
import ItemsType from "../../types/items-type";
import Page404 from "../Page404";
import {ReactComponent as GrIcon} from "../../assets/icons/search.svg";
import {ReactComponent as CartIcon} from "../../assets/icons/cart.svg";
import {ReactComponent as LitIcon} from '../../assets/icons/lit.svg';
import {ReactComponent as ShareIcon} from '../../assets/icons/share.svg';
import {ReactComponent as DownloadIcon} from '../../assets/icons/donwload.svg';
import {ReactComponent as ArrowIcon} from '../../assets/icons/small_arrow.svg';
import {ReactComponent as ArrowOpenIcon} from '../../assets/icons/small_arrow_open.svg';
import styles from "./Item.module.css"
import {ReactComponent as LeftArrow} from "../../assets/icons/leftarrow.svg";
import AddToCartModal from '../../components/Modals/AddToCartModal';

const Item = () => {

    const [descActive, setDescActive] = useState(true)
    const [charActive, setCharActive] = useState(true)
    const {code} = useParams()
    const {items} = useSelector(selectItemData)
    const dispatch = useDispatch()

    const [addToCartVisible, setAddToCartVisible] = useState(false);
    const [curCount, setCurCount] = useState(1)

    const minus = () => {
        if (curCount > 1) setCurCount(() => curCount - 1)
    }

    const i = items.find((item) => item.barcode === code)

    useEffect(() => {
        (i)
            ? document.title = `${i.title[0].toUpperCase()}${i.title.substring(1, i.title.length)}`
            : document.title = `Товар не найден...`
    }, [code, i])

    if (!i) return <Page404/>

    const addItemToCart = (i: ItemsType) => {
        dispatch(addItem({
            ...i, count: curCount,
            code: ''
        }));
        setAddToCartVisible(() => true)
        setCurCount(() => 1)
    };

    return (
        <div className={styles.item}>
            <div className={`${styles.breadcrumbs} ${styles.pc}`}>
                <Link to={SHOP_ROUTE} className={styles.breadcrumb}> Главная </Link>
                <div className={styles.vl}></div>
                <Link to={CATALOG_ROUTE} className={styles.breadcrumb}> Каталог </Link>
                <div className={styles.vl}></div>
                <Link to={`${PRODUCT_ROUTE}/${code}`}
                      className={`${styles.breadcrumb} ${styles.active}`}> {i.title} </Link>
            </div>
            <div className={`${styles.breadcrumbs} ${styles.mobile}`}>
                <Link to={CATALOG_ROUTE} className={styles.breadcrumb}>
                    <div className={styles.arrow}>
                        <LeftArrow/>
                    </div>
                    <span>
            Назад
          </span>
                </Link>
            </div>

            <div className={`${styles.row} ${styles.item__page}`}>
                <div className={styles.col}>
                    <div className={styles.item__img}>
                        <img src={i.url} alt="product"/>
                    </div>
                </div>
                <div className={`${styles.col} ${styles.right__side}`}>
                    <div className={styles.info}>
                        <p className={styles.available}>В наличии</p>
                        <p className={styles.item__name}>
                            <strong>{i.manufacturer} {i.brand.toUpperCase()}</strong> {i.title}
                        </p>

                        <p className={`${styles.size} ${styles.pc}`}>
                            {i.measurementType === "г" ? <GrIcon/> : <LitIcon/>}
                            {`  ${i.measurement}`}
                            {i.measurementType}
                        </p>
                        <div className={styles.row}>
                            <div className={styles.price__info}>
                                <p className={styles.price}>
                                    {i.price} &#8376;
                                </p>

                                <div className={styles.amount__container}>
                                    <button onClick={() => minus()} className={styles.amount}>-</button>
                                    <span>{curCount}</span>
                                    <button onClick={() => setCurCount(() => curCount + 1)}
                                            className={styles.amount}>+
                                    </button>
                                </div>
                            </div>
                            <div className={styles.share}>
                                <button onClick={() => addItemToCart(i)} className={styles.btn__text}>
                                    <span>В корзину</span>
                                    <CartIcon/>
                                </button>
                                <button className={`${styles.item__card} ${styles.mobile}`}>
                                    <ShareIcon/>
                                </button>
                            </div>
                        </div>

                        <div className={styles.item__btns}>
                            <button className={`${styles.item__card} ${styles.pc}`}>
                                <ShareIcon/>
                            </button>
                            <button className={styles.item__card}>
                                При покупке от <strong>10 000 &#8376;</strong> бесплатная доставка по Какчетаву и
                                области
                            </button>
                            <button className={`${styles.item__card} ${styles.item__download}`}>
                                <span>Прайс-лист</span>
                                <DownloadIcon/>
                            </button>
                        </div>
                        <div className={styles.info__container}>
                            <p>Производитель: <span className={styles.item__info}>{i.manufacturer}</span></p>
                            <p>Бренд: <span className={styles.item__info}>{i.brand}</span></p>
                            <p>Артикул: <span className={styles.item__info}>{i.barcode.slice(0, 5)}</span></p>
                            <p>Штрихкод: <span className={styles.item__info}>{i.barcode}</span></p>
                        </div>

                        <button onClick={() => setDescActive(() => !descActive)} className={styles.open__button}>
                            Описание {descActive ? <ArrowOpenIcon/> : <ArrowIcon/>}
                        </button>
                        <p className={styles.desc}>
                            {!descActive && i.description}
                        </p>
                        <div className={styles.hl}></div>
                        <button onClick={() => setCharActive(() => !charActive)} className={styles.open__button}>
                            Характеристики {charActive ? <ArrowOpenIcon/> : <ArrowIcon/>}
                        </button>
                        {!charActive && (
                            <div className={styles.info__container}>
                                <p>
                                    Назначение: <span className={styles.item__info}>{i.manufacturer}</span>
                                </p>
                                <p>
                                    Тип: <span
                                    className={styles.item__info}>{i.measurementType === "г" ? "Вес" : "Объем"}</span>
                                </p>
                                <p>
                                    Производитель: <span className={styles.item__info}>{i.manufacturer}</span>
                                </p>
                                <p>
                                    Бренд: <span className={styles.item__info}>{i.brand}</span>
                                </p>
                                <p>
                                    Артикул: <span className={styles.item__info}>{i.barcode.slice(0, 5)}</span>
                                </p>
                                {i.measurementType === "г" ?
                                    (<p> Вес: <span className={styles.item__info}> {i.measurement} г</span></p>) :
                                    (<p> Объем: <span className={styles.item__info}> {i.measurement} мл</span></p>)
                                }
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <AddToCartModal show={addToCartVisible} onHide={() => setAddToCartVisible(false)}/>
        </div>
    );
};

export default Item;
