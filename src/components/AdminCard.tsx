import React, {FC, useEffect, useState} from 'react';
import {addToLocalStorage, removeFromLocalStorage, setTypes} from "../store/items/itemsSlice";
import {useDispatch, useSelector} from "react-redux";
import ItemsType from "../types/items-type";
import {selectItemData} from "../store/items/selectors";
import {getItemsFromAdmin} from "../utils/getItemsFromAdmin";
import {Link} from "react-router-dom";
import {PRODUCT_ROUTE} from "../utils/consts";
import {ReactComponent as GrIcon} from "../static/gr.svg";
import {ReactComponent as LitIcon} from "../static/lit.svg";
import {Categories} from "../store/items/itemsTypes";
import styles from "../pages/Admin/Admin.module.css"

interface IType {
  i: ItemsType
}

const AdminCard: FC<IType> = ({i}) => {
  const { categories } = useSelector(selectItemData)

  const dispatch = useDispatch()
  const [editing, setEditing] = useState(false);

  const [name, setName] = useState(i.name)
  const [size, setSize] = useState(i.size)
  const [type, setType] = useState(i.type)
  const [brand, setBrand] = useState(i.brand)
  const [seller, setSeller] = useState(i.seller)
  const [price, setPrice] = useState(i.price)
  const [url, setUrl] = useState(i.url)
  const newItem = [...getItemsFromAdmin()].find(item => item.code === i.code)

  const [cat, setCat] = useState([...categories])
  let newCats: Categories[] = [...cat]

  useEffect(()=>{
    localStorage.setItem("types", JSON.stringify(cat));
    dispatch(setTypes())
  },[cat, dispatch])


  const changeCat = (event: React.ChangeEvent<HTMLInputElement>) => {
    const findItemNew = newCats.find((item: Categories) => item.name === event.target.value)
    if(event.target.checked && newCats){
      newCats = [...[...newCats].filter(item => item.name !== event.target.value), {
        name: findItemNew ? findItemNew.name : "",
        itemsCodes: findItemNew ? [...findItemNew.itemsCodes, i.code] : []
      }]
    } else {
      const findItem = cat.find((item: Categories) => item.name === event.target.value)
      newCats = [...[...newCats].filter(item => item.name !== event.target.value), {
        name: findItemNew ? findItemNew.name : "",
        itemsCodes: findItem ? [...findItem.itemsCodes.filter(c => c!==i.code)] : []
      }]
    }
    dispatch(setTypes())
    setCat(() => [...newCats])
    localStorage.setItem("types", JSON.stringify(cat));
  }


  const ready = () => {
    newItem.name = name
    newItem.size = size
    newItem.type = type
    newItem.brand = brand
    newItem.seller = seller
    newItem.price = price
    newItem.url = url
    setCat(() => [...newCats])
    setEditing(() => false)
    dispatch(setTypes())
    dispatch(removeFromLocalStorage(i.code))
    dispatch(addToLocalStorage(newItem))
  }

  return (
    <div className={styles.admin__card}>
      <div className={styles.btns}>
        <button
          className={`${styles.btn} ${styles.delete}`}
          onClick={() => dispatch(removeFromLocalStorage(i.code))}
        >
          delete
        </button>
        {editing ?
          <button className={`${styles.btn} ${styles.close}`} onClick={ready}>
            ready
          </button> :

          <button className={`${styles.btn} ${styles.open}`} onClick={() => setEditing(true)}>
            edit
          </button>
        }

      </div>


      {editing ?

        <div className={styles.admin__card__inner} key={i.code} >
          <div className={styles.img__container}>
            <div>
              <img src={i.url} alt="product" className={styles.img}/>
            </div>
          </div>
          <div className={styles.add}>
            <p>
              URL:
              <span className={styles.item__info}>
                <input type="text" value={url} onChange={(event) => setUrl(event.target.value)}/>
              </span>
            </p>
            <p>
              Название:
              <span className={styles.item__info}>
                <input type="text" value={name} onChange={(event) => setName(event.target.value)}/>
              </span>
            </p>
            <p>
              Тип:
              <span className={styles.item__info}>
                <input type="text" value={type} onChange={(event) => setType(event.target.value)}/>
              </span>
            </p>

            <p>
              Размер:
              <span className={styles.item__info}>
                <input type="text" value={size} onChange={(event) => setSize(+event.target.value)}/>
              </span>
            </p>

            <p> Штрихкод:
              <span className={styles.item__info}>
                {i.code}
              </span>
            </p>

            <p>
              Производитель:
              <span className={styles.item__info}>
                <input type="text" value={seller} onChange={(event) => setSeller(event.target.value)}/>
              </span>
            </p>
            <p>
              Бренд:
              <span className={styles.item__info}>
                <input type="text" value={brand} onChange={(event) => setBrand(event.target.value)}/>
              </span>
            </p>
            <p>
              Цена:
              <span className={styles.item__info}>
                <input type="number" value={price} onChange={(event) => setPrice(+event.target.value)}/>
              </span>
            </p>


            <div className={styles.checks}>
              <p> Тип ухода: </p>
              {[...cat].sort((a,b) => a.name.localeCompare(b.name)).map((c: Categories) =>

                <span key={c.name}>
                  <input
                    type={"checkbox"}
                    value={c.name}
                    checked={c.itemsCodes.find(item => item === i.code) === i.code}
                    onChange={changeCat}
                  /> {c.name}
                </span>
              )}
            </div>
          </div>

        </div>
        :
        <div key={i.code}>
          <div className={styles.img__container}>
            <Link to={PRODUCT_ROUTE+'/'+i.code}>
              <img src={i.url} alt="product" className={styles.img}/>
            </Link>
          </div>

          <div className={styles.text__container}>
            <p className={styles.size}>
              {i.type==="weight" ? <GrIcon/> : <LitIcon/>}
              <span>{`  ${i.size}`} {i.type==="weight" ? " г" : " мл"}</span>
            </p>
            <Link to={PRODUCT_ROUTE+'/'+i.code}>
              <p className={styles.name}> <strong>{i.brand.toUpperCase()}</strong> {i.name} </p>
            </Link>
            <div className={styles.info__container}>
              <p>
                Штрихкод: <span className={styles.item__info}>
                  {i.code}
                </span>
              </p>

              <p>
                Производитель: <span className={styles.item__info}>
                  {i.seller}
                </span>
              </p>

              <p>
                Бренд: <span className={styles.item__info}>
                  {i.brand.toUpperCase()}
                </span>
              </p>

              <p>
                Тип ухода: <span>
                  <select>
                    {
                      categories.find((c: Categories) => {
                        return c.itemsCodes.find((item: string) => item === i.code) === i.code
                      }) ?
                      categories.filter((c: Categories) => {
                        return c.itemsCodes.find((item: string) => item === i.code) === i.code
                      }).map(f =>
                        <option key={f.name}> {f.name} </option>
                      ) :
                      <option>Не указан </option>
                    }
                  </select>
                </span>
              </p>
            </div>

          </div>
          <div className={styles.bottom}>
            <strong> {Math.ceil(i.price)} &#8376; </strong>
          </div>
        </div>
      }

    </div>

  );
};

export default AdminCard;
