import ItemsType from "../../types/items-type";

export interface Filters {
  key: keyof ItemsType,
  value: string | []
}

export interface Categories {
  name: string,
  itemsCodes: string[]
}

export interface ItemsSliceState {
  items: ItemsType[];
  limit: number;
  currentPage: number;
  categories: Categories[]
  currentCat: string
  filters: Filters[];
  brands: string[];
  sellers: string[];
}
