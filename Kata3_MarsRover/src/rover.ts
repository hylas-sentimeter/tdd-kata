import {Direction} from "./Direction";
import {Position} from "./Position";
import {Map} from './Map'

export class Rover {
    private direction: Direction = new Direction();
    private position: Position = new Position(0, 0);

    constructor(private map: Map) {
    }

    execute(commands: string): string {
        for (const command of commands) {
            if (command === 'R') this.direction.rotateRight();
            if (command === 'L') this.direction.rotateLeft();
            if (command === 'M') {
                try {
                    this.position = this.map.moveNext(this.position, this.direction);
                }catch (e) {
                    if(e.message === 'Blocked by obstacle') return `${this.position}:${this.direction},Obstacle!`
                }
            }
        }
        return `${this.position}:${this.direction}`
    }
}