const alphabets: { letter: string, value: number }[] = [{letter: "C", value: 100}, {letter: "XC", value: 90},{letter: "L", value: 50}, {letter: "XL", value: 40}, {
    letter: "X",
    value: 10
}, {letter: "IX", value: 9}, {letter: "V", value: 5}, {letter: "IV", value: 4}, {letter: "I", value: 1},]

export function romanNumerals(number: number): string {
    for (const alphabet of alphabets) {
        if (number >= alphabet.value) return alphabet.letter + romanNumerals(number - alphabet.value);
    }
    return ""

}