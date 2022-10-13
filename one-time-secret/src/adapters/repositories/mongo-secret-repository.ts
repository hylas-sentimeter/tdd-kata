import {SecretRepository} from '../../domains/ports/out/secret-repository';
import {UrlId} from '../../domains/models/url-id';
import {Secret} from '../../domains/models/secret';
import mongoose from 'mongoose';
import {SecretModel} from './secret-model';
import {SecretNotFoundInRepositoryError} from '../../domains/models/errors/secret-not-found-in-repository-error';

export class MongoSecretRepository implements SecretRepository {
    constructor() {
        this.setConnection();
    }

    private async setConnection() {
        if (mongoose.connection?.readyState === 0) {
            await mongoose.connect('mongodb://localhost:27017/onetimesecret');
        }
    }

    async removeSecret(urlId: UrlId): Promise<void> {
        await SecretModel.deleteOne({
            urlId: urlId.toString()
        });
    }

    async retrieveSecret(urlId: UrlId): Promise<Secret> {
        const doc = await SecretModel.findOne({
            urlId: urlId.toString()
        });
        if (doc === null) throw new SecretNotFoundInRepositoryError();
        return new Secret(doc.secret);
    }

    async storeUrlAndSecret(urlId: UrlId, secret: Secret): Promise<void> {
        await SecretModel.create({
            urlId: urlId.toString(),
            secret: secret.toString()
        });
    }

}