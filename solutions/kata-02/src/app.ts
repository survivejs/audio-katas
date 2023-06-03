import { produce } from "immer";
import { init as initDebugWindow } from "./windows/debug";
import { init as initOscillator } from "./windows/oscillator";
import { updateStateListeners } from "../../utils/state";

console.log("hello daw");

type ApplicationState = {
  playbackState: "paused" | "playing";
  volume: number;
  frequency: number;
};

const $body = document.body;
let applicationState: ApplicationState = {
  playbackState: "paused",
  volume: 0, // [0, 100]
  frequency: 440,
};

// Create audio graph
const audioContext = new AudioContext();

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

initDebugWindow($body, sendMessage);
initOscillator($body, sendMessage);

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
