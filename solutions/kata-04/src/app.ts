import { kick, snare } from "@teropa/drumkit";
import { init as initDebugWindow } from "./windows/debug";
import { init as initKeyboard } from "./windows/keyboard";
import { init as initOscillator } from "./windows/oscillator";
import { init as initSampler } from "./windows/sampler";

console.log("hello daw");

const $body = document.body;
const initialState: {
  playbackState: "paused" | "playing";
  volume: number;
  frequency: number;
  instruments: {
    // null as in not loaded yet
    kick: AudioBuffer | null;
    snare: AudioBuffer | null;
  };
} = {
  playbackState: "paused",
  volume: 0, // [0, 100]
  frequency: 440,
  instruments: {
    kick: null,
    snare: null,
  },
};

let previousVolume = initialState.volume / 100;
const applicationState = new Proxy(initialState, {
  set(obj, prop, value) {
    updateListeners(String(prop), value);

    if (prop === "playbackState") {
      if (value === "paused") {
        previousVolume = gainNode.gain.value;
        gainNode.gain.value = 0;
      }
      if (value === "playing") {
        audioContext.resume();
        gainNode.gain.value = previousVolume;
      }
    }
    if (prop === "volume") {
      gainNode.gain.value = value / 100;
    }
    if (prop === "frequency") {
      oscillator.frequency.value = value;
    }

    return Reflect.set(obj, prop, value);
  },
});

// Create audio graph
// TODO: Check https://stackoverflow.com/a/76175156/228885
// Likely there's a better way to create an audio context
// as that avoids confusion with .resume() since it won't be suspended.
const audioContext = new AudioContext();

// Set up an oscillator
const oscillator = audioContext.createOscillator();
oscillator.type = "sine";
oscillator.frequency.value = applicationState.frequency;

// Volume
const gainNode = audioContext.createGain();
gainNode.gain.value = applicationState.volume / 100;

oscillator.connect(gainNode);
gainNode.connect(audioContext.destination);

// This can be run only once!
oscillator.start();

loadSamples(audioContext);

initDebugWindow($body, applicationState);
initKeyboard($body, applicationState);
initOscillator($body, applicationState);
initSampler($body, applicationState, audioContext);

// Make initial state visible in the UI
Object.entries(initialState).map(([k, v]) => updateListeners(k, v));

function updateListeners(prop: string, value: unknown) {
  const $listeners = document.querySelectorAll(`[data-${String(prop)}]`);

  $listeners.forEach(($listener) => ($listener.innerHTML = String(value)));
}

async function loadSamples(audioContext: AudioContext) {
  applicationState.instruments.kick = await loadSample(audioContext, kick);
  applicationState.instruments.snare = await loadSample(audioContext, snare);
}

async function loadSample(audioContext: AudioContext, instrument: string) {
  return fetch(instrument)
    .then((res) => res.arrayBuffer())
    .then((buf) => audioContext.decodeAudioData(buf));
}
