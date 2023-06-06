import { Note, Scale } from "tonal";
import { createWindow } from "../../../utils/window";
import type { Plugin } from "../../../utils/types";

const plugin: Plugin = {
  init({ $parent, send }) {
    createWindow({
      $parent,
      klass: "left-2/3",
      title: "Keyboard",
      body: [
        {
          type: "ul",
          class: "flex flex-row",
          children: Scale.get("C major").notes.map((key) => ({
            type: "li",
            class:
              "border drop-shadow-md px-4 py-16 hover:cursor-pointer active:bg-slate-50",
            children: key, // "&nbsp;",
            attributes: {
              "data-key": key,
              onclick() {
                const key = this.dataset.key;

                // Pick from the fourth octave
                const frequency = Note.freq(key + 4);

                if (typeof frequency === "number") {
                  send("set", "frequency", frequency);
                }
              },
            },
          })),
        },
      ],
    });
  },
};

export { plugin };
