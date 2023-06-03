import { produce } from "immer";
import { plugin as debugPlugin } from "./windows/debug";
import { updateStateListeners } from "../../utils/state";

console.log("hello daw");

type ApplicationState = {
  test: number;
};

const $body = document.body;
let applicationState: ApplicationState = {
  test: 123,
};

debugPlugin.init({ $parent: $body, send: sendMessage });

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
}
