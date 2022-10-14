import {Secret} from '../../models/secret';
import {UrlId} from '../../models/url-id';

export interface SecretStorer {
    storeSecret(secret: Secret): Promise<UrlId>;
}