import 'hammerjs';
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
    
    public get isGameOver() : boolean {
        return this.gameOver;
    }

    public get valueMatrix(): number[][] {
        return this.gameBoard.map(row => row.map(cell => cell.value));
    }
    
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
        const hammer = new Hammer(canvasElement);
        hammer.get('swipe').set({ 
            direction: Hammer.DIRECTION_ALL 
        });
        hammer.on('swiperight', () => { 
            this.makeMove(this.Directions.RIGHT);
            this.canvasHelper.refreshBoard(this.gameBoard);
        });
        hammer.on('swipeleft', () => { 
            this.makeMove(this.Directions.LEFT);
            this.canvasHelper.refreshBoard(this.gameBoard);
        });
        hammer.on('swipeup', () => { 
            this.makeMove(this.Directions.UP);
            this.canvasHelper.refreshBoard(this.gameBoard);
        });
        hammer.on('swipedown', () => { 
            this.makeMove(this.Directions.DOWN);
            this.canvasHelper.refreshBoard(this.gameBoard);
        });
    }
    
    private makeMove(direction: number) {
        console.log('Moving ', direction);
        if (direction === this.Directions.LEFT) {
            this.updateBoardFromValues(MoveHelper.moveLeft(this.valueMatrix));
        } else if (direction === this.Directions.RIGHT) {
            this.updateBoardFromValues(MoveHelper.moveRight(this.valueMatrix));
        } else if (direction === this.Directions.UP) {
            this.updateBoardFromValues(MoveHelper.moveUp(this.valueMatrix));
        } else if (direction === this.Directions.DOWN) {
            this.updateBoardFromValues(MoveHelper.moveDown(this.valueMatrix));
        }
        
        const emptyCells = this.getAllEmptyCells();
        
        if (emptyCells.length === 0) {
            if (!MoveHelper.movesPossible(this.valueMatrix)) {
                this.gameOver = true;
                this.canvasHelper.showGameEndOverlay(this.gameBoard);
            }
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
    
    private updateBoardFromValues(values: number[][]) {
        for (let i=0; i<this.gameBoard.length; i++) {
            for (let j=0; j<this.gameBoard[i].length; j++) {
                this.gameBoard[i][j].value = values[i][j];
            }
        }
    }
}