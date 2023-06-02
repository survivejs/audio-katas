// import { kick, snare } from "@teropa/drumkit";
import { init as initDebugWindow } from "./windows/debug";
import { init as initKeyboard } from "./windows/keyboard";
import { init as initPlayback } from "./windows/playback";

console.log("hello daw");

const $body = document.body;
const initialState: {
  playbackState: "paused" | "playing";
  volume: number;
  frequency: number;
} = {
  playbackState: "paused",
  volume: 50, // [0, 100]
  frequency: 440,
};
const applicationState = new Proxy(initialState, {
  set(obj, prop, value) {
    updateListeners(String(prop), value);

    if (prop === "playbackState") {
      if (value === "paused") {
        audioContext.suspend();
      }
      if (value === "playing") {
        audioContext.resume();
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

// Don't play anything initially. Maybe there is a better spot for this
audioContext.suspend();

// const kickInstrument = await loadSample(kick);
// const snareInstrument = await loadSample(snare);

// console.log(kick, kickInstrument);

// const track = audioContext.createMediaElementSource(audioElement);

initDebugWindow($body, applicationState);
initKeyboard($body, applicationState);
initPlayback($body, applicationState);

// Make initial state visible in the UI
Object.entries(initialState).map(([k, v]) => updateListeners(k, v));

function updateListeners(prop: string, value: number | string) {
  const $listeners = document.querySelectorAll(`[data-${String(prop)}]`);

  $listeners.forEach(($listener) => ($listener.innerHTML = String(value)));
}

function loadSample(instrument) {
  return fetch(instrument)
    .then((res) => res.arrayBuffer())
    .then((buf) => audioContext.decodeAudioData(buf));
}
