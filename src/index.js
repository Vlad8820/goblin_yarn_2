import './styles.css';
import goblinImage from './goblin.png';

class Game {
  constructor(boardElement, scoreElement) {
    this.boardElement = boardElement;
    this.scoreElement = scoreElement;
    this.boardSize = 4;
    this.cells = [];
    this.activeCellIndex = null;
    this.score = 0;
    this.misses = 0;
    this.maxMisses = 5;
    this.createBoard();
    this.updateScore();
  }

  createBoard() {
    this.boardElement.style.gridTemplateColumns = `repeat(${this.boardSize}, 1fr)`;
    this.boardElement.style.gridTemplateRows = `repeat(${this.boardSize}, 1fr)`;

    for (let i = 0; i < this.boardSize * this.boardSize; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.addEventListener('click', () => this.handleCellClick(i));
      this.boardElement.appendChild(cell);
      this.cells.push(cell);
    }
  }

  getRandomIndex(excludeIndex) {
    let index;
    do {
      index = Math.floor(Math.random() * this.cells.length);
    } while (index === excludeIndex);
    return index;
  }

  moveGoblin() {
    const newIndex = this.getRandomIndex(this.activeCellIndex);
    const goblinImg = document.createElement('img');
    goblinImg.src = goblinImage;
    goblinImg.alt = 'Goblin';

    if (this.activeCellIndex !== null) {
      this.cells[this.activeCellIndex].innerHTML = '';
    }

    this.cells[newIndex].appendChild(goblinImg);
    this.activeCellIndex = newIndex;
  }

  handleCellClick(cellIndex) {
    if (cellIndex === this.activeCellIndex) {
      this.cells[cellIndex].innerHTML = '';
      this.activeCellIndex = null;
      this.score++;
    } else {
      this.misses++;
    }
    this.updateScore();
    if (this.misses >= this.maxMisses) {
      this.endGame();
    }
  }

  updateScore() {
    this.scoreElement.textContent = `Score: ${this.score} | Misses: ${this.misses}`;
  }

  start() {
    this.moveGoblin();
    this.gameInterval = setInterval(() => this.moveGoblin(), 1000);
  }

  endGame() {
    clearInterval(this.gameInterval);
    alert(`Game Over! Your score: ${this.score}`);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const boardElement = document.getElementById('board');
  const scoreElement = document.getElementById('score');
  const game = new Game(boardElement, scoreElement);
  game.start();
});
