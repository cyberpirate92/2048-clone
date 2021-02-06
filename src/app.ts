import { GameBoard } from './game-board';

window.addEventListener('load', () => {
    console.log('Load event');
    const body = document.querySelector('body') as HTMLBodyElement;
    const canvas = document.createElement('canvas');

    body.appendChild(canvas);

    let gameBoard = new GameBoard(canvas, 4);
    gameBoard.debugDump();
});