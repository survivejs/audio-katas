import { createWindow } from "../../utils/window";

console.log("hello daw");

const $body = document.body;

createWindow({
  $parent: $body,
  klass: "left-1/2",
  title: "Header",
  body: [{ type: "div", children: "Body" }],
});
