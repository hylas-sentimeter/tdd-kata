import {UrlIdValidationError} from '../../../../src/domain/errors/url-id-validation-error';

describe('UrlIdValidationError tests', () => {
    it('Should create a UrlIdValidationError', () => {
        const error = new UrlIdValidationError('UrlId is too short');

        expect(error).toBeInstanceOf(UrlIdValidationError);
        expect(error.name).toBe('UrlIdValidationError');
        expect(error.message).toBe('UrlId is too short')
    })
})