import mongoose from 'mongoose';
import {MongoSecretRepository} from '../../../src/adapters/repositories/mongo-secret-repository';

describe('MongoSecretRepository Tests', () => {
    it('Should connect mongodb when construct', () => {
        mongoose.connect = jest.fn();
        new MongoSecretRepository();
        expect(mongoose.connect).toBeCalledTimes(1);
        expect(mongoose.connect).toBeCalledWith('mongodb://localhost:27017/onetimesecret')
    })
    it('Should not connect mongodb when already connected', () => {
        mongoose.connect = jest.fn();
        // @ts-ignore
        mongoose.connection.readyState = 1
        new MongoSecretRepository();
        expect(mongoose.connect).toBeCalledTimes(0);
    })
})