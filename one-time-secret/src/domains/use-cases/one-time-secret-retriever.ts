import {SecretRetriever} from '../ports/in/secret-retriever';
import {UrlId} from '../models/url-id';
import {Secret} from '../models/secret';
import {SecretRepository} from '../ports/out/secret-repository';

export class OneTimeSecretRetriever implements SecretRetriever {
    constructor(private repo: SecretRepository) {
    }

    async retrieveSecret(urlId: UrlId): Promise<Secret> {
        const secret = this.repo.retrieveSecret(urlId);
        await this.repo.removeSecret(urlId);
        return secret
    }

}