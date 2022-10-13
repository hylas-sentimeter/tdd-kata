import {TokenGenerator} from '../../domains/ports/out/token-generator';
import uniqid from 'uniqid'

export class UniqueTokenGenerator implements TokenGenerator {
    generateToken(): string {
        return uniqid();
    }
}