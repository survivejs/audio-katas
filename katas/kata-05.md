# Kata 5 - Music sequencing

The purpose of this kata is to get familiar with the idea of [music sequencing](https://en.wikipedia.org/wiki/Music_sequencer) and its impact on music production.

## Learning aims

The minimal target of this kata is to understand the basic ideas behind sequencing:

* Setting up a minimal sequencer to allow definition of simple songs manually
* Understanding different forms of sequencing

## Task

Complete the following:

1. Set up a window with a user interface that contains rows of toggleable buttons. Each row represents a series of steps and each column represents a note within the step. When the button is enabled, a note should be played. When disabled, nothing should happen. In the first phase, it is enough to support only one note per column.
2. Optional - Support playing multiple notes per column.
3. Optional - Allow adjusting tempo.
4. Optional - Allow setting up multiple tracks. For example, you could associate a sequencer window to a specific instrument and allow creation of multiple sequencer windows to model the feature.
5. Optional - Match the four oscillators of the original 8-bit Nintendo and allow composing using them
6. Optional - Allow playback of notes and play some legendary tune (Mario, Zelda, ...) through your system. To do this, you might need to implement some form of parser depending on the notation (pun intended).
7. Optional - Implement a drum machine. This is similar to the first task but instead of notes, each row should trigger different drum instruments and play samples.

## Reference

### Web Audio

* [Using IIR Filters](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_IIR_filters)
* [Web audio spatialization basics](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Web_audio_spatialization_basics)
* [Advanced techniques: Creating and sequencing audio](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Advanced_techniques)
* [Sequencer example](https://jonoliver.codes/sequencer/)
* [WASM SYNTH, or, how music taught me the beauty of math](https://proofinprogress.com/posts/2020-02-19/wasm-synth.html)
* [WebularSynth](https://github.com/cantastage/webular-synth)
* [webaudio-tinysynth](https://g200kg.github.io/webaudio-tinysynth/)
* [Understanding The Web Audio Clock](https://sonoport.github.io/web-audio-clock.html)

### Concepts

* [Beat and tempo explained](https://learningmusic.ableton.com/make-beats/beat-and-tempo.html)
* [Music tracker (wikipedia)](https://en.wikipedia.org/wiki/Music_tracker)

### Programs

* [Roland50 Studio](https://roland50.studio/)
* [iO-808](https://io808.com/)
* [The Mini Moog Factory](https://www.moogmusic.com/news/celebrate-our-70th-anniversary-and-bobs-birthday-new-virtual-experience)
* [GarageBand](https://www.apple.com/mac/garageband/)

### Game audio libraries

* [iMUSE](https://en.wikipedia.org/wiki/IMUSE)
* [fmod](https://www.fmod.com/)
* [wwise](https://en.wikipedia.org/wiki/Audiokinetic_Wwise)

### Documentaries

* [I Dream of Wires](https://www.imdb.com/title/tt3636334/)
* [Sisters with Transistors](https://www.imdb.com/title/tt6744250/)
* [Subharcord](https://www.imdb.com/title/tt19244906/)

### Songs

* [2nd Reality - Skaven - Impulse Tracker](https://www.youtube.com/watch?v=cpNGBzd2SLE)
* [Tubular Bells](https://en.m.wikipedia.org/wiki/Tubular_Bells)
* [Popcorn](https://en.m.wikipedia.org/wiki/Popcorn_(instrumental)) - song

### Artists

* [Kraftwerk](https://en.m.wikipedia.org/wiki/Kraftwerk)
* [Daft Punk](https://en.wikipedia.org/wiki/Daft_Punk)
* [Brian Eno](https://en.m.wikipedia.org/wiki/Brian_Eno)
* [Jan Hammer](https://en.m.wikipedia.org/wiki/Jan_Hammer)
* [Herbie Hancock](https://en.m.wikipedia.org/wiki/Herbie_Hancock)
* [Skaven](https://www.mikseri.net/artists/skaven.33783.php?displ_lang=en)
