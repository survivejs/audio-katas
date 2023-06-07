import * as Tone from "tone";
import { kick, hatClosed } from "@teropa/drumkit";
import { Plugin } from "../../../utils/types";
import { createWindow } from "../../../utils/window";

console.log(kick);

const plugin: Plugin = {
  init({ $parent, send, audioContext }) {
    Tone.setContext(audioContext);

    // const kickP = loadSample(kick, audioContext);
    // const hatP = loadSample(hatClosed, audioContext);

    const players = new Tone.Players({
      kick,
      hatClosed,
    });
    players.connect(audioContext.destination);

    createWindow({
      $parent,
      klass: "left-1/2 top-1/3",
      title: "Sampler",
      body: [
        {
          type: "div",
          class: "flex flex-col",
          children: [
            {
              type: "button",
              children: "Kick",
              attributes: {
                onclick() {
                  players.player("kick").start();
                },
              },
            },
            {
              type: "button",
              children: "Hat",
              attributes: {
                onclick() {
                  players.player("hatClosed").start();
                },
              },
            },
          ],
        },
      ],
    });
  },
};

function loadSample(url: string, audioContext: AudioContext) {
  return fetch(url)
    .then((response) => response.arrayBuffer())
    .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer));
}

async function playSample(
  sample: Promise<AudioBuffer>,
  audioContext: AudioContext
) {
  const buffer = await sample;
  const source = audioContext.createBufferSource();
  source.buffer = buffer;
  source.connect(audioContext.destination);
  source.start();
}

export { plugin };
