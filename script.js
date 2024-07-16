const Gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""]; //private

  const getBoard = () => board;

  const updateBoard = (index, marker) => {
    //code to update board here
  };

  return { getBoard, updateBoard };
})();

const player = (name, marker) => {
  return { name, marker };
};

//game logic
const Game = (() => {
  let player1;
  let player2;
  let currentPlayer = player1;
  const StartGame = (player1Name, player2Name) => {
    player1 = player(player1Name, "X");
    player2 = player(player2Name, "O");
    let isGameOver = false;
    // Gameboard.getBoard.fill("");
  };

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };
  const makeMove = (index) => {
    //code to make move
    Gameboard.updateBoard(index, currentPlayer.marker);
    switchPlayer();
  };
  return {
    StartGame,
    makeMove,
  };
})();

Game.StartGame("Mridhul, Sugu");
