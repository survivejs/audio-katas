import { createWindow } from "../../utils/window";

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

createWindow({
  $parent: $body,
  // TODO: Remove right-5 after initial dragging
  // klass: "right-5",
  klass: "left-1/2",
  title: "Debug",
  body: [
    { type: "div", children: "", attributes: { "data-playbackState": "" } },
    { type: "div", children: "", attributes: { "data-volume": "" } },
    { type: "div", children: "", attributes: { "data-frequency": "" } },
  ],
});

createWindow({
  $parent: $body,
  klass: "left-5",
  title: "Playback",
  // https://en.wikipedia.org/wiki/Media_control_symbols
  body: [
    {
      type: "div",
      class: "flex flex-col gap-2",
      children: [
        {
          type: "div",
          class: "flex flex-row gap-2",
          children: [
            {
              type: "button",
              children: "⏵",
              attributes: {
                onclick() {
                  applicationState.playbackState = "playing";
                },
              },
            },
            {
              type: "button",
              children: "⏸",
              attributes: {
                onclick() {
                  applicationState.playbackState = "paused";
                },
              },
            },
          ],
        },
        {
          type: "label",
          class: "flex flex-row gap-2",
          children: [
            {
              type: "span",
              children: "Volume",
            },
            {
              type: "input",
              attributes: {
                type: "range",
                name: "volume",
                min: "0",
                max: "100",
                value: String(applicationState.volume),
                oninput() {
                  applicationState.volume = this.value;
                },
              },
            },
          ],
        },
        {
          type: "label",
          class: "flex flex-row gap-2",
          children: [
            {
              type: "span",
              children: "Frequency",
            },
            {
              type: "input",
              attributes: {
                type: "range",
                name: "volume",
                min: "0",
                max: "3000",
                value: String(applicationState.frequency),
                oninput() {
                  applicationState.frequency = this.value;
                },
              },
            },
          ],
        },
      ],
    },
  ],
});

// Make initial state visible in the UI
Object.entries(initialState).map(([k, v]) => updateListeners(k, v));

function updateListeners(prop: string, value: number | string) {
  const $listeners = document.querySelectorAll(`[data-${String(prop)}]`);

  $listeners.forEach(($listener) => ($listener.innerHTML = String(value)));
}
