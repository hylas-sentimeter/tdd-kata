import {SecretNotFoundError} from '../../../src/domain/errors/secret-not-found-error';
import {OneTimeSecretRetriever} from '../../../src/services/one-time-secret-retriever';
import {SecretRepository} from '../../../src/infra/repositories/secret-repository';
import {UrlId} from '../../../src/domain/models/url-id';

describe('OneTimeSecretRetriever test suite', () => {
    it('Should throw SecretNotFoundError if secret is not exist', () => {
        const secretRepository: SecretRepository = {
            getSecretByUrlId: jest.fn().mockResolvedValue(null),
        };

        const oneTimeSecretRetriever = new OneTimeSecretRetriever(secretRepository);
        expect(oneTimeSecretRetriever.retrieveSecretById(new UrlId('abcdabcdabcd'))).rejects.toThrow(SecretNotFoundError);
    });


});