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

	.byte eighth, rest

	.byte duty, duty_50
	.byte volume_envelope, ve_blip
	.byte half, Gs2,Ds2,G2,D2

	.byte half, G2,Ds2,Gs2,Bb2

	.byte half, Gs2,Ds2,G2,D2

	.byte half, G2,Ds2,Gs2,Bb2

	.byte half, Gs2,Ds2,G2,D2

	.byte half, G2,Ds2,Gs2,Bb2

	.byte half, Gs2,Ds2,G2,D2

	.byte volume_envelope, ve_short_staccato
	.byte half, G2,Ds2,Gs2,Bb2

	.byte eighth, rest

	.byte duty, duty_0
	.byte quarter, Gs2,Ds2,G2,D2

	.byte quarter, G2,Ds2,Gs2,Bb2

	.byte quarter, Gs2,Ds2,G2,D2

	.byte quarter, G2,Ds2,Gs2,Bb2

	.byte quarter, Gs2,Ds2,G2,D2

	.byte quarter, G2,Ds2,Gs2,Bb2

	.byte quarter, Gs2,Ds2,G2,D2

	.byte quarter, G2,Ds2,Gs2,Bb2

	.byte endsound
song0_square2:

	.byte endsound
song0_triangle:

	.byte eighth, rest

	.byte half, Gs3,Ds3,G3,D3

	.byte half, G3,Ds3,Gs3,Bb3

	.byte half, Gs3,Ds3,G3,D3

	.byte half, G3,Ds3,Gs3,Bb3

	.byte half, Gs3,Ds3,G3,D3

	.byte half, G3,Ds3,Gs3,Bb3

	.byte half, Gs3,Ds3,G3,D3

	.byte half, G3,Ds3,Gs3,Bb4

	.byte eighth, rest

	.byte quarter, Gs3,Ds3,G3,D3

	.byte quarter, G3,Ds3,Gs3,Bb3

	.byte quarter, Gs3,Ds3,G3,D3

	.byte quarter, G3,Ds3,Gs3,Bb3

	.byte quarter, Gs3,Ds3,G3,D3

	.byte quarter, G3,Ds3,Gs3,Bb3

	.byte quarter, Gs3,Ds3,G3,D3

	.byte quarter, G3,Ds3,Gs3,Bb3

	.byte endsound
song0_noise:

	.byte eighth, rest

	.byte volume_envelope, ve_off
	.byte half, rest,rest,rest,rest

	.byte half, rest,rest,rest,rest

	.byte half, rest,rest,rest,rest

	.byte half, rest,rest,rest,rest

	.byte half, rest,rest,rest,rest

	.byte half, rest,rest,rest,rest

	.byte half, rest,rest,rest,rest

	.byte half, rest,rest,rest,rest

	.byte eighth, rest

	.byte volume_envelope, ve_on
	.byte eighth, $10,rest,$06,$05

	.byte eighth, $10,rest,$06,$05

	.byte eighth, $10,rest,$06,$05

	.byte eighth, $10,rest,$06,$05

	.byte eighth, $10,rest,$06,$05

	.byte eighth, $10,rest,$06,$05

	.byte eighth, $10,rest,$06,$05

	.byte eighth, $10,rest,$06,$05

	.byte eighth, $10,rest,$06,$05

	.byte eighth, $10,rest,$06,$05

	.byte eighth, $10,rest,$06,$05

	.byte eighth, $10,rest,$06,$05

	.byte eighth, $10,rest,$06,$05

	.byte eighth, $10,rest,$06,$05

	.byte eighth, $10,rest,$06,$05

	.byte eighth, $10,rest,$06,$05

	.byte endsound
