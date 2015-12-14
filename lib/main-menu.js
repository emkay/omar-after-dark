function MainMenu (game) {
  this.game = game
}

MainMenu.prototype.create = function create () {
}

MainMenu.prototype.startGame = function startGame () {
  this.game.state.start('gameLoop')
}

module.exports = MainMenu
