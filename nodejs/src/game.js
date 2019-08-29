const Game = function () {
  let currentPlayer;
  const players = [];
  let currentPlayerIndex = -1;

  const categories = [];

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
  };

  const askQuestion = function () {
    const category = currentCategory();
    console.log("The category is " + category);
    const shifted = category.questions.shift();
    console.log(shifted);
  };

  this.chooseNextPlayer = function () {
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    currentPlayer = players[currentPlayerIndex];
    return currentPlayer;
  };

  this.handleRoll = function (roll) {
    console.log(currentPlayer + " is the current player");
    console.log("They have rolled a " + roll);

    currentPlayer.hasPenalty = currentPlayer.hasPenalty && checkPenalty(roll);
    if (currentPlayer.hasPenalty) {
      return;
    }

    const place = currentPlayer.place;
    currentPlayer.place = (place + roll) % 12;

    console.log(currentPlayer + "'s new location is " + currentPlayer.place);
  };

  const checkPenalty = function (roll) {
    const shouldLeavePenalty = Boolean(roll % 2);
    if (!shouldLeavePenalty) {
      console.log(currentPlayer + " is not getting out of the penalty box");
      return true;
    }

    console.log(currentPlayer + " is getting out of the penalty box");
    return false;
  };

  this.wasCorrectlyAnswered = function () {
    currentPlayer.purse += 1;

    console.log("Answer was correct!!!!");
    console.log(currentPlayer + " now has " +
      currentPlayer.purse + " Gold Coins.");
  };

  this.wrongAnswer = function () {
    console.log('Question was incorrectly answered');
    console.log(currentPlayer + " was sent to the penalty box");
    currentPlayer.hasPenalty = true;
  };

  this.hasPlayerWin = function () {
    return currentPlayer.purse === 6;
  };

  this.checkAnswer = function (answer) {
    return (answer !== 7)
  };

  this.doStep = function () {
    const roll = currentPlayer.roll();
    this.handleRoll(roll);
    if (currentPlayer.hasPenalty) {
      return;
    }

    askQuestion();
    const answer = currentPlayer.answerQuestion();
    const isCorrect = this.checkAnswer(answer);
    if (!isCorrect) {
      this.wrongAnswer();
      return
    }

    this.wasCorrectlyAnswered();
  }
};

module.exports = Game;