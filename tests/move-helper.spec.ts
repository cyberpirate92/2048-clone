import { expect } from "chai";
import { TestUtils } from "./test-utils";
import { MoveHelper } from '../src/helpers/move-helper';

describe('Transpose', () => {
    it('transpose 01', () => {
        const values = [
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 10, 11, 12],
            [13, 14, 15, 16],
        ];

        const expected = [
            [1, 5, 9, 13],
            [2, 6, 10, 14],
            [3, 7, 11, 15],
            [4, 8, 12, 16],
        ];
        
        MoveHelper.transpose(values);
        expect(values).to.eql(expected, TestUtils.dumpValues(expected, values));
    });

    it ('transpose 02', () => {
        const values = [
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 10, 11, 12],
            [13, 14, 15, 16],
        ];

        const expected = JSON.parse(JSON.stringify(values));
        MoveHelper.transpose(values);
        MoveHelper.transpose(values);
        expect(values).to.eql(expected, TestUtils.dumpValues(expected, values));
    });
});

describe('Right Move Tests', () => {
    it('Move right 01', () => {
        const values = [
            [2, 0, 2, 0],
            [2, 2, 2, 2],
            [0, 2, 2, 0],
            [0, 2, 2, 2],
        ];
        
        const expected = [
            [0, 0, 0, 4],
            [0, 0, 4, 4],
            [0, 0, 0, 4],
            [0, 0, 2, 4],
        ];
        
        MoveHelper.moveRight(values);
        expect(values).to.be.eql(expected, TestUtils.dumpValues(expected, values));
    });
    
    it('Move right 02', () => {
        const values = [
            [2, 2, 2, 2],
            [0, 2, 2, 2],
            [2, 2, 2, 0],
            [4, 2, 2, 4],
        ];
        
        const expected = [
            [0, 0, 4, 4],
            [0, 0, 2, 4],
            [0, 0, 2, 4],
            [0, 4, 4, 4],
        ];
        
        MoveHelper.moveRight(values);
        expect(values).to.be.eql(expected, TestUtils.dumpValues(expected, values));
    });

    it ('Move right 03', () => {
        const values = [
            [2, 4, 2, 4],
            [16, 4, 4, 2],
            [2, 4, 8, 8],
            [8, 4, 2, 16]
        ];
        
        const expected = [
            [2, 4, 2, 4],
            [0, 16, 8, 2],
            [0, 2, 4, 16],
            [8, 4, 2, 16],
        ];
        
        MoveHelper.moveRight(values);
        expect(values).to.be.eql(expected, TestUtils.dumpValues(expected, values));
    });

    it('Move right 04', () => {
        const values = [
            [2, 2, 2, 2],
            [4, 4, 4, 4],
            [8, 8, 8, 8],
            [16, 16, 16, 16],
        ];

        const expected = [
            [0, 0, 4, 4],
            [0, 0, 8, 8],
            [0, 0, 16, 16],
            [0, 0, 32, 32],
        ];

        MoveHelper.moveRight(values);
        expect(values).to.be.eql(expected, TestUtils.dumpValues(expected, values));
    });
});

describe('Left Move Tests', () => {
    it('Move left 01', () => {
        const values = [
            [2, 0, 2, 0],
            [2, 2, 2, 2],
            [0, 2, 2, 0],
            [0, 2, 2, 2],
        ];
        
        const expected = [
            [4, 0, 0, 0],
            [4, 4, 0, 0],
            [4, 0, 0, 0],
            [4, 2, 0, 0],
        ];
        
        MoveHelper.moveLeft(values);
        expect(values).to.be.eql(expected, TestUtils.dumpValues(expected, values));
    });
    
    it('Move left 02', () => {
        const values = [
            [2, 2, 2, 2],
            [0, 2, 2, 2],
            [2, 2, 2, 0],
            [4, 2, 2, 4],
        ];
        
        const expected = [
            [4, 4, 0, 0],
            [4, 2, 0, 0],
            [4, 2, 0, 0],
            [4, 4, 4, 0],
        ];
        
        MoveHelper.moveLeft(values);
        expect(values).to.be.eql(expected, TestUtils.dumpValues(expected, values));
    });

    it ('Move left 03', () => {
        const values = [
            [2, 4, 2, 4],
            [16, 4, 4, 2],
            [2, 4, 8, 8],
            [8, 4, 2, 16]
        ];
        
        const expected = [
            [2, 4, 2, 4],
            [16, 8, 2, 0],
            [2, 4, 16, 0],
            [8, 4, 2, 16],
        ];
        
        MoveHelper.moveLeft(values);
        expect(values).to.be.eql(expected, TestUtils.dumpValues(expected, values));
    });

    it('Move left 04', () => {
        const values = [
            [2, 2, 2, 2],
            [4, 4, 4, 4],
            [8, 8, 8, 8],
            [16, 16, 16, 16],
        ];

        const expected = [
            [4, 4, 0, 0],
            [8, 8, 0, 0],
            [16, 16, 0, 0],
            [32, 32, 0, 0],
        ];

        MoveHelper.moveLeft(values);
        expect(values).to.be.eql(expected, TestUtils.dumpValues(expected, values));
    });
});

describe('Top Move Tests', () => {
    it('Move top 01', () => {
        const values = [
            [2, 0, 2, 0],
            [2, 2, 2, 2],
            [0, 2, 2, 0],
            [0, 2, 2, 2],
        ];
        
        const expected = [
            [4, 4, 4, 4],
            [0, 2, 4, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ];
        
        MoveHelper.moveUp(values);
        expect(values).to.be.eql(expected, TestUtils.dumpValues(expected, values));
    });
    
    it('Move top 02', () => {
        const values = [
            [2, 2, 2, 2],
            [0, 2, 2, 4],
            [2, 2, 2, 2],
            [4, 2, 2, 4],
        ];
        
        const expected = [
            [4, 4, 4, 2],
            [4, 4, 4, 4],
            [0, 0, 0, 2],
            [0, 0, 0, 4],
        ];
        
        MoveHelper.moveUp(values);
        expect(values).to.be.eql(expected, TestUtils.dumpValues(expected, values));
    });

    it('Move top 03', () => {
        const values = [
            [2, 4, 8, 16],
            [16, 8, 4, 2],
            [8, 4, 2, 16],
            [8, 2, 16, 4],
        ];
        
        const expected = [
            [2, 4, 8, 16],
            [16, 8, 4, 2],
            [16, 4, 2, 16],
            [0, 2, 16, 4],
        ];
        
        MoveHelper.moveUp(values);
        expect(values).to.be.eql(expected, TestUtils.dumpValues(expected, values));
    });

    it('Move top 04', () => {
        const values = [
            [2, 2, 2, 2],
            [4, 4, 4, 4],
            [8, 8, 8, 8],
            [16, 16, 16, 16],
        ];

        const expected = [
            [2, 2, 2, 2],
            [4, 4, 4, 4],
            [8, 8, 8, 8],
            [16, 16, 16, 16],
        ];

        MoveHelper.moveUp(values);
        expect(values).to.be.eql(expected, TestUtils.dumpValues(expected, values));
    });
});

describe('Down Move Tests', () => {
    it('Move down 01', () => {
        const values = [
            [2, 0, 2, 0],
            [2, 2, 2, 2],
            [0, 2, 2, 0],
            [0, 2, 2, 2],
        ];
        
        const expected = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 2, 4, 0],
            [4, 4, 4, 4],
        ];
        
        MoveHelper.moveDown(values);
        expect(values).to.be.eql(expected, TestUtils.dumpValues(expected, values));
    });
    
    it('Move down 02', () => {
        const values = [
            [2, 2, 2, 2],
            [0, 2, 2, 4],
            [2, 2, 2, 2],
            [4, 2, 2, 4],
        ];
        
        const expected = [
            [0, 0, 0, 2],
            [0, 0, 0, 4],
            [4, 4, 4, 2],
            [4, 4, 4, 4],
        ];
        
        MoveHelper.moveDown(values);
        expect(values).to.be.eql(expected, TestUtils.dumpValues(expected, values));
    });

    it('Move down 03', () => {
        const values = [
            [2, 4, 8, 16],
            [16, 8, 4, 2],
            [8, 4, 2, 16],
            [8, 2, 16, 4],
        ];
        
        const expected = [
            [0, 4, 8, 16],
            [2, 8, 4, 2],
            [16, 4, 2, 16],
            [16, 2, 16, 4],
        ];
        
        MoveHelper.moveDown(values);
        expect(values).to.be.eql(expected, TestUtils.dumpValues(expected, values));
    });

    it('Move down 04', () => {
        const values = [
            [2, 2, 2, 2],
            [4, 4, 4, 4],
            [8, 8, 8, 8],
            [16, 16, 16, 16],
        ];

        const expected = [
            [2, 2, 2, 2],
            [4, 4, 4, 4],
            [8, 8, 8, 8],
            [16, 16, 16, 16],
        ];

        MoveHelper.moveDown(values);
        expect(values).to.be.eql(expected, TestUtils.dumpValues(expected, values));
    });
});

describe('Has Possible moves?', () => {
    it('test 01', () => {
        const values = [
            [2, 2, 2, 2],
            [4, 4, 4, 4],
            [8, 8, 8, 8],
            [16, 16, 16, 16],
        ];

        const result = MoveHelper.movesPossible(values);
        expect(result).to.be.true;
    });

    it('test 02', () => {
        const values = [
            [2, 4, 2, 4],
            [4, 2, 4, 2],
            [8, 16, 8, 16],
            [16, 8, 16, 8],
        ];

        const result = MoveHelper.movesPossible(values);
        expect(result).to.be.false;
    });
});