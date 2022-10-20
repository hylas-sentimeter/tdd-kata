import {SecretRepository} from './secret-repository';
import {UrlId} from '../../domain/models/url-id';
import {Secret} from '../../domain/models/secret';
import mongoose from 'mongoose';
import {SecretModel} from './secret-model';

export class MongoSecretRepository implements SecretRepository {
    constructor() {
        if (mongoose.connection.readyState !== 1) {
            mongoose.connect('mongodb://localhost:27017/onetimesecret');
        }
    }

    async getSecretByUrlId(urlId: UrlId): Promise<Secret | null> {
        const doc = await SecretModel.findOne({urlId: urlId.toString()});
        if(doc === null) return null;
        return new Secret(doc.secret);
    }
}