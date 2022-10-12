import {Copier} from '../src/copier';
import {Source} from '../src/source';
import {Destination} from '../src/destination';

describe('Copier Tests', () => {
    it('Should construct instance of copier class', () => {
        const source: Source = {
            readChar: jest.fn(),
        };
        const destination: Destination = {
            writeChar: jest.fn()
        };
        expect(new Copier(source, destination)).toBeInstanceOf(Copier);
    });
    it('Should copy three character', () => {
        const source: Source = {
            readChar: jest.fn().mockReturnValueOnce('a').mockReturnValueOnce('b').mockReturnValueOnce('c').mockReturnValueOnce('\n')
        };
        const destination: Destination = {
            writeChar: jest.fn()
        };
        const copier = new Copier(source, destination);
        copier.copy();
        expect(source.readChar).toBeCalledTimes(4);
        expect(destination.writeChar).toBeCalledTimes(3);
        expect(destination.writeChar).toHaveBeenNthCalledWith(1, 'a');
        expect(destination.writeChar).toHaveBeenNthCalledWith(2, 'b');
        expect(destination.writeChar).toHaveBeenNthCalledWith(3, 'c');
    });
});
