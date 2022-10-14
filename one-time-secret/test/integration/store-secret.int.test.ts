import mongoose from 'mongoose';
import supertest from 'supertest';
import server from '../../src/server';
import {SecretModel} from '../../src/adapters/repositories/secret-model';

const request = supertest(server.app);

describe('Store secret from one time secret API integration tests', () => {
    it('Should store a secret in the database', async () => {
        //@ts-ignore
        mongoose.connection.readyState = 1;
        SecretModel.create = jest.fn();
        const res = await request.post('/api/v1/secrets').send({secret: '1234'});
        expect(res.status).toBe(201);
        expect(res.body.urlId.length).toBeGreaterThanOrEqual(10);
        expect(SecretModel.create).toBeCalledTimes(1);
        expect(SecretModel.create).toBeCalledWith({urlId: res.body.urlId, secret: '1234'});
    });
    it('Should throw error when sending secret length is less than 3 charcters ', async () => {
        //@ts-ignore
        mongoose.connection.readyState = 1;
        SecretModel.create = jest.fn();
        const res = await request.post('/api/v1/secrets').send({secret: '11'});
        expect(res.status).toBe(400);
        expect(res.body).toEqual({
            name: 'SecretTooShortError',
            message: 'Secret is less than 3 characters'
        });
        expect(SecretModel.create).toBeCalledTimes(0);
    });
});