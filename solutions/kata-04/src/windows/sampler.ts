import { createWindow } from "../../../utils/window";

function init($parent, applicationState, audioContext: AudioContext) {
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
                    playSample(audioContext, applicationState.instruments.kick);
                  },
                },
              },
              {
                type: "button",
                children: "snare",
                attributes: {
                  onclick() {
                    playSample(
                      audioContext,
                      applicationState.instruments.snare
                    );
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

function playSample(audioContext: AudioContext, sample: AudioBuffer) {
  const source = audioContext.createBufferSource();
  source.buffer = sample;
  source.connect(audioContext.destination);
  source.start();
}

export { init };
