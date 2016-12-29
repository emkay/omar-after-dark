window.PIXI = require('phaser-ce/build/custom/pixi')
window.p2 = require('phaser-ce/build/custom/p2')
window.Phaser = require('phaser-ce/build/custom/phaser-split')

const pressStart = require('press-start-font')
const boot = require('./lib/boot')
const mainMenu = require('./lib/main-menu')
const gameLoop = require('./lib/game-loop')
const gameOver = require('./lib/game-over')

pressStart()

const screenX = 398
const screenY = 224

const game = new Phaser.Game(screenX, screenY, Phaser.AUTO, '', null)

game.state.add('boot', boot)
game.state.add('mainMenu', mainMenu)
game.state.add('gameLoop', gameLoop)
game.state.add('gameOver', gameOver)

game.state.start('boot')
