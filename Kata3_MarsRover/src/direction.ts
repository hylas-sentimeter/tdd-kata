const directions = ['N', 'E', 'S', 'W']

export class Direction {
    private position = 0;

    rotateRight() {
        this.position++;
        if (this.position > 3) this.position = 0;
    }
    rotateLeft() {
        this.position--;
        if (this.position < 0) this.position = 3;
    }

    toString(): string {
        return directions[this.position];
    }
}