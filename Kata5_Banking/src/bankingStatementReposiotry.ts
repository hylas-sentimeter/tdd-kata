import {StatementRepository} from './statementRepository';
import {Statement} from './statement';

export class BankingStatementRepository implements StatementRepository {
    private statements: Array<Statement> = new Array<Statement>();


    addStatement(statement: Statement): void {
        this.statements.push(statement);
    }

    getAllStatement(): Statement[] {
        return this.statements;
    }

}