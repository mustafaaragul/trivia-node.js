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

  const askQuestion = function (category) {
    const shifted = category.questions.shift();
    console.log(shifted);
  };

  this.chooseNextPlayer = function () {
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    currentPlayer = players[currentPlayerIndex];
    return currentPlayer;
  };

  this.roll = function () {
    console.log(currentPlayer + " is the current player");

    const roll = currentPlayer.roll();
    console.log("They have rolled a " + roll);

    currentPlayer.hasPenalty = checkPenalty(roll);
    if (currentPlayer.hasPenalty) {
      return;
    }

    const place = currentPlayer.place;
    currentPlayer.place = (place + roll) % 12;

    const category = currentCategory();
    console.log(currentPlayer + "'s new location is " + currentPlayer.place);
    console.log("The category is " + category);

    askQuestion(category);
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
  };

  this.wrongAnswer = function () {
    console.log('Question was incorrectly answered');
    console.log(currentPlayer + " was sent to the penalty box");
    currentPlayer.hasPenalty = true;
    return true;
  };

  this.hasPlayerWin = function () {
    return currentPlayer.purse === 6;
  };

  this.checkAnswer = function (answer) {
    return (answer !== 7)
  };

  this.doStep = function () {
    this.roll();
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