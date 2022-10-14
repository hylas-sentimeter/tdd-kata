import {Application} from 'express';
import {Route} from './route';
import {SecretsController} from '../controllers/secrets-controller';
import {SecretsByIdController} from '../controllers/secrets-by-id-controller';

export class SecretsByIdRoute implements Route {
    constructor(private secretsByIdController: SecretsByIdController) {
    }

    mountRoute(app: Application): void {
        app.route('/api/v1/secrets/:urlId').get(this.secretsByIdController.retrieveSecretByUrlId);
    }
}