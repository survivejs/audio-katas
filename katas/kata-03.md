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
4. Optional - Figure out how to add sustain to playing notes. In other words, play the note only as long as the key is pressed instead of changing only frequency.
5. Optional - Figure out how to support playing multiple notes at once
6. Optional - Allow playing your musical keyboard with the keyboard of your machine
7. Optional - Look up the [MIDI](https://en.wikipedia.org/wiki/MIDI) standard and consider how you might use it to expand the system with a physical device
8. Optional - Add a musical note renderer using a library like [VexFlow](https://www.vexflow.com/)

## Reference

### UI

* [Piano example (css)](https://github.com/isbendiyarovanezrin/Piano)
* [Complete piano example (codepen)](https://codepen.io/gabrielcarol/pen/rGeEbY)

### Libraries

* [tonal](https://github.com/tonaljs/tonal) - a music theory library

### Theory

* [Note frequencies listed](https://pages.mtu.edu/~suits/notefreqs.html)
* [Notes, Scales and Modes in Music](https://deviantnoise.com/music-theory/notes-scales-modes/)

### Web Audio

* [Recreating legendary 8-bit games music with Web Audio API](https://codepen.io/gregh/post/recreating-legendary-8-bit-games-music-with-web-audio-api)
* [Making Noise with Web Audio API](https://sparkbox.com/foundry/chiptune_style_browser_generated_music_using_tone.js) - 12 min video
* [Interactive Sound and Visuals: A Tone.js and p5.js Beginner's Guide](https://musichackspace.org/product/interactive-sound-and-visuals-a-tone-js-and-p5-js-beginners-guide/) - Paid course
* [Getting Started With The Web MIDI API](https://www.smashingmagazine.com/2018/03/web-midi-api/)

### Videos

* [Piano basics 1: sound, notes and the keyboard](https://www.youtube.com/watch?v=l6ihnJFDnJA)
