const Song = require('nesly-sound')

const song = Song()

const sq1 = song.square1
const sq2 = song.square2
const tri = song.triangle
const noi = song.noise

function loop (n, fn) {
  if (n === 0) return

  fn()
  return loop(n - 1, fn)
}

function yes () {
  sq1(['rest']).duty(50).blip()
  tri(['rest'])
  noi(['rest']).volOff()

  loop(3, function () {
    sq1(['Gs2', 'Ds2',
      'G2', 'D2'])
      .timing(1 / 2)

    noi(['rest', 'rest', 'rest', 'rest'])
      .timing (1 / 2)

    tri(['Gs3', 'Ds3',
      'G3', 'D3'])
      .timing(1 / 2)

    sq1(['G2', 'Ds2', 'Gs2', 'Bb2'])
      .timing(1 / 2)

    noi(['rest', 'rest', 'rest', 'rest'])
      .timing (1 / 2)

    tri(['G3', 'Ds3', 'Gs3', 'Bb3'])
      .timing(1 / 2)
  })

  loop(1, function () {
    sq1(['Gs2', 'Ds2',
      'G2', 'D2'])
      .timing(1 / 2).staccato()

    noi(['rest', 'rest', 'rest', 'rest'])
      .timing (1 / 2)

    tri(['Gs3', 'Ds3',
      'G3', 'D3'])
      .timing(1 / 2)

    sq1(['G2', 'Ds2', 'Gs2', 'Bb2'])
      .timing(1 / 2)

    noi(['rest', 'rest', 'rest', 'rest'])
      .timing (1 / 2)

    tri(['G3', 'Ds3', 'Gs3', 'Bb4'])
      .timing(1 / 2)
  })
  noi(['rest']).volOn()
  sq1(['rest']).duty(75)
  tri(['rest'])

  loop(4, () => {
    sq1(['Gs2', 'Ds2',
      'G2', 'D2'])
      .timing(1 / 4)

    loop(4, () => {
      noi(['$10', 'rest', '$06', '$05'])
        .timing(1 / 8)
    })

    tri(['Gs3', 'Ds3',
      'G3', 'D3'])
      .timing(1 / 4)

    sq1(['G2', 'Ds2', 'Gs2', 'Bb2'])
      .timing(1 / 4)

    tri(['G3', 'Ds3', 'Gs3', 'Bb3'])
      .timing(1 / 4)
  })
}

yes()

song.done()
song.write()
