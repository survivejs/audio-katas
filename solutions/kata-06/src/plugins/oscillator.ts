import { produce } from "immer";
import { createWindow } from "../../../utils/window";
// import { createOscillator } from "../../../utils/audio";
import { updateStateListeners } from "../../../utils/state";
import type { Plugin } from "../../../utils/types";

type PluginState = {
  playbackState: "paused" | "playing";
  volume: number;
  frequency: number;
};

const plugin: Plugin = {
  init({ $parent, send, audioContext }) {
    let pluginState: PluginState = {
      playbackState: "paused",
      volume: 0, // [0, 100]
      frequency: 440,
    };

    /*
    const { oscillator, gainNode } = createOscillator(
      audioContext,
      pluginState.frequency,
      pluginState.volume
    );
    */

    // TODO: Pass frequency and volume + allow modifying them
    createOscillator(audioContext);

    createWindow({
      $parent,
      klass: "left-5",
      title: "Oscillator",
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
                      send("set", "playbackState", "playing");
                    },
                  },
                },
                {
                  type: "button",
                  children: "⏸",
                  attributes: {
                    onclick() {
                      send("set", "playbackState", "paused");
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
                    value: String(pluginState.volume),
                    oninput() {
                      send("set", "volume", this.value);
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
                    value: String(pluginState.frequency),
                    oninput() {
                      send("set", "frequency", this.value);
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
    Object.entries(pluginState).map(([k, v]) => updateStateListeners(k, v));

    let previousVolume = pluginState.volume / 100;
    return {
      onMessage(type, prop, payload) {
        switch (type) {
          case "set":
            switch (prop) {
              case "playbackState":
                pluginState = produce(pluginState, (draft) => {
                  draft.playbackState = payload;
                });

                if (payload === "paused") {
                  // previousVolume = gainNode.gain.value;
                  // gainNode.gain.value = 0;
                }
                if (payload === "playing") {
                  // audioContext.resume();
                  // gainNode.gain.value = previousVolume;
                }
                break;
              case "volume":
                pluginState = produce(pluginState, (draft) => {
                  draft.volume = payload;
                });

                // gainNode.gain.value = payload / 100;
                break;
              case "frequency":
                pluginState = produce(pluginState, (draft) => {
                  draft.frequency = payload;
                });

                // oscillator.frequency.value = payload;
                break;
              default:
                break;
            }
            break;
          default:
            break;
        }
      },
    };
  },
};

// https://stackoverflow.com/a/57992178/228885
function createOscillator(audioContext: AudioContext) {
  audioContext.audioWorklet.addModule("processor.js").then(() => {
    const osc = new AudioWorkletNode(audioContext, "oscillator");
    osc.connect(audioContext.destination);

    const freq = osc.parameters.get("frequency");
    const time = audioContext.currentTime;

    if (freq) {
      freq.setValueAtTime(440, time + 1);
      freq.linearRampToValueAtTime(660, time + 1.5);
    }

    setTimeout(() => audioContext.close(), 5000);
  });
}

export { plugin };
