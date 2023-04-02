import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Categories, ItemsSliceState} from './itemsTypes';
import {getItemsFromAdmin} from "../../utils/getItemsFromAdmin";
import ItemsType from "../../types/items-type";
import {getTypes} from "../../utils/getTypes";


const initialState: ItemsSliceState = {
  items: getItemsFromAdmin(),
  limit: 15,
  filters: [],
  categories: getTypes(),
  currentPage: 1,
  currentCat: "",
  brands: [...[...new Set([...getItemsFromAdmin()].map(i => i.brand))].sort((a,b) => a.localeCompare(b))],
  sellers: [...[...new Set([...getItemsFromAdmin()].map(i => i.seller))].sort((a,b) => a.localeCompare(b))],
};


const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    updateItems(state){
      state.items = getItemsFromAdmin()
      state.brands = [...[...new Set([...getItemsFromAdmin()].map(i => i.brand))].sort((a,b) => a.localeCompare(b))]
      state.sellers = [...[...new Set([...getItemsFromAdmin()].map(i => i.seller))].sort((a,b) => a.localeCompare(b))]
    },
    addToLocalStorage(state, action: PayloadAction<ItemsType>) {
      const data = localStorage.getItem('items');
      state.items = [...(data ? JSON.parse(data) : []), action.payload]
      localStorage.setItem("items", JSON.stringify(state.items));
      state.items = getItemsFromAdmin()
    },
    removeFromLocalStorage(state, action: PayloadAction<string>) {
      state.items = [...getItemsFromAdmin()].filter((obj) => obj.code !== action.payload);
      localStorage.setItem("items", JSON.stringify(state.items));
      state.items = getItemsFromAdmin()
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setTypes(state){
      state.categories = getTypes()
    },

    sortPriceASC(state) {
      state.items = state.items.sort((a,b) => a.price - b.price)
    },
    sortPriceDESC(state) {
      state.items = state.items.sort((a,b) => b.price - a.price)
    },
    sortTitleASC(state) {
      state.items = state.items.sort((a,b) => a.name.localeCompare(b.name))
    },
    sortTitleDESC(state) {
      state.items = state.items.sort((a,b) =>  b.name.localeCompare(a.name))
    },

    sortCat(state){
      if(state.currentCat.length){
        const findItem = state.categories.find((item: Categories) => {
          return item.name === state.currentCat
        })
        state.items = [...getItemsFromAdmin()].filter((i: ItemsType) => {
          return i.code === (findItem ? findItem.itemsCodes.find(item => item === i.code) : "")
        })
      } else {
        state.items = [...getItemsFromAdmin()]
      }
    },
    sort(state){
      let minVal=0, maxVal=1000000;
      if (state.filters.length > 1) {
        let helpArray: ItemsType[] = [],
          brandsArray: ItemsType[] = [],
          sellersArray: ItemsType[] = [];

        [...getItemsFromAdmin()].map(i => {
          state.filters.map(f => {
            if(i[f.key] === f.value && f.key === "brand") {
              brandsArray.push(i)
            }
            if(i[f.key] === f.value && f.key === "seller") {
              sellersArray.push(i)
            }
            if(f.key === "price"){
              minVal = +f.value[0];
              maxVal = +f.value[1];
            }
          })
        })
        if(sellersArray.length && brandsArray.length){
          sellersArray.map(s => {
            brandsArray.map(b => {
              if(s.code === b.code){
                helpArray.push(b)
              }
            })
          })
        } else if (sellersArray.length){
          helpArray = [...sellersArray]
        } else if (brandsArray.length){
          helpArray = [...brandsArray]
        }
        state.items = [...helpArray].filter(i => i.price>=minVal && i.price<=maxVal)

      } else if (state.filters.length === 1 && state.filters[0].key === "price") {
        minVal = +state.filters[0].value[0];
        maxVal = +state.filters[0].value[1];
        state.items = [...getItemsFromAdmin()].filter(i => i.price >= minVal && i.price <= maxVal)
      } else {
        state.items = [...getItemsFromAdmin()]
      }
    },
    setFilters(state, action){
      state.filters = [...action.payload]
    },
    setCategories(state, action){
      state.currentCat = action.payload
    },
  },
});
export const {
  updateItems,
  sort,
  sortCat,
  setFilters,
  setTypes,
  setCurrentPage,
  setCategories,
  addToLocalStorage,
  removeFromLocalStorage,
  sortPriceASC,
  sortPriceDESC,
  sortTitleASC,
  sortTitleDESC,
} = itemsSlice.actions;

export default itemsSlice.reducer;
