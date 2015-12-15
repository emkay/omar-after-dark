function GameOver (game) {
  this.game = game
}

GameOver.prototype.create = function create () {
  console.log('game over')
}

module.exports = GameOver
