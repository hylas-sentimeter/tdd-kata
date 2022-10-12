import {visit} from '../src/visit';

describe('VisitDoors tests', () => {
    it('Should all door closed', () => {
        const doors: string = String().padEnd(100, '#');
        expect(doors.length).toBe(100);
        expect(doors.indexOf('@')).toBe(-1);
    });
    it('Should first pass all door open', () => {
        let doors: string = String().padEnd(10, '#');
        doors = visit(doors, 1);
        expect(doors.length).toBe(10);
        expect(doors.indexOf('#')).toBe(-1);
    });

    it('Should second pass half door open', () => {
        let doors: string = String().padEnd(100, '#');
        doors = visit(doors, 2);
        expect(doors.length).toBe(100);
        let openedCount = 0;
        for (const door of doors) {
            if (door === '#') openedCount++;
        }
        expect(openedCount).toBe(50);
    });
    it('Should third pass 1/3 door open', () => {
        let doors: string = String().padEnd(100, '#');
        doors = visit(doors, 3);
        expect(doors.length).toBe(100);
        let openedCount = 0;
        for (const door of doors) {
            if (door === '@') openedCount++;
        }
        expect(openedCount).toBe(33);
    });
    it('Should 100th pass one door open', () => {
        let doors: string = String().padEnd(100, '#');
        doors = visit(doors, 100);
        expect(doors.length).toBe(100);
        let openedCount = 0;
        for (const door of doors) {
            if (door === '@') openedCount++;
        }
        expect(openedCount).toBe(1);
        expect(doors.indexOf('@')).toBe(99);
    });
    it('Should close opened door', () => {
        let doors: string = String().padEnd(100, '@');
        doors = visit(doors, 2);
        expect(doors.length).toBe(100);
        let openedCount = 0;
        for (const door of doors) {
            if (door === '@') openedCount++;
        }
        expect(openedCount).toBe(50);
    })
});

