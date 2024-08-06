let isFirstLoad = true;
// gamboard -- IIFE
const Gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""]; //kept private

  const getBoard = () => board;

  const updateBoard = (index, marker) => {
    if (board[index] === "") {
      board[index] = marker;
    }
  };

  const resetBoard = () => {
    board.fill("");
  };

  return { getBoard, updateBoard, resetBoard };
})();

// This is Factory Function
const Player = (name, marker) => {
  return { name, marker };
};

// Game Module (IIFE)
const Game = (() => {
  let player1, player2;
  let currentPlayer;
  let isGameOver = false;

  const startGame = (player1Name, player2Name) => {
    isFirstLoad = false;
    player1 = Player(player1Name, "X");
    player2 = Player(player2Name, "O");
    currentPlayer = player1;
    isGameOver = false;
    Gameboard.resetBoard();
    DisplayController.render();
    DisplayController.setMessage(`${currentPlayer.name}'s turn`);
  };

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const checkWin = () => {
    const board = Gameboard.getBoard();
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let condition of winConditions) {
      const [a, b, c] = condition;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        isGameOver = true;
        return `${currentPlayer.name} wins!`;
      }
    }

    if (!board.includes("")) {
      isGameOver = true;
      return "It's a tie!";
    }

    return null;
  };

  const makeMove = (index) => {
    if (!isGameOver && Gameboard.getBoard()[index] === "") {
      Gameboard.updateBoard(index, currentPlayer.marker);
      const result = checkWin();
      if (result) {
        DisplayController.setMessage(result);
      } else {
        switchPlayer();
        DisplayController.setMessage(`${currentPlayer.name}'s turn`);
      }
      DisplayController.render();
    }
  };

  return { startGame, makeMove, getCurrentPlayer: () => currentPlayer };
})();

// Display Controller Module (IIFE)
const DisplayController = (() => {
  const gameboardWrapper = document.getElementById("gameboard-wrapper");
  const messageElement = document.getElementById("message");
  const restartButton = document.getElementById("restart-button");

  const render = () => {
    gameboardWrapper.innerHTML = "";
    const gameboardElement = document.createElement("div");
    gameboardElement.classList.add("gameboard");
    gameboardWrapper.appendChild(gameboardElement); 

    const board = Gameboard.getBoard();
    board.forEach((cell, index) => {
      const cellElement = document.createElement("div");
      cellElement.classList.add("cell");
      cellElement.textContent = cell;
      cellElement.addEventListener("click", () => Game.makeMove(index));
      gameboardElement.appendChild(cellElement);
    });
    if (!isFirstLoad) {
      restartButton.innerText = "Restart Button";
    }
  };

  const setMessage = (message) => {
    messageElement.textContent = message;
  };

  restartButton.addEventListener("click", () => {
    const player1Name = prompt("Enter name for Player 1 (X):", "Player 1");
    const player2Name = prompt("Enter name for Player 2 (O):", "Player 2");
    Game.startGame(player1Name, player2Name);
  });

  return { render, setMessage };
})();

// Start the game initially with default names
// Game.startGame("Player 1", "Player 2");
