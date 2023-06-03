import { Scale } from "tonal";
import { createWindow } from "../../../utils/window";

function init($parent, send) {
  createWindow({
    $parent,
    klass: "top-1/2 left-1/2",
    title: "Sequencer",
    body: [
      {
        type: "ul",
        class: "flex flex-row gap-2",
        children: Array.from(new Array(10), (_, i) => i).map((x) => ({
          type: "li",
          children: [
            {
              type: "ul",
              class: "flex flex-col gap-2",
              children: Scale.get("C major").notes.map((key, y) => ({
                type: "li",
                children: [
                  {
                    type: "button",
                    class:
                      "bg-slate-200 w-6 h-6 data-[value=true]:bg-slate-400",
                    children: key,
                    attributes: {
                      "data-key": "sequence",
                      "data-value": String(send("get", "sequence")[x][y]),
                      "data-x": String(x),
                      "data-y": String(y),
                      onclick() {
                        send("set", "sequence", {
                          x,
                          y,
                          value: !send("get", "sequence")[x][y],
                        });
                      },
                    },
                  },
                ],
              })),
            },
          ],
        })),
      },
    ],
  });
}

export { init };
