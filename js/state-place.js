function StatePlace(board, thing) {
  if (thing instanceof Corner) {
    var corner = thing;
    var key = corner.key();

    if (board.settlements[key]) {
      // do nothing. can't build a settlement twice.
    } else if (StatePlace.placed < 3) {
      var settlement = new Settlement(corner, "red");
      board.settlements[key] = settlement;

      StatePlace.placed++;

      if (StatePlace.placed === 1) {
        $(".messages").text("Pick your second settlement.");
      }

      if (StatePlace.placed === 2) {
        $(".messages").text("Roll away!");
        board.state = StateBuild;
      }
    }
  } else if (thing instanceof Edge) {
    var edge = thing;
    var key = edge.key();

    var road = new Road(edge, "red");
    board.roads[key] = road;
  }
}

StatePlace.placed = 0;
