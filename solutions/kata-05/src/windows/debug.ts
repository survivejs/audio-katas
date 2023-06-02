import { createWindow } from "../../../utils/window";

function init($parent, applicationState) {
  createWindow({
    $parent,
    klass: "left-1/2",
    title: "Debug",
    body: [
      { type: "div", children: "", attributes: { "data-playbackState": "" } },
      { type: "div", children: "", attributes: { "data-volume": "" } },
      { type: "div", children: "", attributes: { "data-frequency": "" } },
    ],
  });
}

export { init };
