const Character = require('./Character')

function findObjectsByType (type, map, layer) {
  return map.objects[layer]
    .filter((el) => {
      return (el && el.type)
      && (el.type === type)
    })
    .map((el) => {
      console.log('element', el)
      el.y -= map.tileHeight
      return el
    })
}

function createSpriteFromObject (el, group) {
  const sprite = group.create(el.x, el.y, el.properties.sprite)
  Object.keys(el.properties).forEach((key) => {
    sprite[key] = el.properties[key]
  })

  return sprite
}

function GameLoop (game) {
  this.game = game
  this.worldSize = {width: 1920, height: 1200}
  this.isInspectKeyPressed = false
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

  this.createItems()
}

GameLoop.prototype.createItems = function createItems () {
  this.items = this.game.add.group()
  this.items.enableBody = true
  const items = findObjectsByType('item', this.map, 'object')
  items.forEach((item) => {
    createSpriteFromObject(item, this.items)
  }, this)

  this.items.children.forEach((item) => {
    item.moveDown()
  })
}

GameLoop.prototype.update = function update () {
  this.updateOmar()
}

GameLoop.prototype.updateOmar = function updateOmar () {
  const omar = this.omar.sprite
  const cursors = this.omar.cursors
  const speed = this.omar.speed
  let overlappedItem

  this.items.forEach((item) => {
    const isOverlap = item.overlap(this.omar.sprite)
    if (isOverlap) overlappedItem = item
  })

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
      if (!this.isInspectKeyPressed) {
        console.log(overlappedItem.interaction)
				const bar = this.game.add.graphics();
				bar.beginFill(0x000000, 0.2);
				bar.drawRect(0, 100, 800, 100);

				const style = { font: "bold 12px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

				//  The Text is positioned at 0, 100
				const text = this.game.add.text(0, 0, overlappedItem.interaction, style);
				text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

				//  We'll set the bounds to be from x0, y100 and be 800px wide by 100px high
				text.setTextBounds(0, 100, 300, 100);
        this.isInspectKeyPressed = true
        setTimeout(() => {
			    text.kill()
          bar.kill()
          this.isInspectKeyPressed = false
        }, 1500)
      }
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
