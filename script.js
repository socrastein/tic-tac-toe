const gameBoard = (() => {
  const cells = [...document.querySelectorAll("button.gameCell")];
  return {cells};
})();

console.log(gameBoard.cells);