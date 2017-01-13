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
