import { plugin as debugPlugin } from "./plugins/debug";
import { plugin as keyboardPlugin } from "./plugins/keyboard";
import { plugin as oscillatorPlugin } from "./plugins/oscillator";
import { plugin as samplerPlugin } from "./plugins/sampler";
import { initializePlugins } from "../../utils/plugin";

console.log("hello daw");

initializePlugins(
  [debugPlugin, keyboardPlugin, oscillatorPlugin, samplerPlugin],
  new AudioContext(),
  document.body
);
