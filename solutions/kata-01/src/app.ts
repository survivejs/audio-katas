import { produce } from "immer";
import { plugin as debugPlugin } from "./plugins/debug";
import { updateStateListeners } from "../../utils/state";

console.log("hello daw");

type ApplicationState = {
  test: number;
};

const $body = document.body;
let applicationState: ApplicationState = {
  test: 123,
};

const audioContext = new AudioContext();

const onMessageCallbacks = [
  debugPlugin.init({ audioContext, $parent: $body, send: sendMessage }),
]
  .map((o) => o?.onMessage)
  .flatMap((a) => (typeof a !== "undefined" ? a : []));

// Make initial state visible in the UI
Object.entries(applicationState).map(([k, v]) => updateStateListeners(k, v));

function sendMessage(type, prop, payload) {
  console.log("send message", type, prop, payload);

  switch (type) {
    case "get":
      return applicationState[prop];
    case "set":
      switch (prop) {
        case "test":
          applicationState = produce(applicationState, (draft) => {
            // Mutate here
            draft.test = payload;
          });
          break;
        default:
          break;
      }

      // Update UI
      updateStateListeners(prop, payload);
      break;
    default:
      break;
  }

  onMessageCallbacks.forEach((cb) => cb(type, prop, payload));
}
