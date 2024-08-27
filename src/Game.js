import Board from './Board';
import Goblin from './Goblin';

export default class Game {
  constructor(boardElement, scoreElement) {
    this.board = new Board(boardElement);
    this.scoreElement = scoreElement;
    this.score = 0;
    this.misses = 0;
    this.maxMisses = 5;
    this.winScore = 10;
    this.goblin = new Goblin(this.board);
    this.updateScore();
  }

  start() {
    this.goblin.startMoving();
    this.board.boardElement.addEventListener('click', (event) => {
      const cellIndex = Array.from(this.board.boardElement.children).indexOf(event.target.closest('.cell'));
      if (cellIndex >= 0) {
        this.handleCellClick(cellIndex);
      }
    });
  }

  handleCellClick(cellIndex) {
    if (this.goblin.isGoblinInCell(cellIndex)) {
      this.goblin.removeGoblin();
      this.score++;
    } else {
      this.misses++;
    }
    this.updateScore();
    this.checkGameEnd();
  }

  updateScore() {
    this.scoreElement.textContent = `Score: ${this.score} | Misses: ${this.misses}`;
  }

  checkGameEnd() {
    if (this.score >= this.winScore) {
      alert(`You win! Your score: ${this.score}`);
      this.endGame();
    } else if (this.misses >= this.maxMisses) {
      alert(`You lose! Your score: ${this.score}`);
      this.endGame();
    }
  }

  endGame() {
    this.goblin.stopMoving();
  }
}
