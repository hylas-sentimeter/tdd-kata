import {Application} from './infra/rest/application';
import {Route} from './infra/rest/routes/route';
import {SecretsByIdRoute} from './infra/rest/routes/secrets-by-id-route';
import {SecretsByIdController} from './infra/rest/controllers/secrets-by-id-controller';
import {SecretRetriever} from './services/secret-retriever';
import {Secret} from './domain/models/secret';
import {UrlId} from './domain/models/url-id';
import {OneTimeSecretRetriever} from './services/one-time-secret-retriever';
import {MongoSecretRepository} from './infra/repositories/mongo-secret-repository';


const secretRepository = new MongoSecretRepository()
const secretRetriever = new OneTimeSecretRetriever(secretRepository);
const secretByIdController: SecretsByIdController = new SecretsByIdController(secretRetriever);
const secretByIdRoute: SecretsByIdRoute = new SecretsByIdRoute(secretByIdController);
const routes: Route[] = [];
routes.push(secretByIdRoute);

const app = new Application(routes);
const expressApplication = app.getExpressApplication();


export default expressApplication;