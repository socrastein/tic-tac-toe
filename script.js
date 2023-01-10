const gameBoard = (() => {
  const cells = [...document.querySelectorAll("button.gameCell")];

  const row1 = cells.slice(0,3);
  const row2 = cells.slice(3,6);
  const row3 = cells.slice(6);

  const col1 = [cells[0], cells[3], cells[6]]
  const col2 = [cells[1], cells[4], cells[7]]
  const col3 = [cells[2], cells[5], cells[8]]

  const diag1 = [cells[0], cells[4], cells[8]]
  const diag2 = [cells[2], cells[4], cells[6]]

  const lines = [row1, row2, row3, col1, col2, col3, diag1, diag2];

  const fillCell = function (cell, char) {
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
    })
  }

  return {
    cells, 
    row1, row2, row3, 
    col1, col2, col3, 
    diag1, diag2, lines,
    fillCell, checkWin, clearBoard};
})();

console.log(gameBoard.checkWin());


