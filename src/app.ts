import { GameBoard } from './game-board';

window.addEventListener('load', () => {
    const body = document.querySelector('body') as HTMLBodyElement;
    const canvas = document.createElement('canvas');

    body.appendChild(canvas);

    let gameBoard = new GameBoard(canvas, 4);
    gameBoard.debugDump();
});