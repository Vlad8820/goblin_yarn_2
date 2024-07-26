import goblinImage from './goblin.png';

export default class Game {
  constructor(boardElement) {
    this.boardElement = boardElement;
    this.boardSize = 4;
    this.cells = [];
    this.activeCellIndex = null;
    this.createBoard();
  }

  createBoard() {
    for (let i = 0; i < this.boardSize * this.boardSize; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
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

  start() {
    this.moveGoblin();
    setInterval(() => this.moveGoblin(), 1000);
  }
}
