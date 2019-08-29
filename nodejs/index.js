const Category = require('./src/category');
const Game = require('./src/game');
const Player = require('./src/player');

const game = new Game();

const categories = ['Pop', 'Science', 'Sports', 'Rock'];
const players = ['Chet', 'Pat', 'Sue'];

categories.forEach(c => game.addCategory(new Category(c)));
game.generateQuestions();

players.forEach(c => game.addPlayer(new Player(c)));

let notAWinner = true;
while (notAWinner) {
  const player = game.chooseNextPlayer();
  game.roll(Math.floor(Math.random() * 6) + 1);
  const answer = player.answerQuestion();
  if (answer === 7) {
    notAWinner = game.wrongAnswer();
  } else {
    notAWinner = game.wasCorrectlyAnswered();
  }
}
