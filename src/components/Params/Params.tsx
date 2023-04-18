import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectItemData} from "../../store/items/selectors";
import {setCategories, setFilters, sort, sortCat, updateItems} from '../../store/items/itemsSlice';
import {getItemsFromAdmin} from "../../utils/getItemsFromAdmin";
import styles from './Params.module.css'
import {ReactComponent as TrashIcon} from "../../static/delete.svg";
import {ReactComponent as ArrowUpIcon} from "../../static/arrow_up.svg";
import {ReactComponent as ArrowDownIcon} from "../../static/arrow_down.svg";
import {Link} from "react-router-dom";
import {SHOP_ROUTE} from "../../utils/consts";
import {ReactComponent as LeftArrow} from "../../static/leftarrow.svg";
import Sort from "./Sort";
import Price from './Price';

export interface iFilters {
    key: string;
    value: number[] | string;
}

const Params = () => {
    const {items, filters, categories, currentCat} = useSelector(selectItemData);

    const maxPrice = [...getItemsFromAdmin()].sort((a, b) => b.price - a.price)[0].price

    const dispatch = useDispatch()
    const [minValue, setMinValue] = useState(0)
    const [maxValue, setMaxValue] = useState(maxPrice >= 10000 ? maxPrice : 10000)

    const [cat, setCat] = useState("")
    const [filtersList, setFiltersList] = useState<iFilters[]>([])
    const [mobileOpen, setMobileOpen] = useState(false)


    useEffect(() => {
        if (filtersList.find(item => item.key === "price")) {
            setFiltersList([
                {key: "price", value: [minValue, maxValue]},
                ...filtersList.splice(1, filtersList.length)
            ])
        } else {
            setFiltersList([...filtersList, {key: "price", value: [minValue, maxValue]}])
        }
    }, [minValue, maxValue])

    useEffect(() => {
        dispatch(sort())
    }, [filters])

    useEffect(() => {
        dispatch(updateItems)
    }, [items])

    useEffect(() => {
        dispatch(setCategories(cat))
        dispatch(sortCat())
        window.scrollTo(0, 0)
    }, [cat])

    const getFilters = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setFiltersList(() => [...filtersList, {key: event.target.id, value: event.target.name}])
        } else if (filtersList.length) {
            setFiltersList((f) => f.filter((i) => {
                return i ? ((i.key !== event.target.id) || (i.value !== event.target.name)) : false
            }))
        }
    }

    const show = () => {
        dispatch(setFilters([...new Set([...filtersList])]))
        setMobileOpen(() => false)
        window.scrollTo(0, 0)
    }

    const reset = () => {
        const inputs = document.getElementsByTagName('input');
        for (let index = 0; index < inputs.length; ++index) {
            if (inputs[index].type === "text") {
                inputs[index].value = ''
            } else if (inputs[index].type === "checkbox" && inputs[index].checked) {
                inputs[index].checked = !inputs[index].checked
            }
        }
        setMinValue(0)
        setMaxValue([...getItemsFromAdmin()].sort((a, b) => b.price - a.price)[0].price)
        dispatch(setFilters([]))
        setCat(() => "")
        dispatch(setCategories(""))
        setMobileOpen(() => false)
        window.scrollTo(0, 0)
    }

    const open = () => {
        window.scrollTo(0, 0)
        setMobileOpen(() => !mobileOpen)
    }

    if (mobileOpen) return (
        <div className={`${styles.params}`}>
            <div className={styles.open_modal}>
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

                <h4>
                    ПОДБОР ПО ПАРАМЕТРАМ
                    <button className={styles.mobile} onClick={open}>
                        <ArrowUpIcon/>
                    </button>
                </h4>

                <Price
                    minValue={minValue}
                    maxValue={maxValue}
                    setMinValue={setMinValue}
                    setMaxValue={setMaxValue}
                />

                <Sort
                    name={"Производитель"}
                    field={"seller"}
                    getFilters={getFilters}
                />

                <Sort
                    name={"Бренд"}
                    field={"brand"}
                    getFilters={getFilters}
                />

                <div className={styles.btns}>
                    <button className={styles.btn__text} onClick={() => show()}>
                        <span>Показать</span>
                    </button>
                    <button className={styles.btn__img} onClick={() => reset()}>
                        <TrashIcon/>
                    </button>
                </div>
            </div>
        </div>
    )

    return (
        <div className={styles.params}>
            <h4>
                ПОДБОР ПО ПАРАМЕТРАМ
                <button className={styles.mobile} onClick={open}>
                    <ArrowDownIcon/>
                </button>
            </h4>
            <span className={styles.pc}>
        <Price
            minValue={minValue}
            maxValue={maxValue}
            setMinValue={setMinValue}
            setMaxValue={setMaxValue}
        />

        <Sort
            name={"Производитель"}
            field={"seller"}
            getFilters={getFilters}
        />

        <Sort
            name={"Бренд"}
            field={"brand"}
            getFilters={getFilters}
        />

        <div className={styles.btns}>
          <button className={styles.btn__text} onClick={() => show()}>
            <span>Показать</span>
          </button>
          <button className={styles.btn__img} onClick={() => reset()}>
            <TrashIcon/>
          </button>
        </div>
      </span>
            <div className={styles.categories}>
                {categories.map((c: any) =>
                    <div className={styles.categories__btns} key={c.name}>
                        <div className={`${styles.hl} ${styles.pc}`}></div>
                        <button
                            onClick={() => currentCat === c.name ? setCat("") : setCat(c.name)}
                            className={c.name === currentCat ? styles.type__current : styles.type}
                        >
                            {c.name.toUpperCase()}
                        </button>
                    </div>
                )}
            </div>

        </div>
    );
};

export default Params;
