const Character = require('./Character')

function GameLoop (game) {
  this.game = game
  this.worldSize = {width: 1920, height: 1200}
}

GameLoop.prototype.create = function create () {
  this.map = this.game.add.tilemap('level1')
  this.map.addTilesetImage('oad-main', 'gameTiles')
  this.mainLayer = this.map.createLayer('main')
  this.blockedLayer = this.map.createLayer('blocked')
  this.treeTopLayer = this.map.createLayer('tree-tops')
  this.flowersLayer = this.map.createLayer('flowers')

  this.treeTopLayer.moveUp()

  this.omar = new Character(this.game, {
    name: 'omar',
    sprite: 'omar',
    isPlayer: true
  })

  this.map.setCollisionBetween(0, 2000, true, 'blocked')
  this.mainLayer.resizeWorld()

  this.omar.sprite.moveDown()
  this.omar.sprite.body.collideWorldBounds = true
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
    } else if (cursors.inspect.isDown) {

    }
  } else {
    this.game.state.start('gameOver')
  }

  this.game.physics.arcade.collide(
    this.omar.sprite,
    this.blockedLayer,
    () =>{
      console.log('COLLISIONNNNN')
    })
}

module.exports = GameLoop
