import express from 'express';
import {Route} from './routes/route';
import {errorHandler} from './middlewares/error-handler';

export class Application {
    app: express.Application = express();

    constructor(private routeList: Route[]) {
        this.configureApp();
        this.mountRoutes();
    }

    private mountRoutes(): void {
        this.routeList.forEach(route => route.mountRoute(this.app));
        this.app.use(errorHandler);
    }

    private configureApp(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
    }

    public startServer(port: number): void {
        this.app.listen(port, () => {
            console.info(`Server listen on ${port}`);
        });
    }
}