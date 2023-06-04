# Kata 6 - Audio worklets

The purpose of this kata is to understand what is an [AudioWorklet](https://developer.mozilla.org/en-US/docs/Web/API/AudioWorklet) and how it complements Web Audio API.

## Learning aims

The minimal target of this kata is to get used to writing audio worklets and understand their value for music production:

* Setting up an AudioWorklet
* Understanding the relationship between Web Audio API and AudioWorklets

## Task

Complete the following:

1. Implement a sine oscillator using an audio worklet
2. Optional - implement a delay effect using an audio worklet
3. Optional - integrate a ladder filter to the system using an audio worklet

## Reference

### Web Audio

* [Enter Audio Worklet](https://developer.chrome.com/blog/audio-worklet/)
* [Background audio processing using AudioWorklet](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_AudioWorklet)
* [Audio worklet design pattern](https://developer.chrome.com/blog/audio-worklet-design-pattern/)
* [Code examples and resources for Audio Worklet](https://googlechromelabs.github.io/web-audio-samples/audio-worklet/)

### WASM

* [A WASM implementation of Moog ladder filter for Web Audio Worklet Node](https://github.com/TheBouteillacBear/webaudioworklet-wasm)
* [WASM synth for Web Audio](https://github.com/a-cordier/wasm-audio)
* [Wasm Audio Worklets API](https://emscripten.org/docs/api_reference/wasm_audio_worklets.html)
* [WASM audio worklet](https://rustwasm.github.io/wasm-bindgen/examples/wasm-audio-worklet.html)

### Filters

* [The Moog Ladder Filter](https://www.youtube.com/watch?v=5sAq0FjRUI4) - 4 min explanation
* [The Classic Sound of the Moog Ladder Filter](https://www.uaudio.com/blog/moog-ladder-filter/)
* [Tutorial: Implementing a Basic Delay Effect](https://wiki.analog.com/resources/tools-software/sharc-audio-module/baremetal/delay-effect-tutorial)
