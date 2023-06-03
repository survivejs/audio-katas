import type { Plugin } from "./types";
import { updateStateListeners } from "./state";

function initializePlugins(
  plugins: Plugin[],
  audioContext: AudioContext,
  $parent: HTMLElement
) {
  const onMessageCallbacks = plugins
    .map((plugin) => plugin.init({ audioContext, $parent, send }))
    .map((o) => o?.onMessage)
    .flatMap((a) => (typeof a !== "undefined" ? a : []));

  function send(type, prop, payload) {
    onMessageCallbacks.forEach((cb) => cb(type, prop, payload));
    updateStateListeners(prop, payload);
  }
}

export { initializePlugins };
