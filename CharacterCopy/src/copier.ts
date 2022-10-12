import {Source} from './source';
import {Destination} from './destination';

export class Copier {
    constructor(private source: Source, private destination: Destination) {

    }

    copy() {
        while (true) {
        const char = this.source.readChar();
        if(!char || char === '\n') break;
        this.destination.writeChar(char);
        }
    }
}