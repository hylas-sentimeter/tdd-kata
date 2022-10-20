import {SecretNotFoundError} from '../../../../src/domain/errors/secret-not-found-error';

describe('SecretNotFoundError test', () => {
    it('Should create SecretNotFoundError', () => {
        const error = new SecretNotFoundError();
        expect(error.name).toBe('SecretNotFoundError');
        expect(error.message).toBe('Secret was not found')
    })
})