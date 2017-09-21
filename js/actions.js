function Actions() {};

Actions.BuildRoad = function(player, edge) {
  this.player = player;
  this.edge = edge;
}

Actions.BuildSettlement = function(player, corner) {
  this.player = player;
  this.corner = corner;
}

Actions.BuildCity = function(player, corner) {
  this.player = player;
  this.corner = corner;
}
