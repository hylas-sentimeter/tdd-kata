import {Route} from './adapters/rest/routes/route';
import {Application} from './adapters/rest/application';
import {SecretsRoute} from './adapters/rest/routes/secrets-route';
import {SecretsByIdRoute} from './adapters/rest/routes/secrets-by-id-route';
import {OneTimeSecretStorer} from './domains/use-cases/one-time-secret-storer';
import {SecretsController} from './adapters/rest/controllers/secrets-controller';
import {OneTimeSecretRetriever} from './domains/use-cases/one-time-secret-retriever';
import {MongoSecretRepository} from './adapters/repositories/mongo-secret-repository';
import {UniqueTokenGenerator} from './adapters/external-services/unique-token-generator';
import {SecretsByIdController} from './adapters/rest/controllers/secrets-by-id-controller';

const uniqidTokenGenerator = new UniqueTokenGenerator();
const mongoSecretRepository = new MongoSecretRepository();
const secretStorer = new OneTimeSecretStorer(mongoSecretRepository, uniqidTokenGenerator)
const secretRetriever = new OneTimeSecretRetriever(mongoSecretRepository)
const secretsController = new SecretsController(secretStorer)
const secretsByIdController = new SecretsByIdController(secretRetriever)

const secretsbyIdRoute = new SecretsByIdRoute(secretsByIdController);
const secretsRoute = new SecretsRoute(secretsController)

const routes: Route[] = [];
routes.push(secretsbyIdRoute)
routes.push(secretsRoute)

const application: Application = new Application(routes);
if(process.env.NODE_ENV !== 'test') {
application.startServer(parseInt(process.argv[1]) | 3000);

}

export default application
