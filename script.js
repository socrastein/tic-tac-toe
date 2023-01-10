const Game = (() => {
  var cpu = true;
  var round = 0;
  var playerTurn = 1;
  var p1Char = undefined;
  var p2Char = undefined;
  var choosing = false;
  var gameOver = false;

  const turnDisplay = document.getElementById('turnDisplay');
  const resultDisplay = document.getElementById('resultDisplay');

  const newGame = function () {
    gameOver = false;
    round = 1;
    playerTurn = 1;
    p1Char = undefined;
    p2Char = undefined;
    choosing = true;
    resultDisplay.innerHTML = '';
    turnDisplay.innerHTML = '';
    gameBoard.clearBoard();
    gameBoard.charSelection();
  }

  const setChar = function (cell) {
    if(cell === gameBoard.cells[3]){
      p1Char = 'X';
      p2Char = 'O';
      turnDisplay.innerHTML = 'Player 1: X';
      gameBoard.clearBoard();
      choosing = false;
      return
    }
    if(cell === gameBoard.cells[5]){
      p1Char = 'O';
      p2Char = 'X';
      turnDisplay.innerHTML = 'Player 1: O';
      gameBoard.clearBoard();
      choosing = false;
      return
    }
  }

  const cellSelect = function (cell) {
    if(gameOver === true){return};
    if(choosing){
      setChar(cell);
      return
    };

    if(cell.className.includes("clear")){
      if(playerTurn === 1){
        cell.innerHTML = p1Char;
      } else cell.innerHTML = p2Char; 
      round ++;
      if(round === 10){
        endGame();
        return
      }
      console.log(round);
      cell.setAttribute("class", "gameCell");

      if(round > 4){
        winningRow = gameBoard.checkWin();
        if(winningRow){
          endGame(winningRow);
          return
        };
      }
      switchTurn();
    }
  }

  const switchTurn = function () {
    if(round === 1){
      turnDisplay.innerHTML= `Player 1: ${p1Char}`}

    if(playerTurn === 1){
      playerTurn = 2;
      turnDisplay.innerHTML= `Player 2: ${p2Char}`
    } else {
    playerTurn = 1;
    turnDisplay.innerHTML= `Player 1: ${p1Char}`;
  }
}

  const endGame = function (winningRow) {
    turnDisplay.innerHTML = 'Game Over';
    gameOver = true;

    if(playerTurn === 1){
      resultDisplay.innerHTML = 'Player 1 Wins'
    } else resultDisplay.innerHTML = 'Player 2 Wins'

    winningRow.forEach(cell =>{
      console.log(cell);
      cell.style.boxShadow = 'inset 0 0 8px rgba(0,0,255,.5)';
    })
  }

  return {newGame, cellSelect}
})();


const gameBoard = (() => {
  const newGameButton = document.getElementById('newGame');
  newGameButton.addEventListener('click', Game.newGame);

  const cells = [...document.querySelectorAll("button.gameCell")];
  cells.forEach(cell => {
    cell.addEventListener("click", () => Game.cellSelect(cell));
  })

  const row1 = cells.slice(0,3);
  const row2 = cells.slice(3,6);
  const row3 = cells.slice(6);

  const col1 = [cells[0], cells[3], cells[6]]
  const col2 = [cells[1], cells[4], cells[7]]
  const col3 = [cells[2], cells[5], cells[8]]

  const diag1 = [cells[0], cells[4], cells[8]]
  const diag2 = [cells[2], cells[4], cells[6]]

  const lines = [row1, row2, row3, col1, col2, col3, diag1, diag2];

  const checkWin = function () {
    var win = false;

    for(i=0; i<lines.length; i++){
      var line = lines[i];
      if(line[0].innerHTML === ''){continue}
      if((line[0].innerHTML === line[1].innerHTML) && 
         (line[1].innerHTML === line[2].innerHTML)){
          win = line;
          return win;
         }
    }
    if(win === false){
      return false;
  } 
  }

  const charSelection = function () {
    gameBoard.cells[0].style.borderStyle = "none";
    gameBoard.cells[1].style.borderStyle = "none";
    gameBoard.cells[2].style.borderStyle = "none";
    gameBoard.cells[3].innerHTML = 'X';
    gameBoard.cells[4].innerHTML = 'or';
    gameBoard.cells[4].style.borderStyle = "none";
    gameBoard.cells[5].innerHTML = 'O';
    gameBoard.cells[6].style.borderStyle = "none";
    gameBoard.cells[7].style.borderStyle = "none";
    gameBoard.cells[8].style.borderStyle = "none";
  }

  const clearBoard = function () {
    cells.forEach(cell =>{
      cell.innerHTML = '';
      cell.style.borderStyle = 'solid';
      cell.style.boxShadow = 'none';
      cell.setAttribute("class", "gameCell clear");
    })
  }

  return {cells, checkWin, charSelection, clearBoard};
})();