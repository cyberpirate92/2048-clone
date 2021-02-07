import { TILE_STYLES } from '../tile-styles';
import { BoardCell } from "../types/board-cell";
import { Coordinates } from '../types/coordinates';

const DEFAULTS = Object.freeze({
    FONT_SIZE: 35,
    BORDER_WIDTH: 2,
    CELL_PADDING: 10,
    BORDER_RADIUS: 5,
    BORDER_COLOR: '#000',
    SQUARE_SIDE_LENGTH: 75,
    SHADOW_BLUR_STRENGTH: 3,
    FONT_FAMILY: 'sans-serif',
    GAME_OVER_FONT_COLOR: '#777',
    GAME_OVER_FILL_COLOR: '#edcf72',
});

export class CanvasHelpers {
    private canvasContext;
    private begin: Coordinates = { 
        x: 0, 
        y: 0 
    };
    private gridWrapper: Path2D | any;

    constructor(canvasContext: CanvasRenderingContext2D) {
        this.canvasContext = canvasContext;
        this.fillElement();
        this.canvasContext.textAlign = 'center';
        this.gridWrapper = null;
    }

    private fillElement() {
        this.canvasContext.canvas.width = window.innerWidth;
        this.canvasContext.canvas.height = window.innerHeight;
    }

    public drawBoard(board: BoardCell[][], startX: number = 0, startY: number = 0) {
        this.begin.x = startX;
        this.begin.y = startY;

        // Draw a bounding box around grid
        const sideLength = this.calculateWrapperLength(board.length);
        this.gridWrapper = this.drawRoundedSquare(startX, startY, sideLength, DEFAULTS.BORDER_RADIUS, '#776E65', '#776E65');

        let curX = startX + DEFAULTS.CELL_PADDING;
        let curY = startY + DEFAULTS.CELL_PADDING;

        for (let i=0; i<board.length; i++) {
            for (let j=0; j<board[i].length; j++) {
                board[i][j].position = { x: curX, y: curY };
                board[i][j].canvasRef = this.drawRoundedSquare(
                    curX, 
                    curY, 
                    DEFAULTS.SQUARE_SIDE_LENGTH,
                    DEFAULTS.BORDER_RADIUS,
                    this.getBackgroundColor(board[i][j].value), 
                    '',
                );
                curX += DEFAULTS.SQUARE_SIDE_LENGTH + DEFAULTS.CELL_PADDING;
            }
            curY += DEFAULTS.SQUARE_SIDE_LENGTH + DEFAULTS.CELL_PADDING;
            curX = startX + DEFAULTS.CELL_PADDING;
        }
    }

    public refreshBoard(board: BoardCell[][]) {
        for (let i=0; i<board.length; i++) {
            for (let j=0; j<board[i].length; j++) {
                this.updateCellValue(board[i][j]);
            }
        }
    }

    private drawRoundedSquare(posX: number, posY: number, sideLength: number, radius: number, fillStyle: string, strokeStyle: string) {
        return this.drawRoundedRectangle(posX, posY, sideLength, sideLength, radius, fillStyle, strokeStyle);
    }

    private drawRoundedRectangle(posX: number, posY: number, width: number, height: number, radius: number, fillStyle: string, strokeStyle: string) {
        const roundedRectangle = new Path2D();
        roundedRectangle.moveTo(posX + radius, posY);
        
        roundedRectangle.lineTo(posX + width - radius, posY);
        roundedRectangle.quadraticCurveTo(posX + width, posY, posX + width, posY + radius);
        
        roundedRectangle.lineTo(posX + width, posY + height - radius);
        roundedRectangle.quadraticCurveTo(posX + width, posY + height, posX + width - radius, posY + height);
        
        roundedRectangle.lineTo(posX + radius, posY + height);
        roundedRectangle.quadraticCurveTo(posX, posY + height, posX, posY + height - radius);
        
        roundedRectangle.lineTo(posX, posY + radius);
        roundedRectangle.quadraticCurveTo(posX, posY, posX + radius, posY);
        roundedRectangle.closePath();

        if (fillStyle) {
            this.canvasContext.fillStyle = fillStyle;
            this.canvasContext.fill(roundedRectangle);
        }
        if (strokeStyle) {
            this.canvasContext.strokeStyle = strokeStyle;
            this.canvasContext.stroke(roundedRectangle);
        }

        return roundedRectangle;
    }

    private updateCellValue(boardCell: BoardCell, isGameOver: boolean = false) {
        const fillColor = isGameOver ? DEFAULTS.GAME_OVER_FILL_COLOR : this.getBackgroundColor(boardCell.value);
        const fontColor = isGameOver ? DEFAULTS.GAME_OVER_FONT_COLOR : this.getTextColor(boardCell.value);
        
        if (boardCell.canvasRef) {
            if (!isGameOver) {
                this.setShadow('#777', DEFAULTS.SHADOW_BLUR_STRENGTH);
            }
            if (fillColor) {
                this.canvasContext.fillStyle = fillColor;
            }

            this.canvasContext.fill(boardCell.canvasRef);
            
            if (boardCell.value) {
                this.drawCellValue(boardCell.value, boardCell, fontColor);
            }
        }
    }

    private drawCellValue(value: number, boardCell: BoardCell, fontColor: string) {
        if (value && boardCell.position) {
            if (fontColor) {
                this.canvasContext.fillStyle = fontColor;
            }
            
            const posX = boardCell.position.x + (DEFAULTS.SQUARE_SIDE_LENGTH / 2);
            const posY = boardCell.position.y + (DEFAULTS.SQUARE_SIDE_LENGTH / 1.5);

            this.canvasContext.font = `${this.getFontSizeForValue(boardCell.value)}px ${DEFAULTS.FONT_FAMILY}`;
            this.canvasContext.strokeStyle = fontColor;
            this.canvasContext.lineWidth = 1;

            this.disableShadow();
            this.canvasContext.fillText(`${value}`, posX, posY, DEFAULTS.SQUARE_SIDE_LENGTH);
            this.canvasContext.strokeText(`${value}`, posX, posY, DEFAULTS.SQUARE_SIDE_LENGTH);
        } else {
            console.warn('Invalid arguments', arguments);
        }
    }

    public calculateWrapperLength(gridSize: number) : number {
        return gridSize * (DEFAULTS.SQUARE_SIDE_LENGTH + DEFAULTS.CELL_PADDING) + DEFAULTS.CELL_PADDING;
    }

    private getFontSizeForValue(value: number) {
        const digitCount = `${value}`.length;
        return DEFAULTS.FONT_SIZE - ((digitCount - 1) * 2.5) ;
    }

    private getBackgroundColor(value: number) {
        return TILE_STYLES[`${value}`]?.background || '';
    }

    private getTextColor(value: number) {
        return TILE_STYLES[`${value}`]?.color || '';
    }

    private setShadow(shadowColor: string, shadowBlur: number) {
        this.canvasContext.shadowColor = shadowColor;
        this.canvasContext.shadowBlur = shadowBlur;
        this.canvasContext.shadowOffsetX = 0;
        this.canvasContext.shadowOffsetY = 0;
    }

    private disableShadow() {
        this.setShadow('', 0);
    }

    public showGameEndOverlay(board: BoardCell[][]) {
        const wrapperLength = this.calculateWrapperLength(board.length);
        board.forEach(row => row.forEach(cell => this.updateCellValue(cell, true)));

        console.log(this.gridWrapper);
        this.canvasContext.fillStyle = '#000';
        this.canvasContext.fill(this.gridWrapper);

        const displayText = 'GAME OVER!';
        const textPosX = this.begin.x + (wrapperLength / 2);
        const textPosY = this.begin.y + (wrapperLength / 1.5);

        this.canvasContext.fillStyle = '#777';
        this.canvasContext.strokeStyle = '#777';
        this.canvasContext.font = `${DEFAULTS.FONT_SIZE}px ${DEFAULTS.FONT_FAMILY}`;
        this.canvasContext.fillText(displayText, textPosX, textPosY);
        this.canvasContext.strokeText(displayText, textPosX, textPosY);
    }
}