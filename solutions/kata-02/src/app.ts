import { draggable } from "dragjs";

console.log("hello daw");

type Element = {
  type: string;
  class?: string;
  children: string | Element[];
  attributes?: Record<string, () => void>;
};

const $body = document.body;
const initialState: { playbackState: "paused" | "playing" } = {
  playbackState: "paused",
};
const applicationState = new Proxy(initialState, {
  set(obj, prop, value) {
    // TODO: Update listeners now
    console.log(obj, prop, value);

    return Reflect.set(obj, prop, value);
  },
});

createWindow({
  $parent: $body,
  // TODO: Remove right-5 after initial dragging
  // klass: "right-5",
  klass: "left-1/2",
  title: "Debug",
  body: [{ type: "div", children: "test" }],
});

createWindow({
  $parent: $body,
  klass: "left-5",
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
          attributes: {
            onclick: () => (applicationState.playbackState = "playing"),
          },
        },
        {
          type: "button",
          children: "⏸",
          attributes: {
            onclick: () => (applicationState.playbackState = "playing"),
          },
        },
      ],
    },
  ],
});

function createWindow({
  $parent,
  title,
  body,
  // reserved word in JS
  klass,
}: {
  $parent: HTMLElement;
  title: string;
  body: Element[];
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
}

function elementsToDOM(elements: Element[]) {
  return elements.map(elementToDOM);
}

function elementToDOM(element: Element) {
  const $element = document.createElement(element.type);

  if (element.class) {
    $element.classList.add(...element.class.split(" "));
  }

  if (element.attributes) {
    Object.entries(element.attributes).map(([k, v]) => {
      $element[k] = v;
    });
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
