import {Secret} from '../../../src/domains/models/secret';
import {SecretTooShortError} from '../../../src/domains/models/errors/secret-too-short-error';
import {UrlId} from '../../../src/domains/models/url-id';

describe('Secret tests', () => {
    it('should create instance of secret class', () => {
        expect(new Secret("abcd")).toBeInstanceOf(Secret);
    });

    it('should throw SecretTooShortError if secret characters is less than 3', () => {
        expect(() => new Secret("ab")).toThrow(SecretTooShortError);
    })
    it('should return string presentation on the toString method', () => {
        const secret = new Secret('abcdaskfdljaskdl');
        expect(secret.toString()).toBe('abcdaskfdljaskdl');
    });
});
