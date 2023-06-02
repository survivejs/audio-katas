import { produce } from "immer";
import { kick, snare } from "@teropa/drumkit";
import { init as initDebugWindow } from "./windows/debug";
import { init as initKeyboard } from "./windows/keyboard";
import { init as initOscillator } from "./windows/oscillator";
import { init as initSampler } from "./windows/sampler";
import { init as initSequencer } from "./windows/sequencer";

console.log("hello daw");

type ApplicationState = {
  playbackState: "paused" | "playing";
  volume: number;
  frequency: number;
  instruments: {
    // null as in not loaded yet
    kick: AudioBuffer | null;
    snare: AudioBuffer | null;
  };
  sequence: Record<number, boolean[]>; // boolean[][];
};

const $body = document.body;
let applicationState: ApplicationState = {
  playbackState: "paused",
  volume: 0, // [0, 100]
  frequency: 440,
  instruments: {
    kick: null,
    snare: null,
  },
  sequence: Object.fromEntries(
    Array.from(new Array(10), (_, i) => [
      i,
      Array.from(new Array(10), () => false),
    ])
  ),
};

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
initKeyboard($body, applicationState, messageBroker);
initOscillator($body, applicationState, messageBroker);
initSampler($body, applicationState, audioContext);
initSequencer($body, applicationState);

// Make initial state visible in the UI
Object.entries(applicationState).map(([k, v]) => updateListeners(k, v));

let previousVolume = applicationState.volume / 100;
function messageBroker(prop, payload) {
  switch (prop) {
    case "playbackState":
      applicationState = produce(applicationState, (draft) => {
        draft.playbackState = payload;
      });

      if (payload === "paused") {
        previousVolume = gainNode.gain.value;
        gainNode.gain.value = 0;
      }
      if (payload === "playing") {
        audioContext.resume();
        gainNode.gain.value = previousVolume;
      }
      break;
    case "volume":
      applicationState = produce(applicationState, (draft) => {
        draft.volume = payload;
      });

      gainNode.gain.value = payload / 100;
      break;
    case "frequency":
      applicationState = produce(applicationState, (draft) => {
        draft.frequency = payload;
      });

      oscillator.frequency.value = payload;
      break;
    // TODO: Handle sequence case
    default:
      break;
  }

  updateListeners(prop, payload);
}

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
