import {UrlId} from '../../domain/models/url-id';
import {Secret} from '../../domain/models/secret';

export interface SecretRepository {
    getSecretByUrlId(urlId: UrlId): Promise<Secret | null>;

    // removeSecret(urlId: UrlId): Promise<void>;
}