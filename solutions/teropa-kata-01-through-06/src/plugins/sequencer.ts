import Nexus from "nexusui";
import * as Tone from "tone";
import { produce } from "immer";

import { Plugin } from "../../../utils/types";
import { createWindow } from "../../../utils/window";

const root = Tone.Frequency("C4").toMidi();
const scaleIntervals = [2, 2, 1, 2, 2, 2, 1];
const scale = scaleIntervals.reduce(
  (acc, cur) => {
    const last = acc[acc.length - 1];
    return [...acc, (last + cur) as Tone.Unit.MidiNote];
  },
  [root]
);

type SequencerStep = {
  pitch: number;
  step: number;
};
type PluginState = {
  sequence: SequencerStep[];
};
const plugin: Plugin = {
  init({ $parent, send, audioContext }) {
    let pluginState: PluginState = {
      sequence: [],
    };

    createWindow({
      $parent,
      klass: "left-2/3 top-1/2",
      title: "Sequencer",
      body: [
        {
          type: "div",
          attributes: {
            id: "sequencer",
          },
        },
      ],
    });

    const sequencer = new Nexus.Sequencer("#sequencer", {
      columns: 16,
      rows: 8,
    });
    sequencer.on("change", (evt) => {
      send("toggle", "sequence", evt);
    });

    let synth = new Tone.Synth().connect(audioContext.destination);

    let step = 0;
    Tone.getTransport().scheduleRepeat((time) => {
      let stepWrapped = step % 16;
      let note = pluginState.sequence.find((o) => o.step === stepWrapped);
      if (note) {
        // send("set", "frequency", Tone.mtof(note.pitch as Tone.Unit.MidiNote));
        synth.triggerAttackRelease(
          Tone.Frequency(note.pitch, "midi").toNote(),
          "16n",
          time
        );
      }
      step++;
    }, "16n");
    Tone.getTransport().start();

    return {
      onMessage(type, prop, payload) {
        switch (type) {
          case "toggle":
            switch (prop) {
              case "sequence":
                pluginState = produce(pluginState, (draft) => {
                  const { row, column, state } = payload;
                  const step = column;
                  const pitch = scale[scale.length - row - 1];
                  if (state) {
                    draft.sequence.push({ pitch, step });
                  } else {
                    draft.sequence = draft.sequence.filter(
                      (o) => o.pitch !== pitch || o.step !== step
                    );
                  }
                });
                console.log(pluginState.sequence);
            }
        }
      },
    };
  },
};

export { plugin };
