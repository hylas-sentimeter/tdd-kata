const directions = ["N", "E", "S", "W"];

export class Direction {
    private position: number = 0;

    public toString(): string {
        return directions[this.position];
    }

    public rotateRight(): void {
        this.position++;
        if (this.position > 3) this.position = 0;
    }

    public rotateLeft(): void {
        this.position--;
        if (this.position < 0) this.position = 3;
    }
}