var boot = require('./lib/boot')
var mainMenu = require('./lib/main-menu')
var gameLoop = require('./lib/game-loop')
var gameOver = require('./lib/game-over')

var screenX = 800 
var screenY = 600

var game = new Phaser.Game(screenX, screenY, Phaser.CANVAS, '', null, false, false)

game.state.add('boot', boot)
game.state.add('mainMenu', mainMenu)
game.state.add('gameLoop', gameLoop)
game.state.add('gameOver', gameOver)

game.state.start('boot')
