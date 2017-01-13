const boot = require('./lib/boot')
const mainMenu = require('./lib/main-menu')
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
game.state.add('lifeguard', lifeGuard)
game.state.add('life-guard-binoculars', lifeGuardBinoculars)
game.state.add('bar', bar)
game.state.add('gameLoop', gameLoop)
game.state.add('gameOver', gameOver)

game.state.start('boot')
