var MOUSE_X = 0;
var MOUSE_Y = 0;

function mousemove(e) {
  MOUSE_X = e.offsetX;
  MOUSE_Y = e.offsetY;
}

function click(e) {
  var x = e.offsetX;
  var y = e.offsetY;

  var cell = getCell(x, y);

  if (KO && KO.x === cell.x && KO.y === cell.y) {
    reportKo();
    return;
  }

  // reset KO
  KO = false;

  if (cell.stone === EMPTY) {
    placeStone(cell, TURN);
  }

  var stonesKilled = processBoard(cell);
  PLACING_STONE = false;

  if (countNetworkLiberties([cell]) === 0) {
    reportNoLiberties();
    cell.stone = EMPTY;
    return;
  }

  if (TURN === "white") {
    WHITE_CAPTURES += stonesKilled;
  } else if (TURN === "black") {
    BLACK_CAPTURES += stonesKilled;
  }

  nextTurn();

  updateScores();
}

