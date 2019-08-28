const Player = require('./player');

const Game = function () {
  const players = [];
  let currentPlayer;
  let currentPlayerIndex = -1;

  var popQuestions = [];
  var scienceQuestions = [];
  var sportsQuestions = [];
  var rockQuestions = [];


  var isGettingOutOfPenaltyBox = false;

  var didPlayerWin = function () {
    return !(currentPlayer.purse == 6)
  };

  var currentCategory = function () {
    if (currentPlayer.place == 0)
      return 'Pop';
    if (currentPlayer.place == 4)
      return 'Pop';
    if (currentPlayer.place == 8)
      return 'Pop';
    if (currentPlayer.place == 1)
      return 'Science';
    if (currentPlayer.place == 5)
      return 'Science';
    if (currentPlayer.place == 9)
      return 'Science';
    if (currentPlayer.place == 2)
      return 'Sports';
    if (currentPlayer.place == 6)
      return 'Sports';
    if (currentPlayer.place == 10)
      return 'Sports';
    return 'Rock';
  };

  this.createRockQuestion = function (index) {
    return "Rock Question " + index;
  };

  for (var i = 0; i < 50; i++) {
    popQuestions.push("Pop Question " + i);
    scienceQuestions.push("Science Question " + i);
    sportsQuestions.push("Sports Question " + i);
    rockQuestions.push(this.createRockQuestion(i));
  }
  ;

  this.isPlayable = function (howManyPlayers) {
    return howManyPlayers >= 2;
  };

  this.addPlayer = function (playerName) {
    players.push(new Player(playerName));

    console.log(playerName + " was added");
    console.log("They are player number " + players.length);

    return true;
  };

  this.howManyPlayers = function () {
    return players.length;
  };


  var askQuestion = function () {
    if (currentCategory() == 'Pop')
      console.log(popQuestions.shift());
    if (currentCategory() == 'Science')
      console.log(scienceQuestions.shift());
    if (currentCategory() == 'Sports')
      console.log(sportsQuestions.shift());
    if (currentCategory() == 'Rock')
      console.log(rockQuestions.shift());
  };

  this.setNextPlayer = function () {
    currentPlayerIndex += 1;
    if (currentPlayerIndex === players.length) {
      currentPlayerIndex = 0;
    }

    currentPlayer = players[currentPlayerIndex];
  };

  this.roll = function (roll) {
    console.log(currentPlayer + " is the current player");
    console.log("They have rolled a " + roll);

    if (currentPlayer.hasPenalty) {
      if (roll % 2 != 0) {
        isGettingOutOfPenaltyBox = true;

        console.log(currentPlayer + " is getting out of the penalty box");
        currentPlayer.place += roll;
        if (currentPlayer.place > 11) {
          currentPlayer.place = currentPlayer.place - 12;
        }

        console.log(currentPlayer + "'s new location is " + currentPlayer.place);
        console.log("The category is " + currentCategory());
        askQuestion();
      } else {
        console.log(players[currentPlayer] + " is not getting out of the penalty box");
        isGettingOutOfPenaltyBox = false;
      }
    } else {

      currentPlayer.place = currentPlayer.place + roll;
      if (currentPlayer.place > 11) {
        currentPlayer.place = currentPlayer.place - 12;
      }

      console.log(currentPlayer + "'s new location is " + currentPlayer.place);
      console.log("The category is " + currentCategory());
      askQuestion();
    }
  };

  this.wasCorrectlyAnswered = function () {
    currentPlayer.purse += 1;

    if (currentPlayer.hasPenalty) {
      if (isGettingOutOfPenaltyBox) {
        console.log('Answer was correct!!!!');
        console.log(currentPlayer + " now has " +
          currentPlayer.purse + " Gold Coins.");

        var winner = didPlayerWin();
        this.setNextPlayer();
        return winner;
      }
      this.setNextPlayer();
      return true;

    }

    console.log("Answer was correct!!!!");
    console.log(currentPlayer + " now has " +
      currentPlayer.purse + " Gold Coins.");

    var winner = didPlayerWin();
    this.setNextPlayer();
    return winner;
  };

  this.wrongAnswer = function () {
    console.log('Question was incorrectly answered');
    console.log(currentPlayer + " was sent to the penalty box");
    currentPlayer.hasPenalty = true;

    this.setNextPlayer();
    return true;
  };
};

var notAWinner = false;

var game = new Game();

game.addPlayer('Chet');
game.addPlayer('Pat');
game.addPlayer('Sue');
game.setNextPlayer();

do {

  game.roll(Math.floor(Math.random() * 6) + 1);

  if (Math.floor(Math.random() * 10) == 7) {
    notAWinner = game.wrongAnswer();
  } else {
    notAWinner = game.wasCorrectlyAnswered();
  }

} while (notAWinner);

module.exports = Game;