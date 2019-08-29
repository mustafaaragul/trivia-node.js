function Player(name) {
  this.name = name;
  this.purse = 0;
  this.place = 0;
  this.hasPenalty = false;
}

Player.prototype.answerQuestion = function() {
  return Math.floor(Math.random() * 10);
};

Player.prototype.toString = function () {
  return this.name;
};

module.exports = Player;