import { produce } from "immer";
import { Plugin } from "../../../utils/types";
import { createWindow } from "../../../utils/window";
import { CustomOscillatorNode } from "../worklets/CustomOscillatorNode";

type PluginState = {
  contextState: "suspended" | "running";
  volume: number;
  frequency: number;
};
const plugin: Plugin = {
  init({ $parent, send, audioContext }) {
    audioContext.suspend();

    let pluginState: PluginState = {
      contextState: "suspended",
      volume: 0,
      frequency: 220,
    };

    // const oscillator = audioContext.createOscillator();
    // oscillator.type = "sine";
    // oscillator.frequency.value = pluginState.frequency;
    // oscillator.start();

    let oscillator: CustomOscillatorNode | null = null;
    CustomOscillatorNode.register(audioContext).then(() => {
      oscillator = new CustomOscillatorNode(audioContext);
      oscillator.connect(gain);
    });

    const gain = audioContext.createGain();
    gain.gain.value = dbToA(pluginState.volume);

    gain.connect(audioContext.destination);

    createWindow({
      $parent,
      klass: "left-1/2",
      title: "Oscillator",
      body: [
        {
          type: "div",
          class: "flex flex-col",
          children: [
            {
              type: "button",
              children: "Start",
              attributes: {
                onclick() {
                  send("set", "contextState", "running");
                },
              },
            },
            {
              type: "button",
              children: "Stop",
              attributes: {
                onclick() {
                  send("set", "contextState", "suspended");
                },
              },
            },
            {
              type: "label",
              class: "flex flex-row",
              children: [
                {
                  type: "span",
                  children: "Volume",
                },
                {
                  type: "input",
                  attributes: {
                    type: "range",
                    min: "-50",
                    max: "0",
                    step: "0.01",
                    value: "" + pluginState.volume,
                    oninput() {
                      send("set", "volume", this.valueAsNumber);
                    },
                  },
                },
              ],
            },
            {
              type: "label",
              class: "flex flex-row",
              children: [
                {
                  type: "span",
                  children: "Frequency",
                },
                {
                  type: "input",
                  attributes: {
                    type: "range",
                    min: "100",
                    max: "1000",
                    step: "0.01",
                    value: "" + pluginState.frequency,
                    oninput() {
                      send("set", "frequency", this.valueAsNumber);
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
    });

    return {
      onMessage(type, prop, payload) {
        switch (type) {
          case "set":
            switch (prop) {
              case "contextState":
                pluginState = produce(pluginState, (draft) => {
                  draft.contextState = payload;
                });
                switch (pluginState.contextState) {
                  case "running":
                    audioContext.resume();
                    break;
                  case "suspended":
                    audioContext.suspend();
                    break;
                }
                break;
              case "volume":
                pluginState = produce(pluginState, (draft) => {
                  draft.volume = payload;
                });
                gain.gain.value = dbToA(pluginState.volume);
                break;
              case "frequency":
                pluginState = produce(pluginState, (draft) => {
                  draft.frequency = payload;
                });
                if (oscillator)
                  oscillator.frequency.value = pluginState.frequency;
                break;
            }
        }
      },
    };
  },
};

function dbToA(db: number) {
  return Math.pow(10, db / 20);
}

export { plugin };
