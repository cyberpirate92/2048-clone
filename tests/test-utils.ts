import { BoardCell } from '../src/types/board-cell';

export class TestUtils {
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

    public static toString(matrix: number[][]) {
        let string = '';
        matrix.forEach(row => {
            string += '\n';
            string += row.join(',\t');
        });
        return string;
    }

    public static dumpValues(expected: number[][], actual: number[][]) {
        return `\nExpected\n${TestUtils.toString(expected)}\n\nActual\n${TestUtils.toString(actual)}\n`;
    }
}