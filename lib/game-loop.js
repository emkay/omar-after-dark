const Character = require('./Character')

function findObjectsByType (type, map, layer) {
  return map.objects[layer]
    .filter((el) => {
      return (el && el.type) && (el.type === type)
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
  this.isInspectKeyPressed = false
}

GameLoop.prototype.create = function create () {
  this.barDialogue = require('../data/bar-dialogue')
  this.omarBradDialogue = require('../data/omar-brad-dialogue')

  this.map = this.game.add.tilemap('level1')
  this.map.addTilesetImage('oad-main', 'gameTiles')
  this.mainLayer = this.map.createLayer('main')
  this.blockedLayer = this.map.createLayer('blocked')
  this.treeTopLayer = this.map.createLayer('tree-tops')
  this.flowersLayer = this.map.createLayer('flowers')
  this.barLayer = this.map.createLayer('bar')

  this.barLayer.moveDown()
  this.dialogueStarted = false
  this.barDialogueStarted = false

  this.treeTopLayer.bringToTop()

  this.omar = new Character(this.game, {
    name: 'omar',
    sprite: 'omar',
    isPlayer: true,
    x: 150,
    y: 150
  })

  this.brad = new Character(this.game, {
    name: 'brad',
    sprite: 'brad',
    isPlayer: false,
    x: 200,
    y: 120
  })

  this.music = {}
  this.music.hit = this.game.add.audio('hit')

  this.map.setCollisionBetween(0, 2000, true, 'blocked')
  this.map.setCollisionBetween(0, 2000, true, 'bar')

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

  this.game.world.sendToBack(this.items)
  this.game.world.moveUp(this.items)
}

GameLoop.prototype.update = function update () {
  this.updateOmar()
}

GameLoop.prototype.updateOmar = function updateOmar () {
  const camera = this.game.camera
  const omar = this.omar.sprite
  const cursors = this.omar.cursors
  const speed = this.omar.speed
  let overlappedItem

  this.items.forEach((item) => {
    const isOverlap = item.overlap(this.omar.sprite)
    if (isOverlap) overlappedItem = item
  })

  if (omar.alive) {
    const pad = this.game.input.gamepad.pad1

    const isLeft = () => {
      return cursors.left.isDown ||
        pad.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT)
    }

    const isRight = () => {
      return cursors.right.isDown ||
        pad.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT)
    }

    const isDown = () => {
      return cursors.down.isDown ||
        pad.isDown(Phaser.Gamepad.XBOX360_DPAD_DOWN)
    }

    const isUp = () => {
      return cursors.up.isDown ||
        pad.isDown(Phaser.Gamepad.XBOX360_DPAD_UP)
    }

    const isInspect = () => {
      return cursors.inspect.isDown ||
        pad.justPressed(Phaser.Gamepad.XBOX360_A)
    }

    if (isLeft()) {
      omar.animations.play('walking-down', 10)
      omar.body.x -= speed
    } else if (isRight()) {
      omar.animations.play('walking-down', 10)
      omar.body.x += speed
    } else if (isUp()) {
      omar.animations.play('walking-up', 10)
      omar.body.y -= speed
    } else if (isDown()) {
      omar.animations.play('walking-down', 10)
      omar.body.y += speed
    } else if (isInspect()) {
      if (!this.isInspectKeyPressed && overlappedItem) {
        const bar = this.game.add.graphics()
        bar.beginFill(0x000000, 0.2)
        bar.drawRect(camera.x, camera.y + 100, 800, 100)

        const style = { font: '10px 8BITWONDERNominal', fill: '#fff', boundsAlignH: 'center', boundsAlignV: 'middle' }
        const text = this.game.add.text(0, 0, overlappedItem.interaction, style)

        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2)

        text.setTextBounds(camera.x, camera.y + 100, 300, 100)
        this.isInspectKeyPressed = true
        setTimeout(() => {
          text.kill()
          bar.kill()
          this.isInspectKeyPressed = false
        }, 1500)
      }
    } else {
      omar.animations.play('idle')
    }
  } else {
    this.game.state.start('gameOver')
  }

  const self = this
  this.game.physics.arcade.collide(
    this.omar.sprite,
    this.barLayer,
    () => {
      console.log('at the bar')
      if (!self.barDialogueStarted) {
        self.barDialogueStarted = true

        // brad
        Character(this.game, {
          name: 'brad',
          sprite: 'brad',
          isPlayer: false,
          x: 1736,
          y: 1438
        })

        // evan
        Character(this.game, {
          name: 'evan',
          sprite: 'evan',
          isPlayer: false,
          x: 1769,
          y: 1443
        })

        // mike
        Character(this.game, {
          name: 'mike',
          sprite: 'mike',
          isPlayer: false,
          x: 1727,
          y: 1459
        })

        const bar = this.game.add.graphics()
        bar.beginFill(0x000000, 0.2)
        bar.drawRect(camera.x, camera.y + 100, 800, 100)

        const style = { font: '10px 8BITWONDERNominal', fill: '#fff', boundsAlignH: 'center', boundsAlignV: 'middle', wordWrap: true }
        const text = this.game.add.text(0, 0, this.barDialogue.shift(), style)
        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2)
        text.setTextBounds(camera.x, camera.y + 100, 300, 100)

        const barTimer = setInterval(() => {
          if (self.barDialogue.length === 0) {
            self.game.state.start('mainMenuBday')
            clearInterval(barTimer)
            return
          }

          text.setText(this.barDialogue.shift())
        }, 3000)
      }
    })

  this.game.physics.arcade.collide(
    this.omar.sprite,
    this.blockedLayer,
    () => {
      console.log('COLLISIONNNNN')
      camera.shake(0.005, 100)
      self.music.hit.play('', 0, 0.25)
    })

  this.game.physics.arcade.collide(
    this.omar.sprite,
    this.brad.sprite,
    () => {
      console.log('dialogue')

      const style = { font: '10px 8BITWONDERNominal', fill: '#fff', boundsAlignH: 'center', boundsAlignV: 'middle', wordWrap: true }

      if (!this.dialogueStarted) {
        const bar = this.game.add.graphics()
        bar.beginFill(0x000000, 0.2)
        bar.drawRect(camera.x, camera.y + 100, 800, 100)

        let text = this.game.add.text(0, 0, self.omarBradDialogue.shift(), style)
        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2)
        text.setTextBounds(camera.x, camera.y + 100, 300, 100)

        this.dialogueStarted = true
        const omarBradDialogueTimer = setInterval(() => {
          if (self.omarBradDialogue.length === 0) {
            clearInterval(omarBradDialogueTimer)

            this.brad.sprite.kill()
            text.kill()
            bar.kill()

            setTimeout(() => {
              let bar = this.game.add.graphics()
              bar.beginFill(0x000000, 0.2)
              bar.drawRect(camera.x, camera.y + 100, 800, 100)

              let text = this.game.add.text(0, 0, 'These waters are safe. Now it\'s time to clean up the streets', style)
              text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2)
              text.setTextBounds(camera.x, camera.y + 100, 300, 100)

              setTimeout(() => {
                text.setText('Well I guess the streets can wait a little.')

                setTimeout(() => {
                  text.setText('I should go find that surprise party Brad mentioned. I don\'t want to keep anybody waiting.')

                  setTimeout(() => {
                    text.kill()
                    bar.kill()
                  }, 3000)
                }, 3000)
              }, 3000)
            }, 10000)
            return
          }

          text.setText(self.omarBradDialogue.shift())
        }, 3000)
      }
    })
}

module.exports = GameLoop
