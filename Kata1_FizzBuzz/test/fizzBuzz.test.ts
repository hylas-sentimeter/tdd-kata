import {fizzBuzz} from '../src/fizzBuzz'

describe('FizzBuzz tests', () => {
    it("Should return 1 when send 1", () => {
        expect(fizzBuzz(1)).toBe("1");
    })

    it("Should return Fizz when send 3", () => {
        expect(fizzBuzz(3)).toBe("Fizz");
    })

    it("Should return Buzz when send 5", () => {
        expect(fizzBuzz(5)).toBe("Buzz");
    })

    it("Should return FizzBuzz when send 15", () => {
        expect(fizzBuzz(15)).toBe("FizzBuzz");
    })

});
