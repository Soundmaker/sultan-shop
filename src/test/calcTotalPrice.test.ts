import {CartItem} from "../store/cart/types";
import data from "../test.json"
import {calcTotalPrice} from "../utils/calcTotalPrice";


describe('calcTotalPrice', () => {
    const testCart = [{"code": "383269032632", "count": 5}, {
        "code": "383269032633",
        "count": 10
    }, {"code": "383269032634", "count": 1}];
    const fullTestCart: CartItem[] = [];
    [...data].map(i => {
        fullTestCart.push({code: i.code, count: 1})
    })
    const fullTestCartManyCount1: CartItem[] = [];
    [...data].map(i => {
        fullTestCartManyCount1.push({code: i.code, count: 2})
    })

    const fullTestCartManyCount2: CartItem[] = [];
    [...data].map(i => {
        fullTestCartManyCount2.push({code: i.code, count: 5})
    })

    test('testCart', () => {
        expect(calcTotalPrice(testCart)).toBe(39421)
    })
    test('all JSON data', () => {
        expect(Math.ceil(calcTotalPrice(fullTestCart))).toBe(69722)
    })

    test('all JSON data many count 1', () => {
        expect(Math.ceil(calcTotalPrice(fullTestCartManyCount1))).toBe(139443)
    })

    test('all JSON data many count 2', () => {
        expect(Math.ceil(calcTotalPrice(fullTestCartManyCount2))).toBe(348608)
    })
})