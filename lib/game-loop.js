var Character = require('./Character')

function GameLoop (game) {
  this.game = game
  this.worldSize = {width: 1920, height: 1200}
}

GameLoop.prototype.create = function create () {
  this.omar = new Character(this.game, {
    name: 'omar',
    sprite: 'omar',
    isPlayer: true
  })
}

GameLoop.prototype.update = function update () {
  this.updateOmar()
}

GameLoop.prototype.updateOmar = function updateOmar () {
  var omar = this.omar.sprite
  var cursors = this.omar.cursors
  var speed = this.omar.speed

  if (omar.alive) {
    if (cursors.left.isDown) {
      omar.body.x -= speed
    } else if (cursors.right.isDown) {
      omar.body.x += speed
    } else if (cursors.up.isDown) {
      omar.body.y -= speed
    } else if (cursors.down.isDown) {
      omar.body.y += speed
    }
  } else {
    this.game.state.start('gameOver')
  }
}

module.exports = GameLoop
