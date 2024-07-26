import './style.css';
import Game from './game';

document.addEventListener('DOMContentLoaded', () => {
  const gameBoard = document.getElementById('game-board');
  const game = new Game(gameBoard);
  game.start();
});
