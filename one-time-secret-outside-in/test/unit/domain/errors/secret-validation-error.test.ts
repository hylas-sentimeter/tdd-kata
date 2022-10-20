import {SecretValidationError} from '../../../../src/domain/errors/secret-validation-error';

describe('SecretValidationError tests', () => {
    it('Should create instance of SecretValidationError', () => {
        const error: SecretValidationError = new SecretValidationError('Secret is too short');
        expect(error.name).toBe('SecretValidationError');
        expect(error.message).toBe('Secret is too short')
    })
})