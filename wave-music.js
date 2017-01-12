const Song = require('nesly-sound')

const song = Song()

const noi = song.noise

function loop (n, fn) {
  if (n === 0) return

  fn()
  return loop(n - 1, fn)
}

function yes () {
  noi(['$01']).fadeIn()
  noi(['$02', '$03', '$04']).timing(1 / 4)
}

yes()

song.done()
song.write()
