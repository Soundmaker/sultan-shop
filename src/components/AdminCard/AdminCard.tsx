import React, {FC, useEffect, useState} from "react";
import {addToLocalStorage, removeFromLocalStorage, setTypes,} from "../../store/items/itemsSlice";
import {useDispatch, useSelector} from "react-redux";
import ItemsType from "../../types/items-type";
import {selectItemData} from "../../store/items/selectors";
import {getItemsFromAdmin} from "../../utils/getItemsFromAdmin";
import {Link} from "react-router-dom";
import {PRODUCT_ROUTE} from "../../utils/consts";
import {ReactComponent as GrIcon} from "../../assets/icons/box.svg";
import {ReactComponent as LitIcon} from "../assets/icons/lit.svg";
import {Categories} from "../../store/items/itemsTypes";
import styles from "../pages/Admin/Admin.module.css";

interface IType {
    i: ItemsType;
}

const AdminCard: FC<IType> = ({i}) => {
    const {categories} = useSelector(selectItemData);

    const dispatch = useDispatch();
    const [editing, setEditing] = useState(false);

    const [title, setTitle] = useState(i.title);
    const [measurementType, setmeasurementType] = useState(i.measurementType);
    const [measurement, setMeasurement] = useState(i.measurement);
    const [brand, setBrand] = useState(i.brand);
    const [manufacturer, setManufacturer] = useState(i.manufacturer);
    const [price, setPrice] = useState(i.price);
    const [url, setUrl] = useState(i.url);
    const newItem = [...getItemsFromAdmin()].find((item) => item.bar === i.barcode);

    const [category, setCategory] = useState([...categories]);
    let newCats: Categories[] = [...category];

    useEffect(() => {
        localStorage.setItem("types", JSON.stringify(category));
        dispatch(setTypes());
    }, [category, dispatch]);

    const changeCat = (event: React.ChangeEvent<HTMLInputElement>) => {
        const findItemNew = newCats.find(
            (item: Categories) => item.name === event.target.value
        );
        if (event.target.checked && newCats) {
            newCats = [
                ...[...newCats].filter((item) => item.name !== event.target.value),
                {
                    name: findItemNew ? findItemNew.name : "",
                    itemsCodes: findItemNew ? [...findItemNew.itemsCodes, i.barcode] : [],
                },
            ];
        } else {
            const findItem = category.find(
                (item: Categories) => item.name === event.target.value
            );
            newCats = [
                ...[...newCats].filter((item) => item.name !== event.target.value),
                {
                    name: findItemNew ? findItemNew.name : "",
                    itemsCodes: findItem
                        ? [...findItem.itemsCodes.filter((c: any) => c !== i.barcode)]
                        : [],
                },
            ];
        }
        dispatch(setTypes());
        setCategory(() => [...newCats]);
        localStorage.setItem("types", JSON.stringify(category));
    };

    const ready = () => {
        newItem.title = title;
        newItem.measurementType = measurementType;
        newItem.measurement = measurement;
        newItem.brand = brand;
        newItem.manufacturer = manufacturer;
        newItem.price = price;
        newItem.url = url;
        setCategory(() => [...newCats]);
        setEditing(() => false);
        dispatch(setTypes());
        dispatch(removeFromLocalStorage(i.barcode));
        dispatch(addToLocalStorage(newItem));
    };

    return (
        <div className={styles.admin__card}>
            <div className={styles.btns}>
                <button
                    className={`${styles.btn} ${styles.delete}`}
                    onClick={() => dispatch(removeFromLocalStorage(i.barcode))}
                >
                    delete
                </button>
                {editing ? (
                    <button className={`${styles.btn} ${styles.close}`} onClick={ready}>
                        ready
                    </button>
                ) : (
                    <button
                        className={`${styles.btn} ${styles.open}`}
                        onClick={() => setEditing(true)}
                    >
                        edit
                    </button>
                )}
            </div>

            {editing ? (
                <div className={styles.admin__card__inner} key={i.barcode}>
                    <div className={styles.img__container}>
                        <div>
                            <img src={i.url} alt="product" className={styles.img}/>
                        </div>
                    </div>
                    <div className={styles.add}>
                        <p>
                            URL:
                            <span className={styles.item__info}>
                <input
                    type="text"
                    value={url}
                    onChange={(event) => setUrl(event.target.value)}
                />
              </span>
                        </p>
                        <p>
                            Название:
                            <span className={styles.item__info}>
                <input
                    type="text"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
              </span>
                        </p>
                        <p>
                            Тип:
                            <span className={styles.item__info}>
                <input
                    type="text"
                    value={measurementType}
                    onChange={(event) => setmeasurementType(event.target.value)}
                />
              </span>
                        </p>

                        <p>
                            Размер:
                            <span className={styles.item__info}>
                <input
                    type="text"
                    value={measurement}
                    onChange={(event) => setMeasurement(+event.target.value)}
                />
              </span>
                        </p>

                        <p>
                            {" "}
                            Штрихкод:
                            <span className={styles.item__info}>{i.barcode}</span>
                        </p>

                        <p>
                            Производитель:
                            <span className={styles.item__info}>
                <input
                    type="text"
                    value={manufacturer}
                    onChange={(event) => setManufacturer(event.target.value)}
                />
              </span>
                        </p>
                        <p>
                            Бренд:
                            <span className={styles.item__info}>
                <input
                    type="text"
                    value={brand}
                    onChange={(event) => setBrand(event.target.value)}
                />
              </span>
                        </p>
                        <p>
                            Цена:
                            <span className={styles.item__info}>
                <input
                    type="number"
                    value={price}
                    onChange={(event) => setPrice(+event.target.value)}
                />
              </span>
                        </p>

                        <div className={styles.checks}>
                            <p> Тип ухода: </p>
                            {[...category]
                                .sort((a, b) => a.name.localeCompare(b.name))
                                .map((c: Categories) => (
                                    <span key={c.name}>
                    <input
                        type={"checkbox"}
                        value={c.name}
                        checked={
                            c.itemsCodes.find((item) => item === i.barcode) === i.barcode
                        }
                        onChange={changeCat}
                    />{" "}
                                        {c.name}
                  </span>
                                ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div key={i.barcode}>
                    <div className={styles.img__container}>
                        <Link to={PRODUCT_ROUTE + "/" + i.barcode}>
                            <img src={i.url} alt="product" className={styles.img}/>
                        </Link>
                    </div>

                    <div className={styles.text__container}>
                        <p className={styles.size}>
                            {i.measurementType === "г" ? <GrIcon/> : <LitIcon/>}
                            <span>
                {`  ${i.measurement}`} {i.measurementType}
              </span>
                        </p>
                        <Link to={PRODUCT_ROUTE + "/" + i.barcode}>
                            <p className={styles.name}>
                                {" "}
                                <strong>{i.brand.toUpperCase()}</strong> {i.barcode}{" "}
                            </p>
                        </Link>
                        <div className={styles.info__container}>
                            <p>
                                Штрихкод: <span className={styles.item__info}>{i.barcode}</span>
                            </p>

                            <p>
                                Производитель:{" "}
                                <span className={styles.item__info}>{i.manufacturer}</span>
                            </p>

                            <p>
                                Бренд:{" "}
                                <span className={styles.item__info}>
                  {i.brand.toUpperCase()}
                </span>
                            </p>

                            <p>
                                Тип ухода:{" "}
                                <span>
                  <select>
                    {categories.find((c: Categories) => {
                        return (
                            c.itemsCodes.find((item: string) => item === i.barcode) ===
                            i.barcode
                        );
                    }) ? (
                        categories
                            .filter((c: Categories) => {
                                return (
                                    c.itemsCodes.find(
                                        (item: string) => item === i.barcode
                                    ) === i.barcode
                                );
                            })
                            .map((f: any) => (
                                <option key={f.name}> {f.name} </option>
                            ))
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
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCard;
