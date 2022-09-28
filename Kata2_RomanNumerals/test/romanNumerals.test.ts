/*
Example results:
1 >> I          21 >> XXI
2 >> II         50 >> L
3 >>> III       97 >> XCVII
4 >>> IV        100 >> C
5 >> V          500 >> D
9 >> IX         1000 >> M
*/


import {romanNumerals} from "../src/romanNumerals";

describe('RomanNumerals tests', () => {
    it("Should return I when send 1", () => {
        expect(romanNumerals(1)).toBe("I");
    })
    it("Should return II when send 2", () => {
        expect(romanNumerals(2)).toBe("II");
    })
    it("Should return III when send 3", () => {
        expect(romanNumerals(3)).toBe("III");
    })
    it("Should return V when send 5", () => {
        expect(romanNumerals(5)).toBe("V");
    })
    it("Should return IV when send 4", () => {
        expect(romanNumerals(4)).toBe("IV");
    })
    it("Should return X when send 10", () => {
        expect(romanNumerals(10)).toBe("X");
    })
    it("Should return IX when send 9", () => {
        expect(romanNumerals(9)).toBe("IX");
    })
    it("Should return XI when send 11", () => {
        expect(romanNumerals(11)).toBe("XI");
    })
    it("Should return L when send 50", () => {
        expect(romanNumerals(50)).toBe("L");
    })
    it("Should return XLII when send 42", () => {
        expect(romanNumerals(42)).toBe("XLII");
    })
    it("Should return LXXIV when send 74", () => {
        expect(romanNumerals(74)).toBe("LXXIV");
    })
    it("Should return CIV when send 104", () => {
        expect(romanNumerals(104)).toBe("CIV");
    })
    it("Should return XCVII when send 97", () => {
        expect(romanNumerals(97)).toBe("XCVII");
    })

});
