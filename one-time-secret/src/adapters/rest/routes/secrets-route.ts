import {Application} from 'express';
import {Route} from './route';
import {SecretsController} from '../controllers/secrets-controller';

export class SecretsRoute implements Route {
    constructor(private secretsController: SecretsController) {
    }

    mountRoute(app: Application): void {
        app.route('/api/v1/secrets').post(this.secretsController.createSecret);
    }
}