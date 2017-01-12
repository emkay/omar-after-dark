const Character = require('./Character')

function LifeGuard (game) {
  this.game = game
  this.isInspectKeyPressed = false
}

LifeGuard.prototype.create = function create () {
  const self = this

  this.map = this.game.add.tilemap('lifeguard-tower')
  this.map.addTilesetImage('oad-main', 'gameTiles')
  this.mainLayer = this.map.createLayer('main')
  this.blockedLayer = this.map.createLayer('blocked')
  this.sandLayer = this.map.createLayer('sand')
  this.bradOceanLayer = this.map.createLayer('brad-ocean')

  const wetSand = this.game.add.sprite(0, 70, 'intro_sand')

  this.tide = this.game.add.sprite(0, 70, 'intro_tide')
  this.tide.animations.add('go', [0, 1, 2, 1])

  this.music = {}
  this.music.hit = this.game.add.audio('hit')
  this.music.wave = this.game.add.audio('wave')

  this.omar = new Character(this.game, {
    name: 'omar',
    sprite: 'omar',
    isPlayer: true,
    x: 150,
    y: 306
  })

  this.map.setCollisionBetween(0, 2000, true, 'blocked')
  this.mainLayer.resizeWorld()

  this.sandLayer.sendToBack()
  this.omar.sprite.body.collideWorldBounds = true

  const camera = this.game.camera

  this.waveInterval = setInterval(() => {
    self.music.wave.play('', 0, 0.3)
  }, 5000)

  setTimeout(() => {
    const bar = self.game.add.graphics()
    bar.beginFill(0x000000, 0.2)
    bar.drawRect(camera.x, camera.y + 100, 800, 100)

    const style = { font: '10px 8BITWONDERNominal', fill: '#fff', boundsAlignH: 'center', boundsAlignV: 'middle' }
    const text = self.game.add.text(0, 0, 'Time to save some lives', style)

    text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2)

    text.setTextBounds(camera.x, camera.y + 100, 300, 100)

    self.interval = setInterval(() => {
      if (self.brad) {
        const bar = self.game.add.graphics()
        bar.beginFill(0x000000, 0.2)
        bar.drawRect(camera.x, camera.y + 100, 800, 100)

        const style = { font: '10px 8BITWONDERNominal', fill: '#fff', boundsAlignH: 'center', boundsAlignV: 'middle' }
        const text = self.game.add.text(0, 0, 'Brad: Help!', style)

        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2)

        text.setTextBounds(camera.x, camera.y + 100, 300, 100)

        setTimeout(() => {
          text.kill()
          bar.kill()
        }, 2000)
        if (self.brad.direction === 'right') {
          self.brad.direction = 'left'
        } else if (self.brad.direction === 'left') {
          self.brad.direction = 'right'
        }
      }
    }, 5000)

    setTimeout(() => {
      text.kill()
      bar.kill()
      self.brad = new Character(self.game, {
        name: 'brad',
        sprite: 'brad',
        isPlayer: false,
        x : 50,
        y: 180
      })

      self.brad.direction = 'right'
      self.bradOceanLayer.bringToTop()
      self.brad.sprite.moveDown()
    }, 1500)
  }, 3000)
}

LifeGuard.prototype.update = function update () {
  this.updateOmar()
  this.updateBrad()
  this.tide.animations.play('go', 1)
}

LifeGuard.prototype.updateBrad = function updateBrad () {
  if (this.brad) {
    if (this.brad.direction === 'right') {
      this.brad.sprite.body.x += 0.5
    } else {
      this.brad.sprite.body.x -= 0.5
    }
  }
}

LifeGuard.prototype.updateOmar = function updateOmar () {
  const camera = this.game.camera
  const omar = this.omar.sprite
  const cursors = this.omar.cursors
  const speed = this.omar.speed

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
      clearInterval(this.interval)
      clearInterval(this.waveInterval)
      this.game.state.start('life-guard-binoculars')
    } else {
      omar.animations.play('idle')
    }
  } else {
    this.game.state.start('gameOver')
  }

  const self = this

  this.game.physics.arcade.collide(
    this.omar.sprite,
    this.blockedLayer,
    () => {
      self.music.hit.play('', 0, 0.25)
      camera.shake(0.005, 100)
    })
}

module.exports = LifeGuard
