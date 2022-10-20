import express from 'express';
import {Route} from './routes/route';
import {errorHandling} from './middlewares/error-handling';

export class Application {
    private app: express.Application = express();

    constructor(routes: Route[]) {
        this.mountRoute(routes);

    }

    private mountRoute(routes: Route[]) {
        routes.forEach(route => route.mountRoute(this.app));
        this.app.use(errorHandling);
    }

    public getExpressApplication() {
        return this.app;
    }
}