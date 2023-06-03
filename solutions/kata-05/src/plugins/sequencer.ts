import { produce } from "immer";
import { Note, Scale } from "tonal";
import { createWindow } from "../../../utils/window";
import { createOscillator } from "../../../utils/audio";
import { updateStateListeners } from "../../../utils/state";
import type { Plugin } from "../../../utils/types";

const C_NOTES = Scale.get("C major").notes;
const C_NOTE_FREQUENCIES = C_NOTES.map((note) =>
  // Pick from the fourth octave
  Note.freq(note + 4)
);

type PluginState = {
  sequence: boolean[][];
  volume: number;
};

const plugin: Plugin = {
  init({ $parent, send, audioContext }) {
    let pluginState: PluginState = {
      sequence: Array.from(new Array(10), () =>
        Array.from(new Array(10), () => false)
      ),
      volume: 20, // [0, 100]
    };

    const { oscillator } = createOscillator(
      audioContext,
      440,
      pluginState.volume
    );

    createWindow({
      $parent,
      klass: "top-1/2 left-1/2",
      title: "Sequencer",
      body: [
        {
          type: "ul",
          class: "flex flex-row gap-2",
          children: Array.from(new Array(10), (_, i) => i).map((x) => ({
            type: "li",
            children: [
              {
                type: "ul",
                class: "flex flex-col gap-2",
                children: C_NOTES.map((key, y) => ({
                  type: "li",
                  children: [
                    {
                      type: "button",
                      class:
                        "bg-slate-200 w-6 h-6 data-[value=true]:bg-slate-400",
                      children: key,
                      attributes: {
                        "data-key": "sequence",
                        "data-value": String(pluginState.sequence[x][y]),
                        "data-x": String(x),
                        "data-y": String(y),
                        onclick() {
                          send("set", "sequence", {
                            x,
                            y,
                            value: !pluginState.sequence[x][y],
                          });
                        },
                      },
                    },
                  ],
                })),
              },
            ],
          })),
        },
      ],
    });

    // Make initial state visible in the UI
    Object.entries(pluginState).map(([k, v]) => updateStateListeners(k, v));

    // Set up a scheduler to play our song
    // Adapted from https://sonoport.github.io/web-audio-clock.html
    let note = 0;
    let nextNotetime = audioContext.currentTime;
    function scheduler() {
      while (nextNotetime < audioContext.currentTime + 0.1) {
        const currentNotes =
          pluginState.sequence[note % pluginState.sequence.length];
        const firstNoteIndex = currentNotes.findIndex((a) => a === true);

        // Since we have only one oscillator, play only the first note
        if (firstNoteIndex >= 0) {
          // Map to a note
          const noteFrequency = C_NOTE_FREQUENCIES[firstNoteIndex];

          if (typeof noteFrequency === "number") {
            oscillator.frequency.value = noteFrequency;
          }
        }

        nextNotetime += 0.5;
        note++;
      }

      window.setTimeout(scheduler, 50.0);
    }

    scheduler();

    return {
      onMessage(type, prop, payload) {
        switch (type) {
          case "set":
            switch (prop) {
              case "sequence":
                pluginState = produce(pluginState, (draft) => {
                  draft.sequence[payload.x][payload.y] = payload.value;
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
