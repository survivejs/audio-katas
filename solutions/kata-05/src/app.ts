import { produce } from "immer";
import { Note, Scale } from "tonal";
import { kick, snare } from "@teropa/drumkit";
import { init as initDebugWindow } from "./windows/debug";
import { init as initKeyboard } from "./windows/keyboard";
import { init as initOscillator } from "./windows/oscillator";
import { init as initSampler } from "./windows/sampler";
import { init as initSequencer } from "./windows/sequencer";
import { loadSample } from "../../utils/audio";

// TODO: Share this with the sequencer so they stay in sync
const C_NOTE_FREQUENCIES = Scale.get("C major").notes.map((note) =>
  // Pick from the fourth octave
  Note.freq(note + 4)
);

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
  sequence: boolean[][];
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
  sequence: Array.from(new Array(10), () =>
    Array.from(new Array(10), () => false)
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

initDebugWindow($body, sendMessage);
initKeyboard($body, sendMessage);
initOscillator($body, sendMessage);
initSampler($body, sendMessage, audioContext);
initSequencer($body, sendMessage);

// Make initial state visible in the UI
Object.entries(applicationState).map(([k, v]) => updateListeners(k, v));

// Set up a scheduler to play our song
// Adapted from https://sonoport.github.io/web-audio-clock.html
let note = 0;
let nextNotetime = audioContext.currentTime;
function scheduler() {
  while (nextNotetime < audioContext.currentTime + 0.1) {
    const currentNotes =
      applicationState.sequence[note % applicationState.sequence.length];
    const firstNoteIndex = currentNotes.findIndex((a) => a === true);

    // Since we have only one oscillator, play only the first note
    if (firstNoteIndex >= 0) {
      // Map to a note
      const noteFrequency = C_NOTE_FREQUENCIES[firstNoteIndex];

      sendMessage("set", "frequency", noteFrequency);
    }

    nextNotetime += 0.5;
    note++;
  }

  window.setTimeout(scheduler, 50.0);
}

scheduler();

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
        case "sequence":
          applicationState = produce(applicationState, (draft) => {
            draft.sequence[payload.x][payload.y] = payload.value;
          });
          break;
        default:
          break;
      }

      updateListeners(prop, payload);
      break;
    default:
      break;
  }
}

function updateListeners(prop: string, payload: unknown) {
  const $keyListeners = document.querySelectorAll("[data-key]");
  const $propMatches = Array.from($keyListeners).filter(
    // @ts-expect-error This is fine (wrong type after filtering)
    (e) => e.dataset.key === prop
  );

  if (Array.isArray(payload)) {
    // no-op: Ignore for now (sequencer init case), this needs some generic solution
    // based on a type check.
  }
  // @ts-expect-error This is fine, maybe check object in a better way, though
  else if (payload.hasOwnProperty("x") && payload.hasOwnProperty("y")) {
    const $xyMatch = $propMatches.filter(
      (e) =>
        // @ts-expect-error This is fine (wrong type after filtering)
        e.dataset.x === String(payload.x) && e.dataset.y === String(payload.y)
    );

    // The assumption is that there is only one match
    if ($xyMatch.length) {
      // @ts-expect-error This is fine as the type is wrong
      $xyMatch[0].dataset.value = payload.value.toString();
    }
  } else {
    $propMatches.forEach(
      ($listener) => ($listener.innerHTML = String(payload))
    );
  }
}

async function loadSamples(audioContext: AudioContext) {
  applicationState.instruments.kick = await loadSample(audioContext, kick);
  applicationState.instruments.snare = await loadSample(audioContext, snare);
}
