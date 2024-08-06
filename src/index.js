import './style.css';
import Game from './Game';

const boardElement = document.getElementById('game-board');
const scoreElement = document.getElementById('score-board');
const game = new Game(boardElement, scoreElement);

game.start();
