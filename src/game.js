import goblinImage from './goblin.png';

export default class Game {
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
    // Генерация случайного индекса для новой позиции
    const newIndex = this.getRandomIndex(this.activeCellIndex);
  
    // Создание элемента img для гоблина
    const goblinImg = document.createElement('img');
    goblinImg.src = goblinImage;
    goblinImg.alt = 'Goblin';
  
    // Очистка предыдущей ячейки, если она существует
    if (this.activeCellIndex !== null) {
      this.cells[this.activeCellIndex].innerHTML = '';
    }
  
    // Добавление гоблина в новую ячейку
    this.cells[newIndex].appendChild(goblinImg);
    this.activeCellIndex = newIndex;
  
    // Установка таймера на удаление гоблина после 1 секунды, если его не поймали
    setTimeout(() => {
      // Проверка, был ли гоблин пойман (activeCellIndex сбрасывается в handleCellClick)
      if (this.activeCellIndex === newIndex) {
        // Гоблин не пойман, считаем как промах
        this.cells[newIndex].innerHTML = ''; // Очистка ячейки
        this.activeCellIndex = null; // Сброс активной ячейки
  
        // Увеличение счетчика промахов
        this.misses++;
        this.updateScore();
  
        // Проверка окончания игры
        if (this.misses >= this.maxMisses) {
          this.endGame();
        }
      }
    }, 1000);
  }
  
  

  handleCellClick(cellIndex) {
    if (cellIndex === this.activeCellIndex) {
      this.cells[cellIndex].innerHTML = '';
      this.activeCellIndex = null; // сброс индекса, чтобы исключить двойной учёт
      this.score++;
      this.updateScore();
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
    alert('Game Over! Your score: ' + this.score);
  }
}
