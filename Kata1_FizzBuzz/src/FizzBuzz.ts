export function fizzBuzz(input: number): string {
    if (input % 5 === 0 && input % 3 === 0) return "FizzBuzz";
    if (input % 5 === 0) return "Buzz";
    if (input % 3 === 0) return "Fizz";
    return input.toString()
};