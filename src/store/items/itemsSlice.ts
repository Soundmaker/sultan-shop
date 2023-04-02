import {createSlice, PayloadAction} from '@reduxjs/toolkit';
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
    currentCategory: "",
    brands: [...[...new Set([...getItemsFromAdmin()].map(i => i.brand))].sort((a, b) => a.localeCompare(b))],
    manufacturers: [...[...new Set([...getItemsFromAdmin()].map(i => i.seller))].sort((a, b) => a.localeCompare(b))],
};


const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        updateItems(state) {
            state.items = getItemsFromAdmin()
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
        setTypes(state) {
            state.categories = getTypes()
        },

        sortPriceASC(state) {
            state.items = state.items.sort((a, b) => a.price - b.price)
        },
        sortPriceDESC(state) {
            state.items = state.items.sort((a, b) => b.price - a.price)
        },
        sortTitleASC(state) {
            state.items = state.items.sort((a, b) => a.title.localeCompare(b.title))
        },
        sortTitleDESC(state) {
            state.items = state.items.sort((a, b) => b.title.localeCompare(a.title))
        },

        sortCategory(state) {
            if (state.currentCategory.length) {
                const findItem = state.categories.find((item: Categories) => {
                    return item.name === state.currentCategory
                })
                state.items = [...getItemsFromAdmin()].filter((i: ItemsType) => {
                    return i.barcode === (findItem ? findItem.itemsCodes.find(item => item === i.barcode) : "")
                })
            } else {
                state.items = [...getItemsFromAdmin()]
            }
        },
        sort(state) {
            let minVal = 0, maxVal = 1000000;
            if (state.filters.length > 1) {
                let helpArray: ItemsType[] = [],
                    brandsArray: ItemsType[] = [],
                    manufacturersArray: ItemsType[] = [];

                [...getItemsFromAdmin()].map(i => {
                    state.filters.map(f => {
                        if (i[f.key] === f.value && f.key === "brand") {
                            brandsArray.push(i)
                        }
                        if (i[f.key] === f.value && f.key === "manufacturer") {
                            manufacturersArray.push(i)
                        }
                        if (f.key === "price") {
                            minVal = +f.value[0];
                            maxVal = +f.value[1];
                        }
                    })
                })
                if (manufacturersArray.length && brandsArray.length) {
                    manufacturersArray.map(s => {
                        brandsArray.map(b => {
                            if (s.barcode === b.barcode) {
                                helpArray.push(b)
                            }
                        })
                    })
                } else if (manufacturersArray.length) {
                    helpArray = [...manufacturersArray]
                } else if (brandsArray.length) {
                    helpArray = [...brandsArray]
                }
                state.items = [...helpArray].filter(i => i.price >= minVal && i.price <= maxVal)

            } else if (state.filters.length === 1 && state.filters[0].key === "price") {
                minVal = +state.filters[0].value[0];
                maxVal = +state.filters[0].value[1];
                state.items = [...getItemsFromAdmin()].filter(i => i.price >= minVal && i.price <= maxVal)
            } else {
                state.items = [...getItemsFromAdmin()]
            }
        },
        setFilters(state, action) {
            state.filters = [...action.payload]
        },
        setCategories(state, action) {
            state.currentCategory = action.payload
        },
    },
});
export const {
    updateItems,
    sort,
    sortCategory,
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
