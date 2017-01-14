function Character (game, options) {
  if (!(this instanceof Character)) {
    return new Character(game, options)
  }
  options = options || {}
  this.game = game
  this.name = options.name
  this.speed = options.speed || 2

  const nofollow = options.nofollow || false
  const x = options.x || 0
  const y = options.y || 0
  this.sprite = this.game.add.sprite(x, y, options.sprite)

  this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE)

  if (options.isPlayer) {
    this.sprite.animations.add('idle', [0])
    this.sprite.animations.add('walking-down', [1, 2, 3, 4])
    this.sprite.animations.add('walking-up', [6, 7, 8, 9])

    this.cursors = this.game.input.keyboard.addKeys({
      'up': Phaser.Keyboard.W,
      'down': Phaser.Keyboard.S,
      'left': Phaser.Keyboard.A,
      'right': Phaser.Keyboard.D,
      'inspect': Phaser.Keyboard.I
    })

    this.sprite.body.setSize(20, 5, 0, 36)

    if (!nofollow) this.game.camera.follow(this.sprite)
  }
}

module.exports = Character
