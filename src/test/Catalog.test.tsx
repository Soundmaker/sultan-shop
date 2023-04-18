import {cleanup, fireEvent, render, screen,} from "@testing-library/react";
import '@testing-library/jest-dom';
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import cart from "../store/cart/cartSlice";
import App from "../App";
import {MemoryRouter} from "react-router";
import {CATALOG_ROUTE} from "../utils/consts";
import items from "../store/items/itemsSlice";
import ItemsType from "../types/items-type";
import data from '../test.json';

describe('Catalog tests', () => {
    global.scrollTo = jest.fn()

    beforeEach(() => {
        const mockStore = configureStore({reducer: {items, cart}});
        render(
            <Provider store={mockStore}>
                <MemoryRouter initialEntries={[CATALOG_ROUTE]}>
                    <App/>
                </MemoryRouter>
            </Provider>
        );
    })

    afterEach(cleanup)

    test('filter by category', async () => {
        fireEvent.click(screen.getByText("УХОД ЗА ТЕЛОМ"))

        await (() => {
            [...data].filter((i: ItemsType) => {
                if (i.code === "6" || i.code === "7" || i.code === "12") {

                    return expect(screen.findByTestId(i.code)).toBeInTheDocument();
                } else {
                    return expect(screen.findByTestId(i.code)).not.toBeInTheDocument();
                }
            })
        })
    });

    it('should be on page', () => {
        expect(screen.queryByText('Цена')).toBeInTheDocument()
        expect(screen.queryByText('Производитель')).toBeInTheDocument()
        expect(screen.queryByText('Бренд')).toBeInTheDocument()
        expect(screen.queryByText('Рейтинг')).not.toBeInTheDocument()
    });

});