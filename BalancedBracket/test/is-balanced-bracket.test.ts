import {isBalancedBracket} from '../src/is-balanced-bracket';

describe('IsBalancedBracket Tests', () => {
    it('Should return empty string if input is empty string', () => {
        expect(isBalancedBracket('')).toBe('');
    });
    it('Should return Fail  if first character is closed bracket', () => {
        expect(isBalancedBracket(']')).toBe('Fail');
    });
    it('Should return True if first two character are pair', () => {
        expect(isBalancedBracket('[]')).toBe('Success');
    });
    it('Should return True if order is nested two pair', () => {
        expect(isBalancedBracket('[[]]')).toBe('Success');
    });
    it('Should return True if order is nested three pair', () => {
        expect(isBalancedBracket('[[[]]]')).toBe('Success');
    });
    it('Should return True if order is not nested two pair', () => {
        expect(isBalancedBracket('[][]')).toBe('Success');
    });
    it('Should return True if order end with opened bracket', () => {
        expect(isBalancedBracket('[][')).toBe('Fail');
    });
    it('Should return True if order end with two opened bracket', () => {
        expect(isBalancedBracket('[][[')).toBe('Fail');
    });
    it('Should return True if order end with closed bracket', () => {
        expect(isBalancedBracket('[][')).toBe('Fail');
    });
});
