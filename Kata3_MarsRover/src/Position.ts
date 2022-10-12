import {Direction} from "./Direction";

export class Position {
    x: number;
    y: number;

    constructor(y: number, x: number) {
        this.y = y
        this.x = x
    }

    toString() {
        return `${this.y},${this.x}`
    }
}