import mongoose from 'mongoose';
import {MongoSecretRepository} from '../../../src/adapters/repositories/mongo-secret-repository';
import {Secret} from '../../../src/domains/models/secret';
import {UrlId} from '../../../src/domains/models/url-id';
import {SecretModel} from '../../../src/adapters/repositories/secret-model';
import {SecretNotFoundInRepositoryError} from '../../../src/domains/models/errors/secret-not-found-in-repository-error';

describe('MongoSecretRepository Tests', () => {
    it('Should connect mongodb when construct', () => {
        mongoose.connect = jest.fn();
        new MongoSecretRepository();
        expect(mongoose.connect).toBeCalledTimes(1);
        expect(mongoose.connect).toBeCalledWith('mongodb://localhost:27017/onetimesecret');
    });
    it('Should not connect mongodb when already connected', () => {
        mongoose.connect = jest.fn();
        // @ts-ignore
        mongoose.connection.readyState = 1;
        new MongoSecretRepository();
        expect(mongoose.connect).toBeCalledTimes(0);
    });
    it('Should get secret from mongo', async () => {
        // @ts-ignore
        mongoose.connection.readyState = 1;
        SecretModel.findOne = jest.fn().mockResolvedValue({secret: 'abcd'});
        const urlId = new UrlId('abcaabcaabca');
        const mongoSecretRepository = new MongoSecretRepository();
        expect(await mongoSecretRepository.retrieveSecret(urlId)).toEqual(new Secret('abcd'));
        expect(SecretModel.findOne).toBeCalledTimes(1);
        expect(SecretModel.findOne).toBeCalledWith({urlId: urlId.toString()});
    });
    it('Should throw an error when querying a secret that not exist on database', async () => {
        // @ts-ignore
        mongoose.connection.readyState = 1;
        SecretModel.findOne = jest.fn().mockResolvedValue(null);
        const urlId = new UrlId('abcaabcaabca');
        const mongoSecretRepository = new MongoSecretRepository();
        expect(mongoSecretRepository.retrieveSecret(urlId)).rejects.toThrow(SecretNotFoundInRepositoryError);
        expect(SecretModel.findOne).toBeCalledTimes(1);
        expect(SecretModel.findOne).toBeCalledWith({urlId: urlId.toString()});
    });
    it('Should remove secret from database', async () => {
        // @ts-ignore
        mongoose.connection.readyState = 1;
        SecretModel.deleteOne = jest.fn().mockResolvedValue(null);
        const urlId = new UrlId('abcaabcaabca');
        const mongoSecretRepository = new MongoSecretRepository();
        await mongoSecretRepository.removeSecret(urlId);
        expect(SecretModel.deleteOne).toBeCalledTimes(1);
        expect(SecretModel.deleteOne).toBeCalledWith({urlId: urlId.toString()});
    });
    it('Should create secret and UriId on database', async () => {
        // @ts-ignore
        mongoose.connection.readyState = 1;
        SecretModel.create = jest.fn();
        const urlId = new UrlId('abcaabcaabca');
        const secret = new Secret('abcd');
        const mongoSecretRepository = new MongoSecretRepository();
        await mongoSecretRepository.storeUrlAndSecret(urlId, secret);
        expect(SecretModel.create).toBeCalledTimes(1);
        expect(SecretModel.create).toBeCalledWith({urlId: urlId.toString(), secret: secret.toString()});
    });
});