// gamboard -- IIFE
const Gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""]; //kept private

  const getBoard = () => board;

  const updateBoard = (index, marker) => {
      if (board[index] === "") {
          board[index] = marker;
      }
  };

  return { getBoard, updateBoard };
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
      player1 = Player(player1Name, "X");
      player2 = Player(player2Name, "O");
      currentPlayer = player1;
      isGameOver = false;
      Gameboard.getBoard().fill("");
      console.log("Game started!");
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
          [2, 4, 6]
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
              console.log(result);
          } else {
              switchPlayer();
          }
      }
  };

  return { startGame, makeMove, getCurrentPlayer: () => currentPlayer };
})();

