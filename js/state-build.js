function StateBuild(board, thing) {
  if (thing instanceof Corner) {
    var corner = thing;
    var key = corner.key();

    // upgrade settlements to cities
    if (board.settlements[key]) {
      // remove old settlement
      delete board.settlements[key];

      // replace it with the new city;
      var city = new City(corner, "red");
      board.cities[key] = city;

      if (!Resources.buyCity()) {
        $(".messages").text("Can't afford City.");
      }
    } else {
      if (board.settlements[key] instanceof City) {
        return;
      }

      var settlement = new Settlement(corner, "red");
      board.settlements[key] = settlement;

      if (!Resources.buySettlement()) {
        $(".messages").text("Can't afford Settlement.");
      }
    }
  } else if (thing instanceof Edge) {
    var edge = thing;
    var key = edge.key();

    var road = new Road(edge, "red");
    board.roads[key] = road;

    if (!Resources.buyRoad()) {
      $(".messages").text("Can't afford Road.");
    }
  }
}
