import { MoveHelper } from '../src/helpers/move-helper';
import { BoardCell } from '../src/types/board-cell';
import { expect } from 'chai';
import 'mocha';

class TestUtils {
    public static toBoardCell(values: number[][]): BoardCell[][] {
        return values.map(row => row.map(value => {
            return {
                value: value,
                position: { x: 0, y: 0 },
                lastMoveId: 0,
            };
        }));
    }
    
    public static toValueMatrix(cells: BoardCell[][]): number[][] {
        return cells.map(row => row.map(cell => cell.value));
    }
}

describe('MoveHelper #1: Basic Moves', () => { 
    
    let initialBoard = [
        [2, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 2],
    ];
    
    it('Move Up', () => { 
        const expected = [
            [2, 0, 0, 2],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ];
        
        const cells = TestUtils.toBoardCell(initialBoard);
        MoveHelper.moveUp(cells);
        
        const actual = TestUtils.toValueMatrix(cells);
        expect(actual).to.eql(expected);

        initialBoard = actual;
    });

    it('Move down', () => {
        const expected = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [2, 0, 0, 2],
        ];
        
        const cells = TestUtils.toBoardCell(initialBoard);
        MoveHelper.moveDown(cells);
        
        const actual = TestUtils.toValueMatrix(cells);
        expect(actual).to.eql(expected);
        
        initialBoard = actual;
    });

    it('Move left', () => {
        const expected = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [4, 0, 0, 0],
        ];
        
        const cells = TestUtils.toBoardCell(initialBoard);
        MoveHelper.moveLeft(cells);
        
        const actual = TestUtils.toValueMatrix(cells);
        expect(actual).to.eql(expected);

        initialBoard = actual;
    });

    it('Move right', () => {
        const expected = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 4],
        ];
        const cells = TestUtils.toBoardCell(initialBoard);
        MoveHelper.moveRight(cells);

        const actual = TestUtils.toValueMatrix(cells);
        expect(actual).to.eql(expected);

        initialBoard = actual;
    });
});

describe('MoveHelper #2: Basic Movement, Additions', () => {

    let initialBoard = [
        [0, 2, 0, 0],
        [2, 0, 2, 2],
        [0, 2, 0, 2],
        [2, 0, 2, 0],
    ];

    it('Move Up', () => { 
        const expected = [
            [4, 4, 4, 4],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ];
        
        const cells = TestUtils.toBoardCell(initialBoard);
        MoveHelper.moveUp(cells);
        
        const actual = TestUtils.toValueMatrix(cells);
        expect(actual).to.eql(expected);
    });

    it('Move Left', () => { 
        const expected = [
            [2, 0, 0, 0],
            [4, 0, 0, 0],
            [4, 0, 0, 0],
            [2, 0, 0, 0],
        ];
        
        const cells = TestUtils.toBoardCell(initialBoard);
        MoveHelper.moveLeft(cells);
        
        const actual = TestUtils.toValueMatrix(cells);
        expect(actual).to.eql(expected);
    });

    it('Move Right', () => {
        const expected = [
            [0, 0, 0, 2],
            [0, 0, 0, 4],
            [0, 0, 0, 4],
            [0, 0, 0, 2],
        ];

        const cells = TestUtils.toBoardCell(initialBoard);
        MoveHelper.moveRight(cells);
        
        const actual = TestUtils.toValueMatrix(cells);
        expect(actual).to.eql(expected);
    });

    it('Move Down', () => {
        const expected = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [4, 4, 4, 4],
        ];

        const cells = TestUtils.toBoardCell(initialBoard);
        MoveHelper.moveDown(cells);
        
        const actual = TestUtils.toValueMatrix(cells);
        expect(actual).to.eql(expected);
    });
});

describe('MoveHelper #3: Move priority', () => { 
    
    let initialBoard = [
        [2, 0, 0, 0],
        [2, 0, 0, 0],
        [2, 0, 0, 0],
        [2, 0, 0, 0],
    ];
    
    it('Move Up', () => { 
        const expected = [
            [4, 0, 0, 0],
            [4, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ];
        
        const cells = TestUtils.toBoardCell(initialBoard);
        MoveHelper.moveUp(cells);
        
        const actual = TestUtils.toValueMatrix(cells);
        expect(actual).to.eql(expected);

        initialBoard = actual;
    });

    it('Move up further', () => {
        const expected = [
            [8, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ];
        
        const cells = TestUtils.toBoardCell(initialBoard);
        MoveHelper.moveDown(cells);
        
        const actual = TestUtils.toValueMatrix(cells);
        expect(actual).to.eql(expected);
        
        initialBoard = actual;
    });
});