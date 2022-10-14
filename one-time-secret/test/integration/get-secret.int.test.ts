import mongoose from 'mongoose';
import supertest from 'supertest';
import server from '../../src/server';
import {SecretModel} from '../../src/adapters/repositories/secret-model';

const request = supertest(server.app);

describe('Get secret from one time secret API integration tests', () => {
    it('Should retrieve a secret from database', async () => {
        //@ts-ignore
        mongoose.connection.readyState = 1;
        SecretModel.findOne = jest.fn().mockResolvedValue({secret: '1234'});
        SecretModel.deleteOne = jest.fn();
        const res = await request.get('/api/v1/secrets/1234112341234');
        expect(res.status).toBe(200);
        expect(res.body).toEqual({secret: '1234'});
        expect(SecretModel.findOne).toBeCalledTimes(1);
        expect(SecretModel.findOne).toBeCalledWith({urlId: '1234112341234'});
        expect(SecretModel.deleteOne).toBeCalledTimes(1);
        expect(SecretModel.deleteOne).toBeCalledWith({urlId: '1234112341234'});
    });
    it('Should throw SecretNotFoundInRepositoryError if secret is not exists from database', async () => {
        //@ts-ignore
        mongoose.connection.readyState = 1;
        SecretModel.findOne = jest.fn().mockResolvedValue(null);
        SecretModel.deleteOne = jest.fn();
        const res = await request.get('/api/v1/secrets/1234112341234');
        expect(res.status).toBe(404);
        expect(res.body).toEqual({ name: 'SecretNotFoundInRepositoryError', message: 'Secret was not found on database'});
        expect(SecretModel.findOne).toBeCalledTimes(1);
        expect(SecretModel.findOne).toBeCalledWith({urlId: '1234112341234'});
        expect(SecretModel.deleteOne).toBeCalledTimes(0);
    });
});