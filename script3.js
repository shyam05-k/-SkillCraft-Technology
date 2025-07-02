const board = document.getElementById("board");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");

let cells = Array(9).fill(null);
let currentPlayer = "X";
let isGameActive = true;

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function renderBoard() {
  board.innerHTML = "";
  cells.forEach((cell, index) => {
    const div = document.createElement("div");
    div.classList.add("cell");
    div.textContent = cell;
    div.addEventListener("click", () => handleClick(index));
    board.appendChild(div);
  });
}

function handleClick(index) {
  if (!isGameActive || cells[index]) return;

  cells[index] = currentPlayer;
  renderBoard();
  if (checkWin()) {
    statusText.textContent = `Player ${currentPlayer} Wins!`;
    isGameActive = false;
    return;
  }
  if (cells.every(cell => cell)) {
    statusText.textContent = "It's a Draw!";
    isGameActive = false;
    return;
  }
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWin() {
  return winPatterns.some(pattern =>
    pattern.every(index => cells[index] === currentPlayer)
  );
}

resetBtn.addEventListener("click", () => {
  cells = Array(9).fill(null);
  currentPlayer = "X";
  isGameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
  renderBoard();
});

renderBoard();
