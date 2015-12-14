function Boot (game) {
  this.game = game
}

Boot.prototype.preload = function preload () {
  // this.game.load.audio('intro', 'assets/intro.mp3')
}

Boot.prototype.create = function create () {
  this.game.world.setBounds(0, 0, 1920, 1200)
  this.game.renderer.clearBeforeRender = false
  this.game.renderer.renderSession.roundPixels = true

  this.game.physics.startSystem(Phaser.Physics.ARCADE)

  this.game.state.start('mainMenu')
}

module.exports = Boot
