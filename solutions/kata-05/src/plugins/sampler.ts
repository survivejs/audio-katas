import { playSample } from "../../../utils/audio";
import { createWindow } from "../../../utils/window";

function init($parent, send, audioContext: AudioContext) {
  createWindow({
    $parent,
    klass: "left-1/3",
    title: "Sampler",
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
                children: "kick",
                attributes: {
                  onclick() {
                    playSample(audioContext, send("get", "instruments").kick);
                  },
                },
              },
              {
                type: "button",
                children: "snare",
                attributes: {
                  onclick() {
                    playSample(audioContext, send("get", "instruments").snare);
                  },
                },
              },
            ],
          },
        ],
      },
    ],
  });
}

export { init };