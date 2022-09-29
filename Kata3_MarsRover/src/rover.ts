import {Map} from './map'
import {Point} from "./point";
import {Direction} from "./direction";

export class Rover {
    private direction: Direction = new Direction();
    private position: Point = new Point(0, 0);

    constructor(private map: Map) {
    }

    execute(commands: string): string {
        for (const command of commands) {
            if (command === 'R') this.direction.rotateRight()
            if (command === 'L') this.direction.rotateLeft();
            if (command === 'M') {
                try {
                this.position = this.map.moveNext(this.position, this.direction);

                }catch (e) {
                    if(e.message === 'Cannot move this direction, Obstacle exists') return `${this.position}:${this.direction},Obstacle!`
                }
            }
        }

        return `${this.position}:${this.direction}`
    }
}