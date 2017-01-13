(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const boot = require('./lib/boot')
const mainMenu = require('./lib/main-menu')
const mainMenuBday = require('./lib/main-menu-bday')
const lifeGuard = require('./lib/life-guard')
const lifeGuardBinoculars = require('./lib/life-guard-binoculars')
const gameLoop = require('./lib/game-loop')
const gameOver = require('./lib/game-over')
const bar = require('./lib/bar')

const screenX = 398
const screenY = 224

const game = new Phaser.Game(screenX, screenY, Phaser.CANVAS, '', null)

game.state.add('boot', boot)
game.state.add('mainMenu', mainMenu)
game.state.add('mainMenuBday', mainMenuBday)
game.state.add('lifeguard', lifeGuard)
game.state.add('life-guard-binoculars', lifeGuardBinoculars)
game.state.add('bar', bar)
game.state.add('gameLoop', gameLoop)
game.state.add('gameOver', gameOver)

game.state.start('boot')

},{"./lib/bar":3,"./lib/boot":4,"./lib/game-loop":5,"./lib/game-over":6,"./lib/life-guard":8,"./lib/life-guard-binoculars":7,"./lib/main-menu":10,"./lib/main-menu-bday":9}],2:[function(require,module,exports){
function Character (game, options) {
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

},{}],3:[function(require,module,exports){

},{}],4:[function(require,module,exports){
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

  this.game.load.image('titlescreen_BIRTHDAY_COMPLETE_sand_and_tower', 'assets/images/titlescreen_BIRTHDAY_COMPLETE_sand_and_tower.png')

  this.game.load.image('binoculars', 'assets/images/binocular_vision.png')

  this.game.load.spritesheet('titlescreen_palmtrees', 'assets/images/titlescreen_spritesheet_palmtrees.png', 398, 224, 3)
  this.game.load.spritesheet('titlescreen_reflection', 'assets/images/titlescreen_spritesheet_reflection.png', 398, 224, 3)
  this.game.load.spritesheet('titlescreen_stars', 'assets/images/titlescreen_spritesheet_stars.png', 398, 224, 3)

  this.game.load.spritesheet('intro_tide', 'assets/images/intro_spritesheet_tide.png', 398, 224, 3)
  this.game.load.image('intro_sand', 'assets/images/intro_sand.png')

  this.game.load.image('press-start', 'assets/press_start.png')
  this.game.load.spritesheet('omar', 'assets/images/spritesheet_lifeguard_omar.png', 25, 41, 10)

  this.game.load.image('gameTiles', 'assets/images/oad-main.png')
  this.game.load.image('special-rock', 'assets/images/special-rock.png')
  this.game.load.image('brad', 'assets/images/brad.png')
  this.game.load.image('evan', 'assets/images/evan.png')
  this.game.load.image('mike', 'assets/images/mike.png')
  this.game.load.tilemap('lifeguard-tower', 'assets/tilemaps/lifeguard-tower.json', null, Phaser.Tilemap.TILED_JSON)
  this.game.load.tilemap('level1', 'assets/tilemaps/oad.json', null, Phaser.Tilemap.TILED_JSON)

  this.game.load.audio('intro', 'assets/sound/intro-music.mp3')
  this.game.load.audio('start', 'assets/sound/start.mp3')
  this.game.load.audio('hit', 'assets/sound/hit.mp3')
  this.game.load.audio('wave', 'assets/sound/wave.mp3')
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

},{}],5:[function(require,module,exports){
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
  this.map = this.game.add.tilemap('level1')
  this.map.addTilesetImage('oad-main', 'gameTiles')
  this.mainLayer = this.map.createLayer('main')
  this.blockedLayer = this.map.createLayer('blocked')
  this.treeTopLayer = this.map.createLayer('tree-tops')
  this.flowersLayer = this.map.createLayer('flowers')
  this.barLayer = this.map.createLayer('bar')

  this.dialogueStarted = false
  this.barDialogueStarted = false

  this.treeTopLayer.moveUp()

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
      if (!this.barDialogueStarted) {
        this.barDialogueStarted = true

        const brad = new Character(this.game, {
          name: 'brad',
          sprite: 'brad',
          isPlayer: false,
          x: 1736,
          y: 1438
        })

        const evan = new Character(this.game, {
          name: 'evan',
          sprite: 'evan',
          isPlayer: false,
          x: 1769,
          y: 1443
        })

        const mike = new Character(this.game, {
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
        const text = this.game.add.text(0, 0, 'MIKE EVAN BRAD: Surprise!', style)
        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2)
        text.setTextBounds(camera.x, camera.y + 100, 300, 100)

        setTimeout(() => {
          text.setText('OMAR: ohhh hey guys...so is everyone else on their way orrr?')

          setTimeout(() => {
            text.setText('MIKE: Yeah about that...')

            setTimeout(() => {
              text.setText('EVAN: We haven\'t made anybody else yet.')

              setTimeout(() => {
                text.setText('So these guys are from other games but it took you so long to get here that they all just got really drunk.')

                setTimeout(() => {
                  text.setText('MIKE: Yeah, this game is our Birthday present to you.')

                  setTimeout(() => {
                    text.setText('EVAN: HAPPY BIRTHDAY!')

                    setTimeout(() => {
                      text.setText('OMAR: Well, it\'s not much of a game huh? I mean what happened?')

                      setTimeout(() => {
                        text.setText('EVAN: Video games is hard bro.')
                        setTimeout(() => {
                          text.setText('MIKE: Yeah we are still working on it... but umm... look! Brad\'s here!')

                          setTimeout(() => {
                            text.setText('BRAD: hah hah! hey guys!..is megaman trying to do a keg stand? Wait. why i am here anyway?')
                            setTimeout(() => {
                              text.setText('EVAN: Well there is actually a much bigger story we have in mind for the full game.')
                              setTimeout(() => {
                                text.setText('MIKE: Yeah the game is actually not about lifeguarding at all really.')

                                setTimeout(() => {
                                  text.setText('It\'s about Omar\'s secret life of crime fighting after dark. Like in episode 95 of Indestructible Art!')
                                  setTimeout(() => {
                                    text.setText('EVAN: Yeah Brad, you\'re kind of like the femme fatale.')

                                    setTimeout(() => {
                                      text.setText('BRAD: Wow, that sounds pretty intense.')

                                      setTimeout(() => {
                                        text.setText('OMAR: Yeah that sounds really ambitious. I mean you guys aren\'t even moving around or anything.')

                                        setTimeout(() => {
                                          text.setText('EVAN: Did you see the sand catsle?')

                                          setTimeout(() => {
                                            text.setText('MIKE: Oh yeah! Did you find the special rocks?')

                                            setTimeout(() => {
                                              text.setText('OMAR: Are you guys just trying to talk about other random things so that no one is thinking about how janky this game is?')

                                              setTimeout(() => {
                                                text.setText('MIKE: Happy Birthday?')

                                                setTimeout(() => {
                                                  text.setText('EVAN: Yeahhhhh but that title screen is sick right?')
                                                  this.game.state.start('mainMenuBday')
                                                }, 3000)
                                              }, 3000)
                                            }, 3000)
                                          }, 3000)
                                        }, 3000)
                                      }, 3000)
                                    }, 3000)
                                  }, 3000)
                                }, 3000)
                              }, 3000)
                            }, 3000)
                          }, 3000)
                        }, 3000)
                      }, 3000)
                    }, 3000)
                  }, 3000)
                }, 3000)
              }, 3000)
            }, 3000)
          }, 3000)
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

        let text = this.game.add.text(0, 0, 'BRAD: Oh, hey Omar!', style)
        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2)
        text.setTextBounds(camera.x, camera.y + 100, 300, 100)

        this.dialogueStarted = true
        setTimeout(() => {
          text.setText('Omar: Don\'t worry Brad! I got you!')

          setTimeout(() => {
            text.setText('Brad: Oh I wasn\'t really drowning that\'s just how I swim.')

            setTimeout(() => {
              text.setText('Omar: ...')

              setTimeout(() => {
                text.setText('Brad: Besides this water isn\'t very good. Look we are just standing here.')

                setTimeout(() => {
                  text.setText('Omar: Yeahhhh, whats going on?')

                  setTimeout(() => {
                    text.setText('Brad: uuuuuummmm, oh yeah! I am suppose to tell you Happy Birthday!')

                      setTimeout(() => {
                        text.setText('annnnd um there is a surprise party.')
                        setTimeout(() => {
                          text.setText('So when you are done with your shift and... after dark... come to the bar!')

                          setTimeout(() => {
                            text.setText('Omar: ...okay.')

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
                          }, 3000)
                        }, 3000)
                      }, 3000)
                  }, 3000)
                }, 3000)
              }, 3000)
            }, 3000)
          }, 3000)
        }, 3000)
      }
    })
}

module.exports = GameLoop

},{"./Character":2}],6:[function(require,module,exports){
function GameOver (game) {
  this.game = game
}

GameOver.prototype.create = function create () {
  console.log('game over')
}

module.exports = GameOver

},{}],7:[function(require,module,exports){
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

},{"./Character":2}],8:[function(require,module,exports){
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
  this.tide.bringToTop()
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

},{"./Character":2}],9:[function(require,module,exports){
function MainMenu (game) {
  this.game = game
}

MainMenu.prototype.create = function create () {
  this.game.add.sprite(0, 0, 'titlescreen_sky')
  this.game.add.sprite(0, 0, 'titlescreen_moon')
  this.game.add.sprite(0, 0, 'titlescreen_ocean')
  this.reflection = this.game.add.sprite(0, 0, 'titlescreen_reflection')

  this.game.add.sprite(0, 0, 'titlescreen_BIRTHDAY_COMPLETE_sand_and_tower')
  this.palmtrees = this.game.add.sprite(0, 0, 'titlescreen_palmtrees')

  this.stars = this.game.add.sprite(0, 0, 'titlescreen_stars')

  this.game.add.sprite(0, 0, 'titlescreen_omar')
  this.game.add.sprite(0, 0, 'titlescreen_afterdark')

  this.palmtrees.animations.add('go', [0, 1, 0, 2])
  this.reflection.animations.add('go', [0, 1, 2])
  this.stars.animations.add('go', [0, 1, 2])

  this.game.input.gamepad.start()

  this.music = {}
  this.music.intro = this.game.add.audio('intro')
  this.music.start = this.game.add.audio('start')
  this.music.intro.loopFull(0.5)

  const pressStart = this.game.add.sprite(0, 0, 'press-start')
  this.enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER)
  this.enter.onDown.addOnce(this.startGame, this)

  this.timer = setInterval(() => {
    pressStart.visible = !pressStart.visible
  }, 500)
}

MainMenu.prototype.update = function update () {
  const pad = this.game.input.gamepad.pad1
  if (pad.justPressed(Phaser.Gamepad.XBOX360_START, 250)) {
    this.startGame()
  }
  this.palmtrees.animations.play('go', 3)
  this.reflection.animations.play('go', 5)
  this.stars.animations.play('go', 4)
}

MainMenu.prototype.startGame = function startGame () {
  console.log('starting game')
  this.music.start.play()
  clearInterval(this.timer)
  this.music.intro.stop()
  this.game.state.start('lifeguard')
}

module.exports = MainMenu

},{}],10:[function(require,module,exports){
function MainMenu (game) {
  this.game = game
}

MainMenu.prototype.create = function create () {
  this.game.add.sprite(0, 0, 'titlescreen_sky')
  this.game.add.sprite(0, 0, 'titlescreen_moon')
  this.game.add.sprite(0, 0, 'titlescreen_ocean')
  this.reflection = this.game.add.sprite(0, 0, 'titlescreen_reflection')

  this.game.add.sprite(0, 0, 'titlescreen_sand_and_tower')
  this.palmtrees = this.game.add.sprite(0, 0, 'titlescreen_palmtrees')

  this.stars = this.game.add.sprite(0, 0, 'titlescreen_stars')

  this.game.add.sprite(0, 0, 'titlescreen_omar')
  this.game.add.sprite(0, 0, 'titlescreen_afterdark')

  this.palmtrees.animations.add('go', [0, 1, 0, 2])
  this.reflection.animations.add('go', [0, 1, 2])
  this.stars.animations.add('go', [0, 1, 2])

  this.game.input.gamepad.start()

  this.music = {}
  this.music.intro = this.game.add.audio('intro')
  this.music.start = this.game.add.audio('start')
  this.music.intro.loopFull(0.5)

  const pressStart = this.game.add.sprite(0, 0, 'press-start')
  this.enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER)
  this.enter.onDown.addOnce(this.startGame, this)

  this.timer = setInterval(() => {
    pressStart.visible = !pressStart.visible
  }, 500)
}

MainMenu.prototype.update = function update () {
  const pad = this.game.input.gamepad.pad1
  if (pad.justPressed(Phaser.Gamepad.XBOX360_START, 250)) {
    this.startGame()
  }
  this.palmtrees.animations.play('go', 3)
  this.reflection.animations.play('go', 5)
  this.stars.animations.play('go', 4)
}

MainMenu.prototype.startGame = function startGame () {
  console.log('starting game')
  this.music.start.play()
  clearInterval(this.timer)
  this.music.intro.stop()
  this.game.state.start('lifeguard')
}

module.exports = MainMenu

},{}]},{},[1]);
