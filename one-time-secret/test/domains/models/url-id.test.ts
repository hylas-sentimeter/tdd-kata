import {UrlId} from '../../../src/domains/models/url-id';
import {UrlIdTooShortError} from '../../../src/domains/models/errors/url-id-too-short-error';

describe('UrlId tests', () => {
    it('should create instance of UrlId class', () => {
        expect(new UrlId('abcdaskfdljaskdl')).toBeInstanceOf(UrlId);
    });

    it('should throw UrlIdTooShortError if UrlId characters is less than 10', () => {
        expect(() => new UrlId('ab')).toThrow(UrlIdTooShortError);
    });
});
