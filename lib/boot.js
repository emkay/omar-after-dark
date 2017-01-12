function Boot (game) {
  this.game = game
}

Boot.prototype.preload = function preload () {
  this.game.load.image('titlescreen_afterdark', 'assets/images/titlescreen_afterdark.png')
  this.game.load.image('titlescreen_moon', 'assets/images/titlescreen_moon.png')
  this.game.load.image('titlescreen_ocean', 'assets/images/titlescreen_ocean.png')
  this.game.load.image('titlescreen_omar', 'assets/images/titlescreen_omar.png')
  this.game.load.image('titlescreen_sand_and_tower', 'assets/images/titlescreen_sand_and_tower.png')
  this.game.load.image('titlescreen_sky', 'assets/images/titlescreen_sky.png')

  this.game.load.spritesheet('titlescreen_palmtrees', 'assets/images/titlescreen_spritesheet_palmtrees.png', 398, 224, 3)
  this.game.load.spritesheet('titlescreen_reflection', 'assets/images/titlescreen_spritesheet_reflection.png', 398, 224, 3)
  this.game.load.spritesheet('titlescreen_stars', 'assets/images/titlescreen_spritesheet_stars.png', 398, 224, 3)

  // this.game.load.image('title', 'assets/oad_title_screen.png')
  this.game.load.image('press-start', 'assets/press_start.png')
  this.game.load.spritesheet('omar', 'assets/images/spritesheet_lifeguard_omar.png', 25, 41, 10)

  this.game.load.image('gameTiles', 'assets/images/oad-main.png')
  this.game.load.image('special-rock', 'assets/images/special-rock.png')
  this.game.load.image('brad', 'assets/images/brad.png')
  this.game.load.tilemap('lifeguard-tower', 'assets/tilemaps/lifeguard-tower.json', null, Phaser.Tilemap.TILED_JSON)
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
