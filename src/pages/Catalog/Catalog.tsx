import React, {FC, useEffect} from 'react';
import {CATALOG_ROUTE, SHOP_ROUTE} from "../../utils/consts";
import Pagination from "../../components/Pagination/Pagination";
import {Link} from "react-router-dom";
import Filters from '../../components/Filters/Filters';
import Params from '../../components/Params/Params';
import {useDispatch, useSelector} from "react-redux";
import ProductCard from "../../components/ProductCard/ProductCard";
import {selectItemData} from "../../store/items/selectors";
import ItemsType from "../../types/items-type";

import styles from "./Catalog.module.css"

import "../../components/styles/styles.css"
import {setCurrentPage, sortPriceASC} from '../../store/items/itemsSlice';
import {ReactComponent as LeftArrow} from "../../assets/icons/leftarrow.svg";

const Catalog: FC = () => {
    const dispatch = useDispatch()
    const {limit, items, currentPage, currentCategory} = useSelector(selectItemData);

    const itemsList: ItemsType[] = items.slice(limit * (currentPage - 1), limit * (currentPage))

    const onChangePage = (page: number) => {
        dispatch(setCurrentPage(page));
        window.scrollTo(0, 0)
    };
    useEffect(() => {
        dispatch(sortPriceASC())
    }, [dispatch])

    useEffect(() => {
        if (currentCategory)
            document.title = `${currentCategory}`;
        else
            document.title = `Каталог`
    }, [currentCategory])

    return (
        <div className={styles.catalog}>
            <div className={`${styles.breadcrumbs} ${styles.pc}`}>
                <Link to={SHOP_ROUTE} className={styles.breadcrumb}> Главная </Link>
                <div className={styles.vl}></div>
                <Link to={CATALOG_ROUTE} className={`${styles.breadcrumb} ${styles.active}`}> Каталог </Link>
            </div>
            <div className={`${styles.breadcrumbs} ${styles.mobile}`}>
                <Link to={SHOP_ROUTE} className={styles.breadcrumb}>
                    <div className={styles.arrow}>
                        <LeftArrow/>
                    </div>
                    <span>
            Назад
          </span>
                </Link>
            </div>

            <h2 className={styles.mobile}>Косметика и гигиена</h2>

            <span className={styles.pc}><Filters/></span>

            <div className={styles.main__content}>
                <Params/>
                <span className={styles.mobile}><Filters/></span>

                <span className={styles.items__container}>
          <div className={styles.items__grid}>
            {itemsList.length ? itemsList.map((i) =>
                    <ProductCard i={i} key={i.barcode}/>
                ) :
                <div>
                    <p>Нет товаров, соответствующих выбранным фильтрам,</p>
                    <a href={CATALOG_ROUTE}>Вернуться в каталог</a>
                </div>
            }
          </div>
                    {items.length ? <Pagination currentPage={currentPage} onChangePage={onChangePage}/> : ""}

        </span>

            </div>
        </div>
    );
};

export default Catalog;

