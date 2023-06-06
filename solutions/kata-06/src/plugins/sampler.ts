import { kick, snare } from "@teropa/drumkit";
import { createWindow } from "../../../utils/window";
import type { Plugin } from "../../../utils/types";

type PluginState = {
  instruments: {
    // null as in not loaded yet
    kick: AudioBuffer | null;
    snare: AudioBuffer | null;
  };
};

const plugin: Plugin = {
  init({ $parent, audioContext }) {
    let pluginState: PluginState = {
      instruments: {
        kick: null,
        snare: null,
      },
    };

    loadSamples(audioContext);

    createWindow({
      $parent,
      klass: "left-1/3",
      title: "Sampler",
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
                  children: "kick",
                  attributes: {
                    onclick() {
                      if (pluginState.instruments.kick) {
                        playSample(audioContext, pluginState.instruments.kick);
                      }
                    },
                  },
                },
                {
                  type: "button",
                  children: "snare",
                  attributes: {
                    onclick() {
                      if (pluginState.instruments.snare) {
                        playSample(audioContext, pluginState.instruments.snare);
                      }
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
    });

    async function loadSamples(audioContext: AudioContext) {
      pluginState.instruments.kick = await loadSample(audioContext, kick);
      pluginState.instruments.snare = await loadSample(audioContext, snare);
    }
  },
};

async function loadSample(audioContext: AudioContext, instrument: string) {
  return fetch(instrument)
    .then((res) => res.arrayBuffer())
    .then((buf) => audioContext.decodeAudioData(buf));
}

function playSample(audioContext: AudioContext, sample: AudioBuffer) {
  const source = audioContext.createBufferSource();
  source.buffer = sample;
  source.connect(audioContext.destination);
  source.start();
}

export { plugin };
