function Item (game, options) {
  options = options || {}
  this.game = game
  this.name = options.name
  this.sprite = this.game.add.sprite(0, 0, options.sprite)
}

module.exports = Item
