import {UrlIdTooShortError} from './errors/url-id-too-short-error';

export class UrlId {
    constructor(private id: string) {
        if(id.length < 10) throw new UrlIdTooShortError()
    }

    toString(): string {
        return this.id;
    }
}