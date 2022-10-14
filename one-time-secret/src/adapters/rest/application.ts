import express from 'express';

export class Application {
    app: express.Application = express();

    constructor() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
    }
}