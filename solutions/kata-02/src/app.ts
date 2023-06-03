import { plugin as debugPlugin } from "./plugins/debug";
import { plugin as oscillatorPlugin } from "./plugins/oscillator";
import { initializePlugins } from "../../utils/plugin";

console.log("hello daw");

initializePlugins(
  [debugPlugin, oscillatorPlugin],
  new AudioContext(),
  document.body
);
