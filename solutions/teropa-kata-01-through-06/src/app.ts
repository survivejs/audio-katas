import { plugin as oscillatorPlugin } from "./plugins/oscillator";
import { plugin as keyboardPlugin } from "./plugins/keyboard";
import { plugin as samplerPlugin } from "./plugins/sampler";
import { plugin as sequencerPlugin } from "./plugins/sequencer";

import { initializePlugins } from "../../utils/plugin";

console.log("hello daw");

initializePlugins(
  [oscillatorPlugin, keyboardPlugin, samplerPlugin, sequencerPlugin],
  new AudioContext(),
  document.body
);
