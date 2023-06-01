import { draggable } from "dragjs";

console.log("hello daw");

type Element = {
  type: string;
  class?: string;
  children: string | Element[];
};

const $body = document.body;

createWindow({
  $parent: $body,
  title: "Playback",
  // https://en.wikipedia.org/wiki/Media_control_symbols
  body: [
    {
      type: "div",
      class: "flex flex-row gap-2",
      children: [
        {
          type: "button",
          children: "⏵",
          // TODO: handler
        },
        {
          type: "button",
          children: "⏸",
          // TODO: handler
        },
      ],
    },
  ],
});

function createWindow({
  $parent,
  title,
  body,
}: {
  $parent: HTMLElement;
  title: string;
  body: Element[];
}) {
  const $window = document.createElement("div");
  $window.classList.add("absolute", "border", "rounded-lg");

  const $title = document.createElement("div");
  $title.classList.add(
    "bg-slate-800",
    "text-slate-200",
    "rounded-t-lg",
    "p-2",
    "hover:cursor-pointer"
  );
  $title.innerHTML = title;
  $window.appendChild($title);

  const $body = document.createElement("div");
  $body.classList.add("p-2");
  $body.append(...elementsToDOM(body));
  $window.appendChild($body);

  $parent.appendChild($window);

  makeDraggable($window);
}

function elementsToDOM(elements: Element[]) {
  return elements.map(elementToDOM);
}

function elementToDOM(element: Element) {
  const $element = document.createElement(element.type);

  if (element.class) {
    $element.classList.add(...element.class.split(" "));
  }

  if (typeof element.children === "string") {
    $element.innerHTML = element.children;
  } else {
    $element.append(...elementsToDOM(element.children));
  }

  return $element;
}

function makeDraggable($draggable: HTMLElement | null) {
  if ($draggable) {
    const $handle = $draggable.children[0] as HTMLElement;

    draggable({ element: $draggable, handle: $handle });
  }
}
