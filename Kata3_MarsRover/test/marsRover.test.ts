import {Map} from "../src/Map";
import {Rover} from "../src/Rover";


describe('MarsRover Tests', () => {
    it('Should rotate right 90 degrees', () => {
        const rover = new Rover(new Map());
        expect(rover.execute("R")).toBe("0,0:E")
    });
    it('Should rotate right 360 degrees', () => {
        const rover = new Rover(new Map());
        expect(rover.execute("RRRR")).toBe("0,0:N")
    });
    it('Should rotate left 90 degrees', () => {
        const rover = new Rover(new Map());
        expect(rover.execute("L")).toBe("0,0:W")
    });
    it('Should move upward 1 step', () =>{
        const rover = new Rover(new Map());
        expect(rover.execute("M")).toBe('1,0:N')
    })
    it('Should move right 1 step', () =>{
        const rover = new Rover(new Map());
        expect(rover.execute("RM")).toBe('0,1:E')
    })
    it('Should move downward 1 step', () =>{
        const rover = new Rover(new Map());
        expect(rover.execute("MMMRRMM")).toBe('1,0:S')
    })
    it('Should move left 1 step', () =>{
        const rover = new Rover(new Map());
        expect(rover.execute("RMMMRRMM")).toBe('0,1:W')
    })
    it('Should move upper max distance', () =>{
        const rover = new Rover(new Map());
        expect(rover.execute("MMMMMMMMMMM")).toBe('1,0:N')
    })
    it('Should move downward max distance', () =>{
        const rover = new Rover(new Map());
        expect(rover.execute("RRMMMMMMMMMMM")).toBe('9,0:S')
    })
    it('Should move right max distance', () =>{
        const rover = new Rover(new Map());
        expect(rover.execute("RMMMMMMMMMMM")).toBe('0,1:E')
    })
    it('Should move left max distance', () =>{
        const rover = new Rover(new Map());
        expect(rover.execute("LMMMMMMMMMMM")).toBe('0,9:W')
    })
    it('Should block by obstacle', () =>{
        const rover = new Rover(new Map([{y: 2, x: 0}]));
        expect(rover.execute("MM")).toBe('1,0:N,Obstacle!')
    })
});