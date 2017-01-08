function Boot (game) {
  this.game = game
}

Boot.prototype.preload = function preload () {
  this.game.load.image('title', 'assets/oad_title_screen.png')
  this.game.load.image('press-start', 'assets/press_start.png')
  this.game.load.spritesheet('omar', 'assets/images/spritesheet_lifeguard_omar.png', 25, 41, 10)

  this.game.load.image('gameTiles', 'assets/images/oad-main.png')
  this.game.load.image('special-rock', 'assets/images/special-rock.png')
  this.game.load.tilemap('level1', 'assets/tilemaps/oad.json', null, Phaser.Tilemap.TILED_JSON)
  // this.game.load.audio('intro', 'assets/intro.mp3')
}

Boot.prototype.create = function create () {
  this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE
  this.game.scale.setUserScale(2, 2)

  this.game.stage.smoothed = false
  this.game.renderer.clearBeforeRender = false
  this.game.renderer.renderSession.roundPixels = true
  Phaser.Canvas.setImageRenderingCrisp(this.game.canvas)

  this.game.world.setBounds(0, 0, 1920, 1200)

  this.game.physics.startSystem(Phaser.Physics.ARCADE)

  this.game.state.start('mainMenu')
}

module.exports = Boot
