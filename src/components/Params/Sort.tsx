import React, {FC} from 'react';
import styles from "./Params.module.css";
import {ReactComponent as SearchIcon} from "../../assets/icons/search.svg";
import {getItemsFromAdmin} from "../../utils/getItemsFromAdmin";
import {ReactComponent as ArrowIcon} from "../../static/small_arrow.svg";
import {ReactComponent as ArrowOpenIcon} from "../../static/small_arrow_open.svg";


interface iSort {
    name: string;
    field: string;
    pressed: boolean;
    sorted: string[];
    sortSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
    getFilters: (event: React.ChangeEvent<HTMLInputElement>) => void;
    changePressed: () => void;
}

const Sort: FC<iSort> = ({name, field, pressed, sorted, sortSearch, getFilters, changePressed}) => {

    return (
        <div className={styles.sort}>
            <h4>{name}</h4>
            <div className={`${styles.input}`}>
                <input type="text" placeholder={"Поиск..."} onChange={sortSearch}/>
                <button type={"submit"} className={``}>
                    <SearchIcon/>
                </button>
            </div>
            {sorted.map((i: any) =>
                    <div key={i} className={styles.sort__item}>
                        <input type="checkbox" name={i} id={field} className={styles.checkbox} onChange={getFilters}/>{i}
                        <span>
            ({[...getItemsFromAdmin()].filter(it => it[field] === i || "all" === i).reduce((a: number) => a + 1, 0)})
          </span>
                    </div>
            )}
            <button className={styles.link__opener} onClick={() => changePressed()}>
                {pressed ?
                    <span>Скрыть <ArrowIcon/> </span> :
                    <span>Показать все <ArrowOpenIcon/></span>}
            </button>
        </div>
    );
};

export default Sort;
