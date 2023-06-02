import { Scale } from "tonal";
import { createWindow } from "../../../utils/window";

function init($parent, applicationState) {
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
                    class: "bg-slate-200 w-6 h-6",
                    children: key,
                    attributes: {
                      onclick() {
                        // TODO
                        //applicationState.sequence[x][y] =
                        //  !applicationState.sequence[x][y];
                        /*applicationState.sequence[x] =
                          applicationState.sequence[x]
                            .slice(0, y)
                            .concat(!applicationState.sequence[x][y])
                            .concat(applicationState.sequence[x].slice(y));
*/

                        console.log("clicked", x, y);
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
