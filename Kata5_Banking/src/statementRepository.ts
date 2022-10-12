import {Statement} from './statement';

export interface StatementRepository {
    addStatement(statement: Statement): void;

    getAllStatement(): Statement[];
}