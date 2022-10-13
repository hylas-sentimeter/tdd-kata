import {SecretRepository} from '../../domains/ports/out/secret-repository';
import {UrlId} from '../../domains/models/url-id';
import {Secret} from '../../domains/models/secret';
import mongoose from 'mongoose';

export class MongoSecretRepository implements SecretRepository {
    constructor() {
        this.setConnection();
    }

    private async setConnection() {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect('mongodb://localhost:27017/onetimesecret');
        }
    }

    removeSecret(urlId: UrlId): Promise<void> {
        return Promise.resolve(undefined);
    }

    retrieveSecret(urlId: UrlId): Promise<Secret> {
        return Promise.resolve(undefined);
    }

    storeUrlAndSecret(urlId: UrlId, secret: Secret): Promise<void> {
        return Promise.resolve(undefined);
    }

}