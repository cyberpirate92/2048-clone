import { TILE_STYLES } from '../tile-styles';
import { BoardCell } from "../types/board-cell";

const DEFAULTS = Object.freeze({
    BORDER_COLOR: '#000',
    FONT_SIZE: 30,
    FONT_FAMILY: 'serif',
    SQUARE_SIDE_LENGTH: 60,
});

export class CanvasHelpers {
    private canvasContext;

    constructor(canvasContext: CanvasRenderingContext2D) {
        this.canvasContext = canvasContext;
        this.fillElement();
    }

    private fillElement() {
        this.canvasContext.canvas.width = window.innerWidth;
        this.canvasContext.canvas.height = window.innerHeight;
    }

    public drawBoard(board: BoardCell[][], startX: number = 0, startY: number = 0) {
        let curX = startX;
        let curY = startY;

        for (let i=0; i<board.length; i++) {
            for (let j=0; j<board[i].length; j++) {
                board[i][j].position = { x: curX, y: curY };
                board[i][j].canvasRef = this.drawSquare(
                    curX, 
                    curY, 
                    DEFAULTS.SQUARE_SIDE_LENGTH, 
                    this.getBackgroundColor(board[i][j].value), 
                    DEFAULTS.BORDER_COLOR
                );
                curX += DEFAULTS.SQUARE_SIDE_LENGTH;
            }
            curY += DEFAULTS.SQUARE_SIDE_LENGTH;
            curX = 0;
        }
    }

    public refreshBoard(board: BoardCell[][]) {
        for (let i=0; i<board.length; i++) {
            for (let j=0; j<board[i].length; j++) {
                this.updateCellValue(board[i][j]);
            }
        }
    }

    private drawRectangle(posX: number, posY: number, width: number, height: number, fillColor: string, strokeColor: string) {
        const rectangle = new Path2D();
        rectangle.rect(posX, posY, width, height);
        
        if (fillColor) {
            this.canvasContext.fillStyle = fillColor;
        }
        this.canvasContext.fill(rectangle);

        if (strokeColor) {
            this.canvasContext.strokeStyle = strokeColor;
        }
        this.canvasContext.stroke(rectangle);
        return rectangle;
    }

    private drawSquare(posX: number, posY: number, sideLength: number, fillColor: string, strokeColor: string) {
        return this.drawRectangle(posX, posY, sideLength, sideLength, fillColor, strokeColor);
    }

    private updateCellValue(boardCell: BoardCell) {
        const fillColor = this.getBackgroundColor(boardCell.value);
        const fontColor = this.getTextColor(boardCell.value);
        
        if (boardCell.canvasRef) {
            if (fillColor) {
                this.canvasContext.fillStyle = fillColor;
            }
            this.canvasContext.fill(boardCell.canvasRef);
            
            this.canvasContext.strokeStyle = DEFAULTS.BORDER_COLOR;
            this.canvasContext.stroke(boardCell.canvasRef);

            if (boardCell.value) {
                this.drawText(boardCell.value, boardCell, fontColor);
            }
        }
    }

    private drawText(text: number, boardCell: BoardCell, textColor: string) {
        if (text && boardCell.position) {
            if (textColor) {
                this.canvasContext.fillStyle = textColor;
            }
            
            const posX = boardCell.position.x + (DEFAULTS.SQUARE_SIDE_LENGTH / 2.5) - this.calculateOffset(boardCell.value);
            const posY = boardCell.position.y + (DEFAULTS.SQUARE_SIDE_LENGTH / 1.5);

            this.canvasContext.font = `${this.getFontSizeForValue(boardCell.value)}px ${DEFAULTS.FONT_FAMILY}`;
            this.canvasContext.strokeStyle = textColor;

            this.canvasContext.fillText(`${text}`, posX, posY, DEFAULTS.SQUARE_SIDE_LENGTH);
            this.canvasContext.strokeText(`${text}`, posX, posY, DEFAULTS.SQUARE_SIDE_LENGTH);
        } else {
            console.warn('Invalid arguments', arguments);
        }
    }

    private getFontSizeForValue(value: number) {
        return DEFAULTS.FONT_SIZE - (Math.log2(value) * 0.5);
    }

    private getBackgroundColor(value: number) {
        return TILE_STYLES[`${value}`]?.background || '';
    }

    private getTextColor(value: number) {
        return TILE_STYLES[`${value}`]?.color || '';
    }

    private calculateOffset(value: number) {
        return Math.log2(value) * 0.5;
    }
}