export class Statement {
    constructor(private date: Date, private amount: number, private balance: number) {

    }

    toString() {
        const month = this.date.getMonth() + 1;

        return `${this.date.getDate()}.${month < 10 ? '0' : ''}${month}.${this.date.getFullYear()}\t\t${this.amount < 0 ? '' : '+'}${this.amount}\t\t${this.balance}`;
    }
}