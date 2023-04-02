import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addToLocalStorage, setTypes, updateItems} from '../../store/items/itemsSlice';
import ItemsType from "../../types/items-type";
import {selectItemData} from "../../store/items/selectors";
import {Categories} from "../../store/items/itemsTypes";
import AdminCard from "../../components/AdminCard/AdminCard";

import styles from "./Admin.module.css"
import {getItemsFromAdmin} from "../../utils/getItemsFromAdmin";

const Admin = () => {

    const dispatch = useDispatch()
    const {items, categories} = useSelector(selectItemData)
    const [category, setCategory] = useState<Categories[]>([...categories])
    const [id, setId] = useState(Date.now())
    const [form, setForm] = useState(false)

    const newItem: ItemsType = {
        brand: "Бренд",
        barcode: String(id),
        description: "Описание",
        title: "Имя",
        price: 0,
        manufacturer: "Производитель",
        measurement: 0,
        measurementType: "Не указан",
        url: "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081"
    }
    const [d, setD] = useState(localStorage.getItem('items'))

    useEffect(() => {
        document.title = `Админка`;
    }, [])

    useEffect(() => {
        setD(() => localStorage.getItem('items'))
    }, [items, newItem])

    const addItems = () => {
        localStorage.setItem("items", JSON.stringify(getItemsFromAdmin()));
        dispatch(updateItems())
    }

    const removeItems = () => {
        localStorage.removeItem("types");
        localStorage.removeItem("items");
        dispatch(setTypes())
        dispatch(updateItems())
    }

    useEffect(() => {
        localStorage.setItem("types", JSON.stringify(category));
        dispatch(setTypes())
    }, [category, dispatch])

    let newCats: Categories[] = [...category]

    const changeCat = (event: React.ChangeEvent<HTMLInputElement>) => {
        const findItemNew = newCats.find((item: Categories) => item.name === event.target.value)
        if (event.target.checked && newCats) {
            newCats = [...[...newCats].filter(item => item.name !== event.target.value), {
                name: findItemNew ? findItemNew.name : "",
                itemsCodes: findItemNew ? [...findItemNew.itemsCodes, String(id)] : [String(id)]
            }]
        } else if (!event.target.checked) {
            const findItem = category.find((item: Categories) => item.name === event.target.value)
            newCats = [...[...newCats]?.filter(item => item.name !== event.target.value), {
                name: findItem ? findItem.name : "",
                itemsCodes: findItemNew ? [...findItemNew.itemsCodes] : []
            }]
        }
    }

    const submit = () => {
        setCategory(() => [...newCats])
        dispatch(addToLocalStorage(newItem))
        localStorage.setItem("types", JSON.stringify(category));
        dispatch(setTypes())

        const inputs = document.getElementsByTagName('input');
        for (let index = 0; index < inputs.length; ++index) {
            if (inputs[index].type === "text" || inputs[index].type === "number") {
                inputs[index].value = ''
            } else if (inputs[index].type === "checkbox" && inputs[index].checked) {
                inputs[index].checked = !inputs[index].checked
            }
        }
        setForm(() => false)
        setId(() => Date.now())
    }

    return (
        <div className={styles.admin}>
            <button
                onClick={() => addItems()}
                className={`${styles.btn__open} ${styles.open}`}
            >
                Заполнить стор товарами из JSON
            </button>

            <button
                onClick={() => removeItems()}
                className={`${styles.btn__open} ${styles.delete}`}
            >
                Очистить стор
            </button>
            <p></p>
            <button className={`${styles.btn__open} ${(form ? styles.open : styles.close)}`}
                    onClick={() => setForm(!form)}>
                {!form ? "Open Form" : "Close Form"}
            </button>
            {form &&
                <div>
                    <form>
                        <div className={styles.add}>
                            <input
                                required
                                type="text"
                                placeholder={"URL изображения"}
                                onChange={e => newItem.url = (e.target.value)}
                            />
                            <input
                                required
                                type="text"
                                placeholder={"Название товара"}
                                onChange={e => newItem.title = (e.target.value)}
                            />
                            <input
                                required
                                type="text"
                                placeholder={"Мера измерения"}
                                onChange={e => newItem.measurementType = (e.target.value)}
                            />
                            <input
                                required
                                type="number"
                                placeholder={"Размер товара"}
                                onChange={e => newItem.measurement = +(e.target.value)}
                            />
                            <input
                                required
                                type="text"
                                placeholder={"Производитель"}
                                onChange={e => newItem.manufacturer = (e.target.value)}
                            />
                            <input
                                required
                                type="text"
                                placeholder={"Бренд"}
                                onChange={e => newItem.brand = (e.target.value)}
                            />
                            <input
                                required
                                type="text"
                                placeholder={"Описание товара"}
                                onChange={e => newItem.description = (e.target.value)}
                            />
                            <input
                                required
                                type="number"
                                placeholder={"Цена"}
                                min={0}
                                max={1_000_000}
                                onChange={e => newItem.price = +(e.target.value)}
                            />
                        </div>

                        <div className={styles.checks}>
                            <div className={styles.inner} style={{display: "flex", flexDirection: "column"}}>
                                {[...category].sort((a, b) => a.name.localeCompare(b.name)).map(c =>
                                        <span key={c.name}>
                    <input
                        type={"checkbox"}
                        value={c.name}
                        onChange={changeCat}
                    /> {c.name}
                  </span>
                                )}
                            </div>
                        </div>

                        <button type={"button"} className={`${styles.btn__open} ${styles.close}`} onClick={submit}>
                            Add
                        </button>
                    </form>
                </div>
            }

            <div className={styles.admin__grid}>
                {d && JSON.parse(d).length ? [...JSON.parse(d)].sort((a, b) => a.code - b.code).map((i: ItemsType) =>
                        <AdminCard i={i} key={i.barcode}></AdminCard>
                    ) :
                    <div>
                        Нет товаров в LocalStorage
                    </div>
                }
            </div>
        </div>
    );
};

export default Admin;
