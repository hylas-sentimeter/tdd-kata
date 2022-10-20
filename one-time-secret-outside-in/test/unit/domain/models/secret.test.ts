import {Secret} from '../../../../src/domain/models/secret';
import {SecretValidationError} from '../../../../src/domain/errors/secret-validation-error';

describe('Secret tests', () => {
    it('Should create instance of secret', () => {
        const secret = new Secret('abcd');
        expect(secret).toBeInstanceOf(Secret);
    });

    it('Should throw error if secret string length is less than 3 characters', () => {
        expect(() => new Secret('ab')).toThrow(SecretValidationError);
    });
    it('Should return presentation string when toString method is called', () => {
        const secret = new Secret('presentationstring')
        expect(secret.toString()).toBe('presentationstring');
    });
});