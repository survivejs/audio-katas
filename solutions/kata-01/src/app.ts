import { plugin as debugPlugin } from "./plugins/debug";
import { updateStateListeners } from "../../utils/state";

console.log("hello daw");

const $body = document.body;

const audioContext = new AudioContext();

const onMessageCallbacks = [
  debugPlugin.init({ audioContext, $parent: $body, send: sendMessage }),
]
  .map((o) => o?.onMessage)
  .flatMap((a) => (typeof a !== "undefined" ? a : []));

function sendMessage(type, prop, payload) {
  onMessageCallbacks.forEach((cb) => cb(type, prop, payload));
  updateStateListeners(prop, payload);
}
