const gameBoard = document.getElementById('game-board');
const statusDisplay = document.getElementById('status');
const restartButton = document.getElementById('restart-button');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(
    clickedCell.getAttribute('data-cell-index')
  );

  if (gameState[clickedCellIndex] !== '' || !gameActive) {
    return;
  }

  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;
}

function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    const checkValues =
      gameState[a] + gameState[b] + gameState[c];
    if (checkValues === 'XXX' || checkValues === 'OOO') {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusDisplay.innerHTML = `Player ${currentPlayer} has won!`;
    gameActive = false;
    return;
  }

  if (!gameState.includes('')) {
    statusDisplay.innerHTML = 'It\'s a tie!';
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusDisplay.innerHTML = `Player ${currentPlayer}'s turn`;
}

function handleRestartGame() {
  currentPlayer = 'X';
  gameActive = true;
  gameState = ['', '', '', '', '', '', '', '', ''];
  statusDisplay.innerHTML = `Player ${currentPlayer}'s turn`;

  document.querySelectorAll('.cell').forEach((cell) => {
    cell.textContent = '';
  });
}

gameBoard.addEventListener('click', handleCellClick);
restartButton.addEventListener('click', handleRestartGame);
