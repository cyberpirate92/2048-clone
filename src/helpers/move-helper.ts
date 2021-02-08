export class MoveHelper {

    public static movesPossible(values: number[][]) {
        for (let i=0; i<values.length; i++) {
            for (let j=0; j<values[i].length; j++) {
                // TODO: Currently this method has O(n^3) complexity, try to optimize 
                const nextRight = this.getNextNonZeroValue(values, i, j, 'col');
                const nextBottom = this.getNextNonZeroValue(values, i, j, 'row');
                if (nextRight === values[i][j] || nextBottom === values[i][j]) {
                    return true;
                }
            }
        }
        return false;
    }

    private static getNextNonZeroValue(values: number[][], row: number, col: number, direction: 'col'|'row'): number {
        let r = row + 1;
        let c = col + 1;
        let value = -1;

        if (direction === 'row') {
            while (r < values.length) {
                if (values[r][col] !== 0) {
                    value = values[r][col];
                    break;
                }
            }
        } else if (direction === 'col') {
            while (c < values[row].length) {
                if (values[row][c] !== 0) {
                    value = values[row][c];
                    break;
                }
            }
        }
        return value;
    }

    public static moveRight(values: number[][]) {
        return this.makeMove(values, 'right');
    }

    public static moveLeft(values: number[][]) {
        return this.makeMove(values, 'left');
    }

    public static moveUp(values: number[][]) {
        this.transpose(values);
        this.moveLeft(values);
        this.transpose(values);
        return values;
    }

    public static moveDown(values: number[][]) {
        this.transpose(values);
        this.moveRight(values);
        this.transpose(values);
        return values;
    }

    public static transpose(values: any[][]) {
        for (let i=0; i<values.length; i++) {
            for (let j=0; j<=i; j++) {
                if (i !== j) {
                    const temp = values[i][j];
                    values[i][j] = values[j][i];
                    values[j][i] = temp;
                }
            }
        }
    }

    private static makeMove(values: number[][], direction: 'left'|'right') {
        for (let i=0; i<values.length; i++) {
            let stack = values[i].filter(x => x !== 0);
            
            if (direction === 'left') {
                stack = stack.reverse();
            }

            let temp = [];
            
            if (stack.length > 0) {
                let last = stack.pop() as number;
                while (stack.length > 0) {
                    let current = stack.pop() as number;
                    
                    if (current === last) {
                        temp.push(current + last);
                        last = -1;
                    } else {
                        if (last !== -1) {                        
                            temp.push(last);
                        }
                        last = current;
                    }      
                }

                if (last !== -1) {
                    temp.push(last);
                }
            }
            values[i].fill(0);
            if (direction === 'left') {
                for (let j=0; j<temp.length; j++) {
                    values[i][j] = temp[j];
                }
            } else {
                for (let j=temp.length - 1; j>= 0; j--) {
                    values[i][values.length-1-j] = temp[j];
                }
            }
        }
        return values;
    }
}