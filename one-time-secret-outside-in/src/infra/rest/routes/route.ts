import express from 'express';

export interface Route {
    mountRoute(app: express.Application): void;
}