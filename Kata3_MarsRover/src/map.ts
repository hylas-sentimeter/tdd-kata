import {Point} from "./point";
import {Direction} from "./direction";


export class Map {

    readonly MAX_Y = 10;
    private MAX_X: number = 10;

    constructor(private obstacles?: Point[]) {
    }

    public moveNext(point: Point, direction: Direction): Point {
        let x = point.x;
        let y = point.y;

        if (direction.toString() === "N") y = (y + 1) % this.MAX_Y
        if (direction.toString() === "E") x = (x + 1) % this.MAX_X
        if (direction.toString() === "S") y = y === 0 ? this.MAX_Y - 1 : y - 1
        if (direction.toString() === "W") x = x === 0 ? this.MAX_X - 1 : x-1;
        this.validateMoveWithoutObstacle(new Point(x, y))
        return new Point(x, y);
    }

    private validateMoveWithoutObstacle(point: Point) {
        if(this.obstacles?.some(obstacle => obstacle.x === point.x && obstacle.y === point.y)) throw new Error("Cannot move this direction, Obstacle exists")
    }
}