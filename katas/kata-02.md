# Kata 2 - Oscillation

The purpose of this kata is to implement simple [oscillators](https://en.wikipedia.org/wiki/Oscillation) as the first part of our DAW.

## Learning aims

The minimal target of this kata is to get started with the Audio API and understand oscillators on a basic level:

* Initializing Web Audio
* Understanding what is an oscillator
* Setting up an oscillator

## Task

Complete the following:

1. Add a window with controls to start and stop playback
2. Attach a Web Audio based sine wave oscillator to the controls so that it plays when you click start and stops when you click stop
3. Add a volume control
4. Add a control for adjusting oscillator frequency
5. Optional - Set up a random noise generator
6. Optional - Allow mixing between oscillator and random noise
7. Optional - Add a way to select between a couple of different waveform types
8. Optional - Add a control that lets the use to change the oscillator type (not just sine)
9. Optional - Add a window for displaying and debugging application state
10. Optional - Add a way to save oscillators
11. Optional - Add a way to duplicate oscillators and play multiple at once
12. Optional - Visualize oscillation in a separate window
13. Optional - Implement a [theremin](https://en.wikipedia.org/wiki/Theremin) to allow adjusting two parameters (volume, frequence for example) of a waveform using a single control. A 2D slider is a good choice for this.

## Reference

### UI

* [Nexus](https://nexus-js.github.io/ui/) - UI helpers for audio interfaces
* [classList API](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList)
* [HTML range input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range)
* [UTF media control symbols](https://en.wikipedia.org/wiki/Media_control_symbols)
* [HTML button element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button)

### Web Audio

* [OscillatorNode](https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode)
* [Oscillator examples](https://codepen.io/jonoliver/pen/NoawPv)
* [Web Audio API reference at MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
* [Using the Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API)
* [Web Audio API: Why Compose When You Can Code?](https://www.toptal.com/web/web-audio-api-tutorial)
* [Introduction to the Web Audio API at ui.dev](https://ui.dev/web-audio-api)
* [Web Audio related libraries on GitHub](https://github.com/topics/webaudio-api?l=javascript)
* [Web Audio Synthesis & Visualization](https://frontendmasters.com/courses/web-audio/) - Paid course
* [A Different Introduction to the Web Audio API](https://medium.com/@danielmckemie/tips-and-techniques-for-using-the-web-audio-api-89b8beda6cf2) - Great visual explanations
* [Exploring FM synthesis](https://observablehq.com/@ramonaisonline/synthesis)

### Theory

* [Get started making sounds](https://learningsynths.ableton.com/)
* [How synths make sound?](https://learningsynths.ableton.com/en/oscillators/how-synths-make-sound)
* [How to make chiptunes](https://soundation.com/music-genres/how-to-make-chiptunes)
* [Fourier transform (wikipedia)](https://en.wikipedia.org/wiki/Fourier_transform)
* [What is FM synthesis? The ultimate beginner's guide](https://www.musicradar.com/news/what-is-fm-synthesis)
* [Polyphony and monophony in instruments (wikipedia)](https://en.wikipedia.org/wiki/Polyphony_and_monophony_in_instruments)

### Songs

* [Danger Zone (wikipedia)](https://en.wikipedia.org/wiki/Danger_Zone_(song))

### Videos

* [Ultimate Introduction to Chiptune Programs Part 1: General Tools (video)](https://www.youtube.com/watch?v=WNxw8OzUwfg)
* [A brief history of synthesizers](https://www.youtube.com/watch?v=5sjreF6H_rY)
