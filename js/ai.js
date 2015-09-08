var RANDOM_MOVE_RATE = 100;
var DO_FAMOUS = false;
var DO_RANDOM = false;

function randomMove() {
  var x = Math.round(Math.random() * (GRID - 1));
  var y = Math.round(Math.random() * (GRID - 1));

  var cell = CELLS[x][y];
  if (cell.stone === EMPTY) {
    var success = placeStone(cell, TURN);
    if (success) {
      nextTurn();
    }
  }

}

function famousGame() {
  var moves = $.get("famous.txt", function(data) {
    data = data.replace(/[\n\r]/g, "");
    var turns = data.split(";");
    var i = 0;

    for (var i = 0; i < turns.length; i++) {
      var turn = turns[i];
      if (!turn) {
        continue;
      }

      playFamousTurn(turn);
      drawBoard();
    }
  });
}

function playFamousTurn(turnString) {
  var color = turnString[0];

  var alpha = "abcdefghijklmnopqrs";
  var x = alpha.indexOf(turnString[2]);
  var y = alpha.indexOf(turnString[3]);

  console.log(color, x, y);

  var cell = CELLS[x][y];
  placeStone(cell, color);
}
