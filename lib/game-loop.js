const Character = require('./Character')
// const Item = require('./Item')

function GameLoop (game) {
  this.game = game
  this.worldSize = {width: 1920, height: 1200}

  const time = new Phaser.Time(game)
  this.timer = time.create(false)
  console.log(this.timer)
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
  const omar = this.omar.sprite
  const cursors = this.omar.cursors
  const speed = this.omar.speed

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
