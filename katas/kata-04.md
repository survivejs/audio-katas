# Kata 4 - Audio sampling

The purpose of this kata is to understand the concept of [sampling](https://en.wikipedia.org/wiki/Sampling_(signal_processing)) and why it matters for audio processing.

## Learning aims

The minimal target of this kata is to get acquainted with the concept of sampling:

* Loading a sample
* Setting up multiple sampled instruments
* Understanding the basic theory behind sampling

## Task

Complete the following:

1. Set up a window where to load custom, sampled instruments
2. Define several custom instruments using samples. Piano and different types of drums (see [@teropa/drumkit](https://www.npmjs.com/package/@teropa/drumkit)) are good examples. You could also try to introduce [Amen break](https://en.wikipedia.org/wiki/Amen_break).
3. Optional - Add an audio visualizer window to show the current waveform
4. Optional - Figure out where the standard 44100 Hz sampling frequency comes from and what the implications of this limit for signal processing

## Reference

### Web Audio

* [Loading sound (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API#loading_sound)
* [High-resolution real-time spectrum analyzer and music player using Web Audio and Canvas APIs](https://github.com/hvianna/audioMotion.js)
* [Getting started with Web Audio API](https://web.dev/webaudio-intro/) - Note that this uses an outdated, Chrome-specific API so you have to doublecheck the API calls (`start` instead of `noteOn` etc.)!

## Samples

* [@teropa/drumkit](https://www.npmjs.com/package/@teropa/drumkit)
* [SampleRadar: 204 free percussion samples](https://www.musicradar.com/news/tech/sampleradar-204-free-percussion-samples-523942)

### Concepts

* [Sample rates and audio sampling: a guide for beginners](https://www.adobe.com/uk/creativecloud/video/discover/audio-sampling.html)
* [Every noise at once](https://everynoise.com/)
* [Ishkur's guide to music](http://music.ishkur.com/)
* [Nyquist frequency](https://en.wikipedia.org/wiki/Nyquist_frequency)
* [Foley (wikipedia)](https://en.wikipedia.org/wiki/Foley_(filmmaking))
* [How Music Affects Your Productivity](https://www.entrepreneur.com/living/how-music-affects-your-productivity/235654)
* [Why do people love electronic music?](https://www.arc.unsw.edu.au/blitz/read/why-do-people-love-electronic-music)

### Documentaries

* [May the 4th be with you, in a new documentary on the sounds of Skywalker](https://cdm.link/2022/05/may-the-4th-be-with-you-in-a-new-documentary-on-the-sounds-of-skywalker/)
* [Behind the Mac: Skywalker Sound | Apple (video)](https://www.youtube.com/watch?v=E99Et5mzxv0)

### Videos

* [Why Does Tears Of The Kingdom Sound So Good?](https://www.youtube.com/watch?v=toEdi_wjTGM) - Good intro to tonality
