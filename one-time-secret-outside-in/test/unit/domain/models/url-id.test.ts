import {UrlId} from '../../../../src/domain/models/url-id';
import {UrlIdValidationError} from '../../../../src/domain/errors/url-id-validation-error';

describe('UrlId tests', () => {
    it('Should create instance of UrlId', () => {
        const urlId = new UrlId('qwerasdfzxcv');
        expect(urlId).toBeInstanceOf(UrlId)
    })

    it('Should throw url validation error when attempting to create urlId with too short string', () => {
        expect(() => new UrlId('abcd')).toThrow(new UrlIdValidationError('UrlId is too short'))
    })

    it('should return prestation string when toString method is called', function () {
        const urlId = new UrlId('qwerasdfzxcv');
        expect(urlId.toString()).toBe('qwerasdfzxcv')
    });
})