import { plugin as debugPlugin } from "./plugins/debug";
import { plugin as keyboardPlugin } from "./plugins/keyboard";
import { plugin as oscillatorPlugin } from "./plugins/oscillator";
import { plugin as samplerPlugin } from "./plugins/sampler";
import { plugin as sequencerPlugin } from "./plugins/sequencer";
import { updateStateListeners } from "../../utils/state";

console.log("hello daw");

const $body = document.body;
const audioContext = new AudioContext();

const onMessageCallbacks = [
  debugPlugin.init({ audioContext, $parent: $body, send: sendMessage }),
  keyboardPlugin.init({ audioContext, $parent: $body, send: sendMessage }),
  oscillatorPlugin.init({ audioContext, $parent: $body, send: sendMessage }),
  samplerPlugin.init({ audioContext, $parent: $body, send: sendMessage }),
  sequencerPlugin.init({ audioContext, $parent: $body, send: sendMessage }),
]
  .map((o) => o?.onMessage)
  .flatMap((a) => (typeof a !== "undefined" ? a : []));

function sendMessage(type, prop, payload) {
  onMessageCallbacks.forEach((cb) => cb(type, prop, payload));
  updateStateListeners(prop, payload);
}
