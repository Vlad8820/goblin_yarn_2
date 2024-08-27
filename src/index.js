import './styles.css';
import Game from './Game';

document.addEventListener('DOMContentLoaded', () => {
  const boardElement = document.getElementById('board');
  const scoreElement = document.getElementById('score');
  
  const game = new Game(boardElement, scoreElement);
  game.start();
});
