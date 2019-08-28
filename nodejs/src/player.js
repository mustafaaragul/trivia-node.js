function Player(name) {
  this.name = name;
  this.purse = 0;
  this.place = 0;
  this.hasPenalty = false;
}

Player.prototype.toString = function () {
  return this.name;
};

module.exports = Player;