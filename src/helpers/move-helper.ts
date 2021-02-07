export class MoveHelper {
    public static moveRight(values: number[][]) {
        for (let i=0; i<values.length; i++) {
            let stack = values[i].filter(x => x !== 0);
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
            for (let j=temp.length - 1; j>= 0; j--) {
                values[i][values.length-1-j] = temp[j];
            }
        }
        return values;
    }

    public static moveLeft(values: number[][]) {
        for (let i=0; i<values.length; i++) {
            let stack = values[i].filter(x => x !== 0).reverse();
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
            for (let j=0; j<temp.length; j++) {
                values[i][j] = temp[j];
            }
        }
        return values;
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
}