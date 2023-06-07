import Nexus from "nexusui";
import * as Tone from "tone";
// import { WebMidi } from "webmidi";

import { Plugin } from "../../../utils/types";
import { createWindow } from "../../../utils/window";

const plugin: Plugin = {
  init({ $parent, send }) {
    createWindow({
      $parent,
      klass: "left-2/3",
      title: "Keyboard",
      body: [
        {
          type: "div",
          attributes: { id: "keyboard" },
        },
      ],
    });

    const piano = new Nexus.Piano("#keyboard", {
      lowNote: 48,
      highNote: 84,
    });
    piano.on("change", (evt) => {
      console.log(evt);
      if (evt.state) {
        send("set", "frequency", Tone.mtof(evt.note));
      }
    });

    // WebMidi.enable().then(() => {
    //   const input = WebMidi.inputs.find(
    //     (o) => o.name === "nanoKEY Studio KEYBOARD/CTRL"
    //   );
    //   input?.addListener("noteon", (evt) => {
    //     const note = evt.note.number;
    //     send("set", "frequency", Tone.mtof(note as Tone.Unit.MidiNote));
    //   });
    // });
  },
};

export { plugin };
