import { createWindow } from "../../../utils/window";

function init($parent, applicationState) {
  createWindow({
    $parent,
    klass: "left-5",
    title: "Playback",
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
                children: "⏵",
                attributes: {
                  onclick() {
                    applicationState.playbackState = "playing";
                  },
                },
              },
              {
                type: "button",
                children: "⏸",
                attributes: {
                  onclick() {
                    applicationState.playbackState = "paused";
                  },
                },
              },
            ],
          },
          {
            type: "label",
            class: "flex flex-row gap-2",
            children: [
              {
                type: "span",
                children: "Volume",
              },
              {
                type: "input",
                attributes: {
                  type: "range",
                  name: "volume",
                  min: "0",
                  max: "100",
                  value: String(applicationState.volume),
                  oninput() {
                    applicationState.volume = this.value;
                  },
                },
              },
            ],
          },
          {
            type: "label",
            class: "flex flex-row gap-2",
            children: [
              {
                type: "span",
                children: "Frequency",
              },
              {
                type: "input",
                attributes: {
                  type: "range",
                  name: "volume",
                  min: "0",
                  max: "3000",
                  value: String(applicationState.frequency),
                  oninput() {
                    applicationState.frequency = this.value;
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
