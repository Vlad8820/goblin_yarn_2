import goblinImage from './goblin.png';

export default class Goblin {
  constructor(board) {
    this.board = board;
    this.activeCellIndex = null;
    this.movingInterval = null;
  }

  startMoving() {
    this.moveGoblin();
    this.movingInterval = setInterval(() => this.moveGoblin(), 1000);
  }

  stopMoving() {
    clearInterval(this.movingInterval);
  }

  moveGoblin() {
    const newIndex = this.board.getRandomIndex(this.activeCellIndex);
    const goblinImg = document.createElement('img');
    goblinImg.src = goblinImage;
    goblinImg.alt = 'Goblin';

    if (this.activeCellIndex !== null) {
      this.board.getCell(this.activeCellIndex).innerHTML = '';
    }

    this.board.getCell(newIndex).appendChild(goblinImg);
    this.activeCellIndex = newIndex;
  }

  removeGoblin() {
    if (this.activeCellIndex !== null) {
      this.board.getCell(this.activeCellIndex).innerHTML = '';
      this.activeCellIndex = null;
    }
  }

  isGoblinInCell(cellIndex) {
    return this.activeCellIndex === cellIndex;
  }
}
