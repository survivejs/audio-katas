import { createWindow } from "../../../utils/window";
import type { Plugin } from "../../../utils/types";

const plugin: Plugin = {
  init({ $parent, send }) {
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
              send("set", "test", send("get", "test") + 1);
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
  },
};

export { plugin };
