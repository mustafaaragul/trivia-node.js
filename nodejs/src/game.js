const Player = require('./player');
const Category = require('./category');

const Game = function () {
  const players = [];
  let currentPlayer;
  let currentPlayerIndex = -1;

  const categories = [];

  const didPlayerWin = function () {
    return currentPlayer.purse !== 6;
  };

  const currentCategory = function () {
    const place = currentPlayer.place;
    const categoryIndex = place % categories.length;
    return categories[categoryIndex];
  };

  this.generateQuestions = function (num = 50) {
    for (let i = 0; i < num; i++) {
      categories.forEach(v => v.generateQuestion(i));
    }
  };

  this.addCategory = function (category) {
    categories.push(category);
  };

  this.addPlayer = function (player) {
    players.push(player);

    console.log(player + " was added");
    console.log("They are player number " + players.length);
    return true;
  };

  const askQuestion = function () {
    const category = currentCategory();
    const shifted = category.questions.shift();
    console.log(shifted);
  };

  this.chooseNextPlayer = function () {
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    currentPlayer = players[currentPlayerIndex];
    return currentPlayer;
  };

  this.roll = function (roll) {
    console.log(currentPlayer + " is the current player");
    console.log("They have rolled a " + roll);

    currentPlayer.hasPenalty = checkPenalty(roll);
    if (currentPlayer.hasPenalty) {
      return;
    }

    const place = currentPlayer.place;
    currentPlayer.place = (place + roll) % 12;

    console.log(currentPlayer + "'s new location is " + currentPlayer.place);
    console.log("The category is " + currentCategory());
    askQuestion();
  };

  const checkPenalty = function (roll) {
    if (!currentPlayer.hasPenalty) {
      return false;
    }

    const shouldLeavePenalty = Boolean(roll % 2);
    if (!shouldLeavePenalty) {
      console.log(currentPlayer + " is not getting out of the penalty box");
      return true;
    }

    console.log(currentPlayer + " is getting out of the penalty box");
    return false;
  };

  this.wasCorrectlyAnswered = function () {
    if (currentPlayer.hasPenalty) {
      return true;
    }

    currentPlayer.purse += 1;

    console.log("Answer was correct!!!!");
    console.log(currentPlayer + " now has " +
      currentPlayer.purse + " Gold Coins.");

    const winner = didPlayerWin();
    this.chooseNextPlayer();
    return winner;
  };

  this.wrongAnswer = function () {
    console.log('Question was incorrectly answered');
    console.log(currentPlayer + " was sent to the penalty box");
    currentPlayer.hasPenalty = true;
    return true;
  };
};


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

module.exports = Game;