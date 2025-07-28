import {describe, expect, test} from 'vitest';
import {formattedCurrency, formattedNumber} from "./index";

describe('utils', function () {
    test('formatted currency', function () {
        const values = [0.5, 10.2, -10.333];
        const expected = ['0,50 €', '10,20 €', '-10,33 €'];

        values.forEach((value, index) => expect(formattedCurrency(value)).toEqual(expected[index]));
    });

    test('formatted number', function () {
        const values = [0.5, 10.2, -10.333];
        const expected = ['0,50', '10,20', '-10,33'];

        values.forEach((value, index) => expect(formattedNumber(value)).toEqual(expected[index]));
    });
});
