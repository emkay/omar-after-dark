function Character (game, options) {
  options = options || {}
  this.game = game
  this.name = options.name
  this.speed = options.speed || 2
  this.sprite = this.game.add.sprite(0, 0, options.sprite)

  this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE)

  if (options.isPlayer) {
    this.cursors = this.game.input.keyboard.addKeys({
      'up': Phaser.Keyboard.W,
      'down': Phaser.Keyboard.S,
      'left': Phaser.Keyboard.A,
      'right': Phaser.Keyboard.D,
      'inspect': Phaser.Keyboard.I
    })

    this.game.camera.follow(this.player)
  }
}

module.exports = Character
