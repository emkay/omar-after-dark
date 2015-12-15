function Boot (game) {
  this.game = game
}

Boot.prototype.preload = function preload () {
  this.game.load.image('title', 'assets/oad_title_screen.png')
  this.game.load.image('press-start', 'assets/press_start.png')
  this.game.load.image('omar', 'assets/omar_lifeguard.png')

  // this.game.load.audio('intro', 'assets/intro.mp3')
}

Boot.prototype.create = function create () {
  this.game.world.setBounds(0, 0, 1920, 1200)
  this.game.renderer.clearBeforeRender = false
  this.game.renderer.renderSession.roundPixels = true

  this.game.physics.startSystem(Phaser.Physics.ARCADE)
  this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE
  this.game.scale.setUserScale(1.5, 1.5)

  this.game.state.start('mainMenu')
}

module.exports = Boot
