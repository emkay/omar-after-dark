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

function LifeGuardBino (game) {
  this.game = game
}

LifeGuardBino.prototype.create = function create () {
  this.map = this.game.add.tilemap('lifeguard-tower')
  this.map.addTilesetImage('oad-main', 'gameTiles')
  this.mainLayer = this.map.createLayer('main')
  this.blockedLayer = this.map.createLayer('blocked')
  this.sandLayer = this.map.createLayer('sand')
  this.bradOceanLayer = this.map.createLayer('brad-ocean')

  this.binoculars = this.game.add.sprite(0, 0, 'binoculars')
  this.game.physics.enable(this.binoculars, Phaser.Physics.ARCADE)
  this.binoculars.body.collideWorldBounds = true

  this.mainLayer.resizeWorld()

  this.sandLayer.moveDown()
  const camera = this.game.camera

  this.omar = new Character(this.game, {
    name: 'omar',
    sprite: 'omar',
    isPlayer: true,
    x: 150,
    y: 306,
    nofollow: true
  })

  this.brad = new Character(this.game, {
    name: 'brad',
    sprite: 'brad',
    isPlayer: false,
    x: 400,
    y: 120
  })

  this.bradOceanLayer.bringToTop()
  this.binoculars.bringToTop()
  this.brad.sprite.moveDown()
}

LifeGuardBino.prototype.update = function update () {
  this.updateCamera()
}

LifeGuardBino.prototype.updateCamera = function updateOmar () {
  const camera = this.game.camera
  const omar = this.omar.sprite
  const cursors = this.omar.cursors
  const self = this

  if (this.brad.sprite.inCamera) {
    if (!this.brad.found) {
      setTimeout(() => {
        const bar = self.game.add.graphics()
        bar.beginFill(0x000000, 0.2)
        bar.drawRect(camera.x, camera.y + 100, 800, 100)

        const style = { font: '10px 8BITWONDERNominal', fill: '#fff', boundsAlignH: 'center', boundsAlignV: 'middle' }
        const text = self.game.add.text(0, 0, 'Hey that is Brad! I better go save him.', style)

        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2)

        text.setTextBounds(camera.x + 50, camera.y + 100, 300, 100)

        setTimeout(() => {
          text.kill()
          bar.kill()
          self.game.state.start('gameLoop')
        }, 2000)
      }, 2000)

      this.brad.found = true
    }
  }

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
      camera.x -= 4
      this.binoculars.x -= 4
    } else if (isRight()) {
      camera.x += 4
      this.binoculars.x += 4
    }
  } else {
    this.game.state.start('gameOver')
  }

  this.game.physics.arcade.collide(
    this.omar.sprite,
    this.blockedLayer,
    () => {
      console.log('COLLISIONNNNN')
      camera.shake(0.005, 100)
    })
}

module.exports = LifeGuardBino
