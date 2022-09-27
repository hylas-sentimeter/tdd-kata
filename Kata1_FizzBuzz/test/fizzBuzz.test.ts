import {fizzBuzz} from "../src/FizzBuzz";

describe('FizzBuzz tests', () => {
    it('Should return 1 when sending 1', () => {
        expect(fizzBuzz(1)).toBe("1");
    });
    it('Should return Fizz when sending 3', () => {
        expect(fizzBuzz(3)).toBe("Fizz");
    });
    it('Should return Buzz when sending 5', () => {
        expect(fizzBuzz(5)).toBe("Buzz");
    });
    it('Should return FizzBuzz when sending 15', () => {
        expect(fizzBuzz(15)).toBe("FizzBuzz");
    });
});
