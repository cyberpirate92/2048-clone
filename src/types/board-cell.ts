import { Coordinates } from './coordinates';

export interface BoardCell {
    value: number;
    position: Coordinates | null;
    lastMoveId: number;
    canvasRef?: Path2D;
}