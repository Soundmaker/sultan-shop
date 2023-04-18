import {countAmount} from "../utils/calcTotalAmount";

describe('calcTotalAmount', () => {

    test("array of numbers", () => {
        expect(countAmount([1, 2, 3, 4, 5, 6, 7, 8])).toBe(8);
    })
    test("array of null", () => {
        expect(countAmount([])).toBe(0);
    })
    test("array of 1 element", () => {
        expect(countAmount([6])).toBe(1);
    })

    test("array of objects", () => {
        expect(countAmount([
            {a: 1, b: 3},
            {a: 1, b: 3},
            {a: 1, b: 3},
            {a: 1, b: 3},
            {a: 1, b: 3},
            {a: 1, b: 3},
            {a: 1, b: 3},
            {a: 1, b: 3},
        ])).toBe(8)
    })
    
})
