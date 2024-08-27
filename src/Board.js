export default class Board {
    constructor(boardElement) {
      this.boardElement = boardElement;
      this.boardSize = 4;
      this.cells = [];
      this.createBoard();
    }
  
    createBoard() {
      this.boardElement.style.gridTemplateColumns = `repeat(${this.boardSize}, 1fr)`;
      this.boardElement.style.gridTemplateRows = `repeat(${this.boardSize}, 1fr)`;
  
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
  
    getCell(index) {
      return this.cells[index];
    }
  }
  