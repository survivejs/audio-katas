# Kata 3 - Musical keyboard

The purpose of this kata is to add a [musical keyboard](https://en.wikipedia.org/wiki/Musical_keyboard) to our DAW.

## Learning aims

The minimal target of this kata is to understand how to connect user input with the system to produce sounds:

* Setting up a musical keyboard to capture user input
* Understanding how notes are defined
* Understanding the value of abstractions like tonal or Tone.js

## Task

Complete the following:

1. Find a suitable premade keyboard component online and insert it to the DAW within a window of its own
2. Research how notes are defined using Web Audio API and connect your oscillator with the keyboard so that it is possible to play it. It is enough if it changes only the frequency of the oscillator as you press on different keys.
3. Refactor the implementation to use [tonal](https://www.npmjs.com/package/tonal) or [Tone.js](https://tonejs.github.io/)
4. Optional - Figure out how to add [envelopes](<https://en.wikipedia.org/wiki/Envelope_(music)>) to playing notes. In other words, play the note only as long as the key is pressed instead of changing only frequency.
5. Optional - Figure out how to support playing multiple notes at once
6. Optional - Allow playing your musical keyboard with the keyboard of your machine
7. Optional - Adapt your keyboard to use a [tuning system](https://isartum.net/leimma) different from Western equal temperament.
8. Optional - Look up the [MIDI](https://en.wikipedia.org/wiki/MIDI) standard and consider how you might use it to expand the system with a physical device
9. Optional - Add a musical note renderer using a library like [VexFlow](https://www.vexflow.com/)
10. Optional - Make it possible to play the keyboard automatically (i.e., generate notes to play). See [generative music (wikipedia)](https://en.wikipedia.org/wiki/Generative_music) for more information.

## Reference

### UI

* [Piano example (css)](https://github.com/isbendiyarovanezrin/Piano)
* [Complete piano example (codepen)](https://codepen.io/gabrielcarol/pen/rGeEbY)

### Libraries

* [tonal](https://github.com/tonaljs/tonal) - a music theory library
* [Tone.js](https://tonejs.github.io/) - web audio abstractions for music
* [AudioKeys](https://github.com/kylestetz/AudioKeys) - musical note input handlers for QWERTY keyboards
* [webmidi.js](https://webmidijs.org/)

### Theory

* [Note frequencies listed](https://pages.mtu.edu/~suits/notefreqs.html)
* [Formulas for converting between note values and frequencies](https://newt.phys.unsw.edu.au/jw/notes.html)
* [Notes, Scales and Modes in Music](https://deviantnoise.com/music-theory/notes-scales-modes/)
* [Byzantine vs Western Notation](https://stanthonysmonastery.org/pages/byzantine-vs-western-notation)
* [Table of Byzantine notation symbols (pdf)](http://www.byzantinechant.org/notation/Table%20of%20Byzantine%20Notation%20Symbols.pdf)
* [Why is there no B or E sharp](https://soundadventurer.com/why-is-there-no-b-or-e-sharp/)

### Web Audio

* [Web MIDI API](https://www.w3.org/TR/webmidi/)
* [Recreating legendary 8-bit games music with Web Audio API](https://codepen.io/gregh/post/recreating-legendary-8-bit-games-music-with-web-audio-api)
* [Making Noise with Web Audio API](https://sparkbox.com/foundry/chiptune_style_browser_generated_music_using_tone.js) - 12 min video
* [Getting Started With The Web MIDI API](https://www.smashingmagazine.com/2018/03/web-midi-api/)

### Videos

* [Piano basics 1: sound, notes and the keyboard](https://www.youtube.com/watch?v=l6ihnJFDnJA)
