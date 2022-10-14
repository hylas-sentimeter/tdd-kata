import {NextFunction, Request, Response} from 'express';
import {ValidationError} from '../../../domains/models/errors/validation-error';
import {SecretRetriever} from '../../../domains/ports/in/secret-retriever';
import {UrlId} from '../../../domains/models/url-id';
import {SecretStorer} from '../../../domains/ports/in/secret-storer';
import {Secret} from '../../../domains/models/secret';
import {TokenGenerator} from '../../../domains/ports/out/token-generator';

export class SecretsController {
    constructor(private storer: SecretStorer) {
    }

    createSecret = async (request: Request, response: Response, next: NextFunction) => {
        try {
            this.validateRequest(request);
            const urlId = await this.storer.storeSecret(new Secret(request.body.secret));
            response.status(201).json({urlId: urlId.toString()});
        } catch (e) {
            next(e);
        }
    };

    private validateRequest(request: Request) {
        if (!request.body?.secret || typeof request.body.secret !== 'string') throw new ValidationError('Request body is not valid');
    }
}