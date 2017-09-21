function inspectForDupes(list) {
  var threshold = 30;

  var dupes = 0;
  var totalDistance = 0;
  var maxDistance = 0;

  for (var i = 0; i < list.length; i++) {
    var c1 = list[i];
    for (var j = 0; j < list.length; j++) {
      var c2 = list[j];
      if (c1 !== c2) {
        var xx = c1.x - c2.x;
        var yy = c1.y - c2.y;

        var distance = Math.sqrt(Math.pow(xx, 2) + Math.pow(yy, 2));

        if (distance < threshold) {
          dupes++;
          totalDistance += distance
          maxDistance = Math.max(distance, maxDistance);
          console.log("dupe:", c1, c2);
        }
      }
    }
  }

  var aveDistance = totalDistance / list.length;

  console.log("total dupes:", dupes);
  console.log("ave dis:", aveDistance);
  console.log("max   dis:", maxDistance);
}

function inspectBoard(board) {
  console.log("inspecting corners:", board.corners.length);
  inspectForDupes(board.corners);
  console.log("");

  console.log("inspecting edges", board.edges.length);
  inspectForDupes(board.edges);
  console.log("");

  debugger
}

function drawLabels(ctx, board) {
  ctx.save();

  ctx.font="12px Arial";
  for (var i = 0; i < board.tiles.length; i++) {
    var tile = board.tiles[i];
    ctx.fillText(i, tile.x, tile.y);
  }

  for (var i = 0; i < board.corners.length; i++) {
    var corner = board.corners[i];
    ctx.fillText(i, corner.x, corner.y);
  }

  for (var i = 0; i < board.edges.length; i++) {
    var edge = board.edges[i];
    ctx.fillText(i, edge.x, edge.y);
  }

  ctx.restore();
}
