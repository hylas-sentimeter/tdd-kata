import {Secret} from '../../../../src/domains/models/secret';
import {UrlId} from '../../../../src/domains/models/url-id';
import {OneTimeSecretRetriever} from '../../../../src/domains/use-cases/one-time-secret-retriever';
import {SecretRepository} from '../../../../src/domains/ports/out/secret-repository';

describe('OneTimeSecretRetriever Tests', () => {
    it('Should retrieve one-time-secret', async () => {
        const secretRepository: SecretRepository = {
            retrieveSecret: jest.fn().mockResolvedValue(new Secret('abc')),
            removeSecret: jest.fn(),
            storeUrlAndSecret: jest.fn()
        }

        const oneTimeSecretRetriever = new OneTimeSecretRetriever(secretRepository);
        const urlId: UrlId = new UrlId('abcdabcdabcd');
        expect(await oneTimeSecretRetriever.retrieveSecret(urlId)).toEqual(new Secret('abc'));
        expect(secretRepository.retrieveSecret).toHaveBeenCalledTimes(1);
        expect(secretRepository.removeSecret).toHaveBeenCalledTimes(1);

    });
});