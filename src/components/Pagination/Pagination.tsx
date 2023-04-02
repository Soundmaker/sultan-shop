import React from 'react';

import styles from './Pagination.module.css';
import ItemsType from "../../types/items-type";
import {useSelector} from "react-redux";
import {selectItemData} from "../../store/items/selectors";
import { ReactComponent as LeftArrow } from '../../static/leftarrow.svg';
import { ReactComponent as RightArrow } from '../../static/rightarrow.svg';

interface IPagination {
  currentPage: number
  onChangePage: (page: number) => void
}

const Pagination: React.FC<IPagination> = ({ currentPage, onChangePage }) => {
  const countAmount = (arr: ItemsType[]): number => arr.reduce((a) => a+1, 0)
  const { items, limit } = useSelector(selectItemData);

  const count = Math.ceil(countAmount(items)/limit)

  const pages = []
  for (let i=0; i < (count>5 ? 5 : count); i++){
    pages.push(i+1)
  }

  return (
    <nav className={styles.pages}>
      <ul>
        <li>
          <button
            disabled={currentPage<=1}
            onClick={() => onChangePage(currentPage>1 ? currentPage-1 : currentPage)}
          >
            <LeftArrow/>
          </button>
        </li>

        {pages.map(p =>
          <li key={p}>
            <button
              onClick={() => onChangePage(p)}
              className={p==currentPage ? styles.selected : styles.list}
            >
              {p}
            </button>
          </li>
        )}
          <li>
            <button disabled={currentPage>=count} onClick={() => onChangePage(currentPage+1<=count ? currentPage+1 : currentPage)}>
              <RightArrow/>
            </button>
          </li>
      </ul>
    </nav>
  );
};

export default Pagination;
