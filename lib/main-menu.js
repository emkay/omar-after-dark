function MainMenu (game) {
  this.game = game
}

MainMenu.prototype.create = function create () {
  this.game.add.sprite(0, 0, 'title')
  this.game.input.gamepad.start()

  const pressStart = this.game.add.sprite(0, 0, 'press-start')
  this.enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER)
  this.enter.onDown.addOnce(this.startGame, this)

  this.timer = setInterval(() => {
    pressStart.visible = !pressStart.visible
  }, 500)
}

MainMenu.prototype.update = function update () {
  const pad = this.game.input.gamepad.pad1
  if(pad.justPressed(Phaser.Gamepad.XBOX360_START, 250)) {
    this.startGame()
  }
}

MainMenu.prototype.startGame = function startGame () {
  console.log('starting game')
  clearInterval(this.timer)
  this.game.state.start('gameLoop')
}

module.exports = MainMenu
