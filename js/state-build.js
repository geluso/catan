function StateBuild(board, thing) {
  if (thing instanceof Corner) {
    var corner = thing;
    var key = corner.key();

    // upgrade settlements to cities
    if (board.settlements[key]) {
      if (!Resources.buyCity()) {
        $(".messages").text("Can't afford City.");
      } else {
        // remove old settlement
        delete board.settlements[key];

        // replace it with the new city;
        var city = new City(corner, "red");
        board.cities[key] = city;
      }
    } else {
      if (board.settlements[key] instanceof City) {
        return;
      }

      if (!Resources.buySettlement()) {
        $(".messages").text("Can't afford Settlement.");
      } else {
        var settlement = new Settlement(corner, "red");
        board.settlements[key] = settlement;
      }
    }
  } else if (thing instanceof Edge) {
    if (!Resources.buyRoad()) {
      $(".messages").text("Can't afford Road.");
    } else {
      var edge = thing;
      var key = edge.key();

      var road = new Road(edge, "red");
      board.roads[key] = road;
    }
  }
}
