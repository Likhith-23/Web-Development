const board = document.getElementById("game-board");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");
const pvpButton = document.getElementById("pvp");
const pvcButton = document.getElementById("pvc");

let cells = Array(9).fill("");
let currentPlayer = "X";
let gameActive = false;
let mode = "";

function createBoard() {
    board.innerHTML = "";
    cells.forEach((_, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        cellElement.dataset.index = index;
        cellElement.addEventListener("click", handleCellClick);
        board.appendChild(cellElement);
    });
}

function handleCellClick(e) {
    const index = e.target.dataset.index;
    if (cells[index] !== "" || !gameActive) return;
    cells[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    if (checkWinner(cells, currentPlayer)) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
    } else if (cells.every(cell => cell !== "")) {
        statusText.textContent = "It's a draw!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Player ${currentPlayer}'s turn`;
        if (mode === "pvc" && currentPlayer === "O" && gameActive) {
            setTimeout(computerMove, 300);
        }
    }
}

function computerMove() {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < 9; i++) {
        if (cells[i] === "") {
            cells[i] = "O";
            let score = minimax(cells, 0, false);
            cells[i] = "";
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    cells[move] = "O";
    board.children[move].textContent = "O";
    if (checkWinner(cells, "O")) {
        statusText.textContent = "Computer wins!";
        gameActive = false;
    } else if (cells.every(cell => cell !== "")) {
        statusText.textContent = "It's a draw!";
        gameActive = false;
    } else {
        currentPlayer = "X";
        statusText.textContent = "Player X's turn";
    }
}

function minimax(newBoard, depth, isMaximizing) {
    if (checkWinner(newBoard, "O")) return 1;
    if (checkWinner(newBoard, "X")) return -1;
    if (newBoard.every(cell => cell !== "")) return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (newBoard[i] === "") {
                newBoard[i] = "O";
                let score = minimax(newBoard, depth + 1, false);
                newBoard[i] = "";
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (newBoard[i] === "") {
                newBoard[i] = "X";
                let score = minimax(newBoard, depth + 1, true);
                newBoard[i] = "";
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

function checkWinner(boardState, player) {
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return boardState[a] === player && boardState[b] === player && boardState[c] === player;
    });
}

resetButton.addEventListener("click", () => {
    cells.fill("");
    currentPlayer = "X";
    gameActive = true;
    statusText.textContent = "Player X's turn";
    createBoard();
});

pvpButton.addEventListener("click", () => {
    mode = "pvp";
    cells.fill("");
    currentPlayer = "X";
    gameActive = true;
    statusText.textContent = "Player X's turn";
    createBoard();
});

pvcButton.addEventListener("click", () => {
    mode = "pvc";
    cells.fill("");
    currentPlayer = "X";
    gameActive = true;
    statusText.textContent = "Player X's turn";
    createBoard();
});

createBoard();
