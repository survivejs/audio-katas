import { createWindow } from "../../../utils/window";
import type { Plugin } from "../../../utils/types";

const plugin: Plugin = {
  init({ $parent }) {
    createWindow({
      $parent,
      klass: "left-1/2",
      title: "Debug",
      body: [
        {
          type: "div",
          children: "",
          attributes: { "data-key": "playbackState" },
        },
        { type: "div", children: "", attributes: { "data-key": "volume" } },
        { type: "div", children: "", attributes: { "data-key": "frequency" } },
      ],
    });
  },
};

export { plugin };
