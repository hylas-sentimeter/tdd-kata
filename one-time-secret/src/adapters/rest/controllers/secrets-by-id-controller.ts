import {NextFunction, Request, Response} from 'express';
import {ValidationError} from '../../../domains/models/errors/validation-error';
import {SecretRetriever} from '../../../domains/ports/in/secret-retriever';
import {UrlId} from '../../../domains/models/url-id';

export class SecretsByIdController {
    constructor(private retriever: SecretRetriever) {
    }

    retrieveSecretByUrlId = async (request: Request, response: Response, next: NextFunction) => {
        try {
            this.validateRequest(request);
            const secret = await this.retriever.retrieveSecret(new UrlId(request.params.urlId));
            response.status(200).json({secret: secret.toString()});
        } catch (e) {
            next(e);
        }
    };

    private validateRequest(request: Request) {
        if (!request.params?.urlId) {
            throw new ValidationError('Url is not valid');
        }
    }
}