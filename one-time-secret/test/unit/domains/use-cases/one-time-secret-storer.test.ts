import {Secret} from '../../../../src/domains/models/secret';
import {UrlId} from '../../../../src/domains/models/url-id';
import {SecretRepository} from '../../../../src/domains/ports/out/secret-repository';
import {OneTimeSecretStorer} from '../../../../src/domains/use-cases/one-time-secret-storer';
import {TokenGenerator} from '../../../../src/domains/ports/out/token-generator';

describe('OneTimeSecretStorer Tests', () => {
    it('Should store secret and return UrlId after query', async () => {
        const repository: SecretRepository = {
            removeSecret: jest.fn(),
            retrieveSecret: jest.fn(),
            storeUrlAndSecret: jest.fn()
        };
        const tokenGenerator: TokenGenerator = {
            generateToken: jest.fn().mockReturnValue('abcdabcdabcd')
        };
        const secret = new Secret('abcd');
        const urlId = new UrlId('abcdabcdabcd');
        const secretStorer = new OneTimeSecretStorer(repository, tokenGenerator);
        expect(await secretStorer.storeSecret(secret)).toEqual(urlId);
    });
});