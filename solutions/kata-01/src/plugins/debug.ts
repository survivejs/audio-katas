import { produce } from "immer";
import { createWindow } from "../../../utils/window";
import { updateStateListeners } from "../../../utils/state";
import type { Plugin } from "../../../utils/types";

type PluginState = {
  test: number;
};

const plugin: Plugin = {
  init({ $parent, send }) {
    let pluginState: PluginState = {
      test: 123,
    };

    createWindow({
      $parent,
      klass: "left-1/2",
      title: "Debug",
      body: [
        {
          type: "button",
          children: "Add one",
          attributes: {
            onclick() {
              send("set", "test", pluginState.test + 1);
            },
          },
        },
        {
          type: "div",
          children: "",
          attributes: { "data-key": "test" },
        },
      ],
    });

    // Make initial state visible in the UI
    Object.entries(pluginState).map(([k, v]) => updateStateListeners(k, v));

    return {
      onMessage(type, prop, payload) {
        switch (type) {
          case "set":
            switch (prop) {
              case "test":
                pluginState = produce(pluginState, (draft) => {
                  // Mutate here
                  draft.test = payload;
                });
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

export { plugin };
