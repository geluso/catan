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

StateBuild.shouldGhostRoad = function(board, edge) {
  var result = false;

  // the road can be placed if it's touching a settlement.
  _.each(board.settlements, function(settlement) {
    if (settlement.corner.equals(edge.c1) || settlement.corner.equals(edge.c2)) {
      result = true;
    }
  });

  _.each(board.cities, function(city) {
    if (city.corner.equals(edge.c1) || city.corner.equals(edge.c2)) {
      result = true;
    }
  });

  // or if it's touching an existing road network.
  _.each(board.roads, function(road) {
    var neighbors = board.edgeGraph[road.edge.key()];
    if (_.contains(neighbors, edge)) {
      result = true;
    }
  });

  return result;
};

StateBuild.shouldGhostCorner = function(board, corner) {
  var result = true;

  var takenCornerKeys = _.union(_.keys(board.settlements), _.keys(board.cities));

  // can't place right next to other settements or citites.
  _.each(takenCornerKeys, function(key) {
    var neighbors = board.cornerGraph[key];
    if (_.contains(neighbors, corner)) {
      result = false;
    }
  });

  return result;
};

StateBuild.shouldGhostRobber = function(board, tile) {
  return true;
};
