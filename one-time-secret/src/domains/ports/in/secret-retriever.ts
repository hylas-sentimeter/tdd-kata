import {UrlId} from '../../models/url-id';
import {Secret} from '../../models/secret';

export interface SecretRetriever {
    retrieveSecret(urlId: UrlId): Promise<Secret>
}