function Road(edge, player) {
  this.edge = edge;
  this.player = player;
}

Road.prototype.key = function() {
  return this.edge.key();
};
