import { UrlId } from "../domain/models/url-id";
import {Secret} from '../domain/models/secret';

export interface SecretRetriever {
    retrieveSecretById(urlId: UrlId): Promise<Secret>;
}