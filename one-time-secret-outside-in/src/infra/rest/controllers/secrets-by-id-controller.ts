import {NextFunction, Request, Response} from 'express';
import {UrlId} from '../../../domain/models/url-id';
import {SecretRetriever} from '../../../services/secret-retriever';

export class SecretsByIdController {

    constructor(private secretRetriever: SecretRetriever) {
    }

    retrieveSecretById = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const urlId = new UrlId(request.params.urlId);
            const secret = await this.secretRetriever.retrieveSecretById(urlId);
            response.status(200).json({ secret : secret.toString()})
        } catch (e) {
            next(e);
        }
    };
}