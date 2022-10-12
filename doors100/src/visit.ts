export function visit(doors: string, pass: number): string {
    for (let i = 0; i < doors.length; i++) {
        if ((i + 1) % pass === 0) {
            doors = doors.substring(0, i) + toggleDoor(doors[i]) + doors.substring(i + 1);
        }
    }
    return doors;
}

function toggleDoor(door: string): string {
    return door === '#' ? '@' : '#';
}