import { draggable } from "dragjs";

console.log("hello daw");

type Element = {
  type: string;
  class?: string;
  children?: string | Element[];
  attributes?: Record<string, (() => void) | string>;
};

const $body = document.body;
const initialState: {
  playbackState: "paused" | "playing";
  volume: number;
  frequency: number;
} = {
  playbackState: "paused",
  volume: 50, // [0, 100]
  frequency: 440,
};
const applicationState = new Proxy(initialState, {
  set(obj, prop, value) {
    updateListeners(String(prop), value);

    if (prop === "playbackState") {
      if (value === "paused") {
        audioContext.suspend();
      }
      if (value === "playing") {
        audioContext.resume();
      }
    }
    if (prop === "volume") {
      gainNode.gain.value = value / 100;
    }

    return Reflect.set(obj, prop, value);
  },
});

// Create audio graph
const audioContext = new AudioContext();

const oscillator = audioContext.createOscillator();
oscillator.type = "sine";
oscillator.frequency.value = applicationState.frequency;

// Volume
const gainNode = audioContext.createGain();
gainNode.gain.value = applicationState.volume / 100;

oscillator.connect(gainNode);
gainNode.connect(audioContext.destination);

// This can be run only once!
oscillator.start();

// Don't play anything initially. Maybe there is a better spot for this
audioContext.suspend();

createWindow({
  $parent: $body,
  // TODO: Remove right-5 after initial dragging
  // klass: "right-5",
  klass: "left-1/2",
  title: "Debug",
  body: [
    { type: "div", children: "", attributes: { "data-playbackState": "" } },
  ],
});

createWindow({
  $parent: $body,
  klass: "left-5",
  title: "Playback",
  // https://en.wikipedia.org/wiki/Media_control_symbols
  body: [
    {
      type: "div",
      class: "flex flex-col gap-2",
      children: [
        {
          type: "div",
          class: "flex flex-row gap-2",
          children: [
            {
              type: "button",
              children: "⏵",
              attributes: {
                onclick() {
                  applicationState.playbackState = "playing";
                },
              },
            },
            {
              type: "button",
              children: "⏸",
              attributes: {
                onclick() {
                  applicationState.playbackState = "paused";
                },
              },
            },
          ],
        },
        {
          type: "label",
          children: [
            {
              type: "span",
              children: "Volume",
            },
            {
              type: "input",
              attributes: {
                type: "range",
                name: "volume",
                min: "0",
                max: "100",
                oninput() {
                  applicationState.volume = this.value;
                },
              },
            },
          ],
        },
      ],
    },
  ],
});

// Make initial state visible in the UI
Object.entries(initialState).map(([k, v]) => updateListeners(k, v));

function updateListeners(prop: string, value: number | string) {
  const $listeners = document.querySelectorAll(`[data-${String(prop)}]`);

  $listeners.forEach(($listener) => ($listener.innerHTML = String(value)));
}

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
      if (k.startsWith("on")) {
        $element[k] = v;
      } else {
        // Trust that it's a string now since handlers are treated separately
        $element.setAttribute(k, v as string);
      }
    });
  }

  if (typeof element.children === "string") {
    $element.innerHTML = element.children;
  } else if (element.children) {
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
