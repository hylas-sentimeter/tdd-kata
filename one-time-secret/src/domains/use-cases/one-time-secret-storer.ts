import {SecretStorer} from '../ports/in/secret-storer';
import {Secret} from '../models/secret';
import {UrlId} from '../models/url-id';
import {SecretRepository} from '../ports/out/secret-repository';
import {TokenGenerator} from '../ports/out/token-generator';

export class OneTimeSecretStorer implements SecretStorer {
    constructor(private repo: SecretRepository, private tokenGenerator: TokenGenerator) {
    }

    async storeSecret(secret: Secret): Promise<UrlId> {
        const token = this.tokenGenerator.generateToken();
        const urlId = new UrlId(token);
        await this.repo.storeUrlAndSecret(urlId, secret);
        return urlId;
    }
}