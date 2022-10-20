import express from 'express';
import {Route} from './route';
import {SecretsByIdController} from '../controllers/secrets-by-id-controller';

export class SecretsByIdRoute implements Route {
    constructor(private secretsByIdController: SecretsByIdController) {
    }

    mountRoute(app: express.Application): void {
        app.get('/api/v1/secrets/:urlId', this.secretsByIdController.retrieveSecretById);
    }
}