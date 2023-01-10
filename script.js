const Game = (() => {
  var cpu = true;
  var playerTurn = 1;
  var p1Char = undefined;
  var p2Char = undefined;

  const newGame = function () {
    console.log('Starting New Game');
    playerTurn = 1;
    p1Char = undefined;
    p2Char = undefined;
    gameBoard.clearBoard();
    chooseChar();
  }

  const chooseChar = function () {
    p1Char = undefined;
    p2Char = undefined;

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

  const cellSelect = function (cell) {
    if(p1Char === undefined){
      if(cell === gameBoard.cells[3]){
        p1Char = 'X';
        p2Char = 'O';
        gameBoard.clearBoard();
        return
      }
      if(cell === gameBoard.cells[5]){
        p1Char = 'O';
        p2Char = 'X';
        gameBoard.clearBoard();
        return
      }
    }

    if(cell.className.includes("clear")){
      if(playerTurn === 1){
        cell.innerHTML = p1Char;
      } else cell.innerHTML = p2Char; 
      switchTurn();
      cell.setAttribute("class", "gameCell");
    }

  }

  const switchTurn = function () {
    if(playerTurn === 1){
      playerTurn = 2;
    } else playerTurn = 1;
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

  const fillCell = function (cell) {
    this.cells[cell].innerHTML = char;
  }

  const checkWin = function () {
    var win = false;

    for(i=0; i<lines.length; i++){
      var line = lines[i];
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

  const clearBoard = function () {
    cells.forEach(cell =>{
      cell.innerHTML = '';
      cell.style.borderStyle = 'solid';
      cell.setAttribute("class", "gameCell clear");
    })
  }

  return {
    cells, 
    row1, row2, row3, 
    col1, col2, col3, 
    diag1, diag2, lines,
    fillCell, checkWin, clearBoard};
})();



const player = function () {

}

console.log(gameBoard.checkWin());


