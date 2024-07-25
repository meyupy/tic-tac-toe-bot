import {checkGame, updateState, findBestMove} from "./ai.js";

const cells = document.querySelectorAll(".cell");
const buttonNewGame = document.getElementById("newGameButton");
const cellContainer = document.getElementById("cellContainer");

const colors = {
    X: "var(--cell-color-x)",
    O: "var(--cell-color-o)",
    borderContinues: "var(--cell-con-border-color-continues)",
    borderX: "var(--cell-con-border-color-x)",
    borderO: "var(--cell-con-border-color-o)",
    borderDraw: "var(--cell-con-border-color-draw)"
};

let boardState, starter, currentChar, running;

cells.forEach(cell => cell.addEventListener("click", cellClicked));
buttonNewGame.addEventListener("click", restartGame);

function cellClicked() {
    const cellIndex = parseInt(this.getAttribute("cellIndex"));
    if(running && whoseTurn() === "player" && boardState[cellIndex] === '-'){
        updateBoard(cellIndex);
    }
}

function handleComputerMove() {
    updateBoard(findBestMove(boardState, currentChar));
}

function updateBoard(index) {

    boardState = updateState(boardState, index, currentChar);
    cells[index].textContent = currentChar;
    cells[index].style.color = colors[currentChar];

    const gameState = checkGame(boardState, currentChar);
    if([-1, 1].includes(gameState)){
        cellContainer.style.borderColor = colors[`border${currentChar}`];
        running = false;
    } else if(gameState === 0){
        cellContainer.style.borderColor = colors.borderDraw;
        running = false;
    } else{
        currentChar = currentChar === 'X' ? 'O' : 'X';
        if(whoseTurn() === "computer") handleComputerMove();
    }

}

function restartGame() {
    cellContainer.style.borderColor = colors.borderContinues;
    cells.forEach(cell => cell.textContent = ``);
    boardState = "---------";
    starter = starter === "player" ? "computer" : "player";
    currentChar = 'X';
    running = true;
    if(starter === "computer") handleComputerMove();
}

function whoseTurn() {
    return currentChar === 'X' ? starter : starter === "player" ? "computer" : "player";
}