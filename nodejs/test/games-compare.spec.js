const GameOld = require('./game.old');
const gen = require('random-seed');
const {describe, it, beforeEach, after} = require('mocha');
const faker = require('faker');
const Should = require('should');
const {writeFileSync, readFileSync} = require('fs');
const {resolve, join} = require('path');
const Category = require('../src/category');
const Game = require('../src/game');
const Player = require('../src/player');


describe('compare old and refactored versions result', function () {
  const path = resolve(__dirname, './test-data/');
  const playerNames = ['Chet', 'Pat', 'Sue'];

  const oldGameFilepath = join(path, 'old.log.txt');
  const gameFilepath = join(path, 'log.txt');

  writeFileSync(oldGameFilepath, '');
  writeFileSync(gameFilepath, '');

  const writeConsole = console.log;

  beforeEach(function () {
    const rand1 = gen.create(4);
    Math.random = () => rand1(1);
  });


  it('should just run old game', function () {
    console.log = (v) => writeFileSync(oldGameFilepath, v, {flag: 'a'});
    var notAWinner = false;

    var gameOld = new GameOld();

    playerNames.forEach(v => gameOld.add(v));

    do {

      gameOld.roll(Math.floor(Math.random() * 6) + 1);

      if (Math.floor(Math.random() * 10) == 7) {
        notAWinner = gameOld.wrongAnswer();
      } else {
        notAWinner = gameOld.wasCorrectlyAnswered();
      }

    } while (notAWinner);
    console.log = writeConsole;
  });


  it('should just run a new game', function () {
    console.log = (v) => writeFileSync(gameFilepath, v, {flag: 'a'});
    const game = new Game();

    const categories = ['Pop', 'Science', 'Sports', 'Rock'];

    categories.forEach(c => game.addCategory(new Category(c)));
    game.generateQuestions();

    playerNames.forEach(c => game.addPlayer(new Player(c)));

    let isWinner = true;
    do {
      game.chooseNextPlayer();
      game.doStep();
      isWinner = game.hasPlayerWin();
    } while (!isWinner);
    console.log = writeConsole;
  });

  it('should compare outputs of two games', function () {
    const oldGameBuff = readFileSync(oldGameFilepath);
    const newGameBuff = readFileSync(gameFilepath);

    const isEqual = oldGameBuff.equals(newGameBuff);
    isEqual.should.be.true();
  });
});