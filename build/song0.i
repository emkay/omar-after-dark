song0_header:
	.byte $04
	.byte MUSIC_SQ1
	.byte $01
	.byte SQUARE_1
	.byte $30
	.byte ve_middle
	.word song0_square1
	.byte $4C
	.byte MUSIC_SQ2
	.byte $01
	.byte SQUARE_2
	.byte $30
	.byte ve_middle
	.word song0_square2
	.byte $4C
	.byte MUSIC_TRI
	.byte $01
	.byte TRIANGLE
	.byte $70
	.byte ve_on
	.word song0_triangle
	.byte $4C
	.byte MUSIC_NOI
	.byte $01
	.byte NOISE
	.byte $30
	.byte ve_drum_decay
	.word song0_noise
	.byte $4C


main_loop:
song0_square1:

	.byte endsound
song0_square2:

	.byte endsound
song0_triangle:

	.byte endsound
song0_noise:

	.byte eighth, $01

	.byte volume_envelope, ve_fade_in
	.byte quarter, $02,$03,$04

	.byte endsound
