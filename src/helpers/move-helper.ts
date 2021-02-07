import { BoardCell } from "../types/board-cell";

export class MoveHelper {
    public static moveRight(gameBoard: BoardCell[][]) {
        for (let i = 0; i < gameBoard.length; i++) {
            for (let j=1; j<gameBoard[i].length; j++) {
                const currentCell = gameBoard[i][j];
                const previousCell = gameBoard[i][j-1];
                
                if (currentCell.value === 0) {
                    currentCell.value = previousCell.value;
                    previousCell.value = 0;
                } else if (currentCell.value === previousCell.value) {
                    currentCell.value += currentCell.value;
                    previousCell.value = 0;
                }
            }
        }
    }
    
    public static moveLeft(gameBoard: BoardCell[][]) {
        for (let i = 0; i < gameBoard.length; i++) {
            for (let j=gameBoard[i].length - 2; j>=0; j--) {
                const currentCell = gameBoard[i][j];
                const previousCell = gameBoard[i][j+1];
                
                if (currentCell.value === 0) {
                    currentCell.value = previousCell.value;
                    previousCell.value = 0;
                } else if (currentCell.value === previousCell.value) {
                    currentCell.value += currentCell.value;
                    previousCell.value = 0;
                }
            }
        }
    }
    
    public static moveUp(gameBoard: BoardCell[][]) {
        for (let i = 0; i < gameBoard.length; i++) {
            for (let j=gameBoard[i].length-2; j>=0; j--) {
                const currentCell = gameBoard[j][i];
                const previousCell = gameBoard[j+1][i];
                
                if (currentCell.value === 0) {
                    currentCell.value = previousCell.value;
                    previousCell.value = 0;
                } else if (currentCell.value === previousCell.value) {
                    currentCell.value += currentCell.value;
                    previousCell.value = 0;
                }
            }
        }
    }
    
    public static moveDown(gameBoard: BoardCell[][]) {
        for (let i = 0; i < gameBoard.length; i++) {
            for (let j=1; j<gameBoard[i].length; j++) {
                const currentCell = gameBoard[j][i];
                const previousCell = gameBoard[j-1][i];
                
                if (currentCell.value === 0) {
                    currentCell.value = previousCell.value;
                    previousCell.value = 0;
                } else if (currentCell.value === previousCell.value) {
                    currentCell.value += currentCell.value;
                    previousCell.value = 0;
                }
            }
        }
    }
}