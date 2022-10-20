import {SecretRetriever} from './secret-retriever';
import {UrlId} from '../domain/models/url-id';
import {Secret} from '../domain/models/secret';
import {SecretNotFoundError} from '../domain/errors/secret-not-found-error';
import {SecretRepository} from '../infra/repositories/secret-repository';

export class OneTimeSecretRetriever implements SecretRetriever {
    constructor(private secretRepository: SecretRepository) {
    }

    async retrieveSecretById(urlId: UrlId): Promise<Secret> {
        const secret = await this.secretRepository.getSecretByUrlId(urlId);
        if(secret === null) throw new SecretNotFoundError();
        return secret
    }
}