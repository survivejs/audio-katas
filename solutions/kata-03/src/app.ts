import { plugin as debugPlugin } from "./plugins/debug";
import { plugin as keyboardPlugin } from "./plugins/keyboard";
import { plugin as oscillatorPlugin } from "./plugins/oscillator";
import { initializePlugins } from "../../utils/plugin";

console.log("hello daw");

initializePlugins(
  [debugPlugin, keyboardPlugin, oscillatorPlugin],
  new AudioContext(),
  document.body
);
