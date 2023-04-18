import {CartItem} from "../store/cart/types";
import data from "../test.json"
import {calcTotalPrice} from "../utils/calcTotalPrice";


describe('calcTotalPrice', () => {
    const testCart = [{"code": "383269032632", "count": 5}, {
        "code": "383269032632",
        "count": 10
    }, {"code": "383269032633", "count": 1}];
    const fullTestCart: CartItem[] = [];
    [...data].map(i => {
        fullTestCart.push({code: i.code, count: 1})
    })
    const fullTestCartManyCount: CartItem[] = [];
    [...data].map(i => {
        fullTestCartManyCount.push({code: i.code, count: 2})
    })

    test('testCart', () => {
        expect(calcTotalPrice(testCart)).toBe(42560)
    })
    test('all JSON data', () => {
        expect(Math.ceil(calcTotalPrice(fullTestCart))).toBe(69728)
    })

    test('all JSON data many count', () => {
        expect(Math.ceil(calcTotalPrice(fullTestCartManyCount))).toBe(139455)
    })
})