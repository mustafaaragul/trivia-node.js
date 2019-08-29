function Category(name) {
  this.name = name;
  this.questions = [];
}

Category.prototype.generateQuestion = function (i) {
  this.questions.push(this.name + ' Question ' + i);
};

Category.prototype.toString = function () {
  return this.name;
};

module.exports = Category;