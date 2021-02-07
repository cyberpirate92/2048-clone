import { BoardCell } from './types/board-cell';
import { Position2D } from './types/position-2d';
import { MoveHelper } from './helpers/move-helper';
import { CanvasHelpers } from './helpers/canvas-helpers';

export class GameBoard {
    private gameOver = false;
    private moveCount: number;
    private gameBoard: BoardCell[][];
    private canvasHelper: CanvasHelpers;
    
    private Directions = Object.freeze({
        UP: 0,
        DOWN: 1,
        LEFT: 2,
        RIGHT: 3,
    });
    
    constructor(canvasElement: HTMLCanvasElement, size: number, initialBoard?: number[][]) {
        if (!canvasElement) {
            throw new Error('Canvas element not provided');
        } 
        
        this.moveCount = 0;
        this.canvasHelper = new CanvasHelpers(canvasElement.getContext('2d') as CanvasRenderingContext2D);
        this.gameBoard = initialBoard ? this.fromBoard(initialBoard) : this.generateRandomBoard(size);
        
        this.canvasHelper.drawBoard(this.gameBoard, 50, 50);
        this.canvasHelper.refreshBoard(this.gameBoard);
        this.initListeners(canvasElement);
    }
    
    public debugDump() {
        console.log(this.gameBoard);
    }
    
    public dumpGridValues() {
        const values = this.gameBoard.map(x => x.map(y => y.value));
        console.log(values);
    }
    
    private fromBoard(board: number[][]) {
        return board.map(row => row.map(col => {
            return {
                value: col,
                position: null,
                lastMoveId: this.moveCount,
            } as BoardCell;
        }));
    }
    
    private generateRandomBoard(size: number) {
        let board = (new Array(size)).fill(0).map( _ => (new Array(size)).fill(null).map( _ => {
            return {
                value: 0,
                position: null,
                lastMoveId: this.moveCount,
            } as BoardCell;
        }));
        
        // Generate 4 random numbers
        const indices = [0, 0, 0, 0].map( _ => Math.floor(Math.random() * size));
        board[indices[0]][indices[1]].value = board[indices[2]][indices[3]].value = 2;
        return board;
    }
    
    private initListeners(canvasElement: HTMLCanvasElement) {
        window.addEventListener('keyup', (keyEvent) => {
            if (this.gameOver) {
                console.log('Game over: Move ignored');
                return;
            }
            switch(keyEvent.key) {
                case 'Tab':
                this.debugDump();
                keyEvent.stopPropagation();
                break;
                
                case 'Enter':
                this.dumpGridValues();
                keyEvent.stopPropagation();
                break;
                
                case 'ArrowUp': 
                this.makeMove(this.Directions.UP);
                this.canvasHelper.refreshBoard(this.gameBoard);
                keyEvent.stopPropagation();
                break;
                
                case 'ArrowLeft': 
                this.makeMove(this.Directions.LEFT);
                this.canvasHelper.refreshBoard(this.gameBoard);
                keyEvent.stopPropagation();
                break;
                
                case 'ArrowRight': 
                this.makeMove(this.Directions.RIGHT);
                this.canvasHelper.refreshBoard(this.gameBoard);
                keyEvent.stopPropagation();
                break;
                
                case 'ArrowDown': 
                this.makeMove(this.Directions.DOWN);
                this.canvasHelper.refreshBoard(this.gameBoard);
                keyEvent.preventDefault();
                break;
            }
        });
        
        this.listenForSwipeEvents(canvasElement);
    }
    
    private listenForSwipeEvents(canvasElement: HTMLCanvasElement) {
        let touchStartX = 0, touchStartY = 0;
        let touchEndX = 0, touchEndY = 0;
        
        canvasElement.addEventListener('touchstart', (touchEvent) => {
            console.log('touchstart');
            touchStartX = touchEvent.changedTouches[0].screenX;
            touchStartY = touchEvent.changedTouches[0].screenY;
        }, { passive: true });
        
        canvasElement.addEventListener('touchend', (touchEvent) => {
            console.log('touchend');
            touchEndX = touchEvent.changedTouches[0].screenX;
            touchEndY = touchEvent.changedTouches[0].screenY;
            
            if (touchEndX <= touchStartX) {
                console.log('left');
                this.makeMove(this.Directions.LEFT);
            } else if (touchEndX >= touchStartX) {
                console.log('right');
                this.makeMove(this.Directions.RIGHT);
            } else if (touchEndY <= touchStartY) {
                console.log('up');
                this.makeMove(this.Directions.UP);
            } else if (touchEndY >= touchStartY) {
                console.log('down');
                this.makeMove(this.Directions.DOWN);
            }
        }, { passive: true }); 
    }
    
    private makeMove(direction: number) {
        if (direction === this.Directions.LEFT) {
            this.updateBoardFromValues(MoveHelper.moveLeft(this.toValueMatrix()));
        } else if (direction === this.Directions.RIGHT) {
            this.updateBoardFromValues(MoveHelper.moveRight(this.toValueMatrix()));
        } else if (direction === this.Directions.UP) {
            this.updateBoardFromValues(MoveHelper.moveUp(this.toValueMatrix()));
        } else if (direction === this.Directions.DOWN) {
            this.updateBoardFromValues(MoveHelper.moveDown(this.toValueMatrix()));
        }
        
        const emptyCells = this.getAllEmptyCells();
        
        if (emptyCells.length === 0) {
            this.gameOver = true;
            this.canvasHelper.showGameEndOverlay(this.gameBoard);
        } else if (emptyCells.length < 3) {
            emptyCells.forEach(cell => this.gameBoard[cell.row][cell.col].value = 2);
        } else {
            (new Array(2)).fill(0).map( _ => Math.floor(Math.random() * emptyCells.length))
            .forEach(i => this.gameBoard[emptyCells[i].row][emptyCells[i].col].value = 2);
        }
    }
    
    /**
    * Traverse gameboard and get all empty cells
    */
    private getAllEmptyCells() {
        const emptyCells: Position2D[] = [];
        for (let i=0; i<this.gameBoard.length; i++) {
            for (let j=0; j<this.gameBoard[i].length; j++) {
                if (this.gameBoard[i][j].value === 0) {
                    emptyCells.push({row: i, col: j});
                }
            }
        }
        return emptyCells;
    }
    
    private toValueMatrix() {
        return this.gameBoard.map(row => row.map(cell => cell.value));       
    }
    
    private updateBoardFromValues(values: number[][]) {
        for (let i=0; i<this.gameBoard.length; i++) {
            for (let j=0; j<this.gameBoard[i].length; j++) {
                this.gameBoard[i][j].value = values[i][j];
            }
        }
    }
}