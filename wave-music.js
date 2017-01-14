const Song = require('nesly-sound')

const song = Song()

const noi = song.noise

function yes () {
  noi(['$01']).fadeIn()
  noi(['$02', '$03', '$04']).timing(1 / 4)
}

yes()

song.done()
song.write()
