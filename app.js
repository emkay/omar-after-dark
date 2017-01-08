require('./phaser')
const boot = require('./lib/boot')
const mainMenu = require('./lib/main-menu')
const gameLoop = require('./lib/game-loop')
const gameOver = require('./lib/game-over')

const screenX = 398
const screenY = 224

const game = new Phaser.Game(screenX, screenY, Phaser.CANVAS, '', null)

game.state.add('boot', boot)
game.state.add('mainMenu', mainMenu)
game.state.add('gameLoop', gameLoop)
game.state.add('gameOver', gameOver)

game.state.start('boot')
