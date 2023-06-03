import { produce } from "immer";
import { kick, snare } from "@teropa/drumkit";
import { init as initDebugWindow } from "./windows/debug";
import { init as initKeyboardWindow } from "./windows/keyboard";
import { init as initOscillatorWindow } from "./windows/oscillator";
import { init as initSamplerWindow } from "./windows/sampler";
import { updateStateListeners } from "../../utils/state";

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

initDebugWindow($body, sendMessage);
initKeyboardWindow($body, sendMessage);
initOscillatorWindow($body, sendMessage);
initSamplerWindow($body, sendMessage, audioContext);

// Make initial state visible in the UI
Object.entries(applicationState).map(([k, v]) => updateStateListeners(k, v));

// State management
let previousVolume = applicationState.volume / 100;
function sendMessage(type, prop, payload) {
  switch (type) {
    case "get":
      return applicationState[prop];
    case "set":
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
        default:
          break;
      }

      updateStateListeners(prop, payload);
      break;
    default:
      break;
  }
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
