const {describe, it} = require('mocha');
const faker = require('faker');
const Should = require('should');
const Game = require('../src/game');
const Player = require('../src/player');
const Category = require('../src/category');

describe("Game test", function () {
  let game= new Game();
  let player1 = new Player(faker.name.findName());
  let player2 = new Player(faker.name.firstName());

  game.addPlayer(player1);
  game.addPlayer(player2);

  const nextPlayers = [player1, player2, player1];
  nextPlayers.forEach(expected => {
    it('should return next player ' + expected, function () {
      const player = game.chooseNextPlayer();

      player.should.be.equal(expected);
    });
  });


  it('should increase user\'s count', function () {
    game.handleCorrectAnswer();

    player1.purse.should.be.equal(1);
  });


  it('should set user hasPenalty status', function () {
    game.handleWrongAnswer();

    player1.hasPenalty.should.be.true();
  });


  for (let i = 0; i < 12; i += 2) {
    it(`should not remove user hasPenalty status, because roll value ${i} is even`, function () {
      player1.hasPenalty = true;
      game.handleRoll(i);

      player1.hasPenalty.should.be.true();
    });
  }

  for (let i = 1; i < 12; i += 2) {
    it(`should remove user hasPenalty status, because roll value ${i} is odd`, function () {
      player1.hasPenalty = true;
      game.handleRoll(i);

      player1.hasPenalty.should.be.false();
    });
  }

  const category1 = new Category(faker.name.jobType());
  const category2 = new Category(faker.name.jobType());

  game.addCategory(category1);
  game.addCategory(category2);

  const generateQuestions = [10, 40];
  generateQuestions.forEach(v => {
    it(`should generate ${v} questions for each category`, function () {
      category2.questions = [];
      category1.questions = [];

      game.generateQuestions(v);

      category1.questions.should.have.length(v);
      category2.questions.should.have.length(v);
    });
  });

});
