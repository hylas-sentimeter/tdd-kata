import mongoose from 'mongoose';
import {MongoSecretRepository} from '../../../../src/infra/repositories/mongo-secret-repository';
import {SecretModel} from '../../../../src/infra/repositories/secret-model';
import {UrlId} from '../../../../src/domain/models/url-id';
import {Secret} from '../../../../src/domain/models/secret';

describe('MongoSecretRepository test suite', function () {

    it('Should connect to database', () => {
        mongoose.connect = jest.fn();
        new MongoSecretRepository();

        expect(mongoose.connect).toBeCalledTimes(1);
        expect(mongoose.connect).toBeCalledWith('mongodb://localhost:27017/onetimesecret');
    });

    it('should not connect to database if connection is already stablished', function () {
        mongoose.connect = jest.fn();
        //@ts-ignore
        mongoose.connection.readyState = 1;
        new MongoSecretRepository();


        expect(mongoose.connect).toBeCalledTimes(0);
    });

    it('should return null if secret is not exist in the databse', async function () {
        SecretModel.findOne = jest.fn().mockResolvedValue(null);
        mongoose.connect = jest.fn();
        //@ts-ignore
        mongoose.connection.readyState = 1;
        const secretRepository = new MongoSecretRepository();
        const urlId = new UrlId('abcdabcdabcd');
        expect(await secretRepository.getSecretByUrlId(urlId)).toBe(null);
        expect(SecretModel.findOne).toBeCalledTimes(1);
        expect(SecretModel.findOne).toBeCalledWith({urlId: 'abcdabcdabcd'});
    });
    it('should return secret if secret is exist', async function () {
        SecretModel.findOne = jest.fn().mockResolvedValue({secret : 'abcd'});
        mongoose.connect = jest.fn();
        //@ts-ignore
        mongoose.connection.readyState = 1;
        const secretRepository = new MongoSecretRepository();
        const urlId = new UrlId('abcdabcdabcd');
        expect(await secretRepository.getSecretByUrlId(urlId)).toEqual(new Secret('abcd'));
        expect(SecretModel.findOne).toBeCalledTimes(1);
        expect(SecretModel.findOne).toBeCalledWith({urlId: 'abcdabcdabcd'});
    });
});