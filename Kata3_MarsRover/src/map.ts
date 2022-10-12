import {Position} from "./Position";
import {Direction} from "./Direction";

export class Map {
    MAX_X = 9;
    MAX_Y = 9;

    constructor(private obstacles?: { y: number, x: number }[]) {
    }

    moveNext(point: Position, direction: Direction) {
        let x: number = point.x;
        let y: number = point.y;

        if(direction.toString() === 'N') y = y >= this.MAX_Y ?  0 : y + 1 ;
        if(direction.toString() === 'E') x = x >= this.MAX_X ?  0 : x + 1;
        if(direction.toString() === 'S') y = y === 0 ?  this.MAX_Y : y - 1;
        if(direction.toString() === 'W') x = x  === 0 ?  this.MAX_X : x - 1;


        this.validateMoveNextWithObstacles(new Position(y, x));
        return new Position(y, x);
    }

    private validateMoveNextWithObstacles(position: Position) {
        if(this.obstacles?.some(obstacle => obstacle.x === position.x && obstacle.y === position.y)) throw new Error('Blocked by obstacle')
    }
}