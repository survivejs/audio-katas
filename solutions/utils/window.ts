import { elementToDOM, type DOMElement } from "./element";
import { makeDraggable } from "./draggable";

function createWindow({
  $parent,
  title,
  body,
  // reserved word in JS
  klass,
}: {
  $parent: HTMLElement;
  title: string;
  body: DOMElement[];
  klass?: string;
}) {
  const $window = document.createElement("div");
  $window.classList.add("absolute", "border", "rounded-lg");

  if (klass) {
    $window.classList.add(...klass.split(" "));
  }

  const $title = elementToDOM({
    type: "div",
    class: "bg-slate-800 text-slate-200 rounded-t-lg p-2 hover:cursor-pointer",
    children: title,
  });
  $window.appendChild($title);

  const $body = elementToDOM({
    type: "div",
    class: "p-2",
    children: body,
  });
  $window.appendChild($body);

  $parent.appendChild($window);

  makeDraggable($window);

  return $window;
}

export { createWindow };
