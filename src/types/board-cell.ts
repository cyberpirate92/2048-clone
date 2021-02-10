import { Coordinates } from './coordinates';

export interface BoardCell {
    value: number;
    position: Coordinates | null;
    canvasRef?: Path2D;
    lastValue: number;
}