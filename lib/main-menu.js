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
  clearInterval(this.timer)
  this.music.intro.stop()
  this.game.state.start('lifeguard')
}

module.exports = MainMenu
