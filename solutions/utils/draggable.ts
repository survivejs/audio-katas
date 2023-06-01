/// <reference lib="dom" />
// This is a version of https://github.com/bebraw/dragjs to make it
// easier to handle tasks like dragging elements or developing custom
// range components.
//
// copied here so it is convenient to modify as you see fit.
// The most relevant changes should be merged back to the utility.

type Callback = ({
  x,
  y,
  cursor,
  elem,
  pointer,
}: {
  x: number;
  y: number;
  cursor: Coordinate;
  elem: HTMLElement;
  e: MouseEvent | TouchEvent;
  pointer?: HTMLElement;
}) => boolean | void;
type Callbacks = {
  begin?: Callback;
  change?: Callback;
  end?: Callback;
};
type Position = "left" | "right";

function draggable(
  {
    element,
    handle,
    xPosition,
  }: {
    element: HTMLElement;
    handle?: HTMLElement;
    xPosition?: Position;
  },
  cbs?: Callbacks
) {
  if (!element) {
    console.warn("drag is missing elem!");
    return;
  }

  dragTemplate(
    element,
    "touchstart",
    "touchmove",
    "touchend",
    cbs,
    handle,
    xPosition
  );
  dragTemplate(
    element,
    "mousedown",
    "mousemove",
    "mouseup",
    cbs,
    handle,
    xPosition
  );
}

function xyslider(o: { parent: HTMLElement; class: string; cbs: Callbacks }) {
  const twod = div(o["class"] || "", o.parent);
  const pointer = div("pointer", twod);

  div("shape shape1", pointer);
  div("shape shape2", pointer);
  div("bg bg1", twod);
  div("bg bg2", twod);

  draggable({ element: twod }, attachPointer(o.cbs, pointer));

  return {
    background: twod,
    pointer: pointer,
  };
}

function slider(o: { parent: HTMLElement; class: string; cbs: Callbacks }) {
  const oned = div(o["class"], o.parent);
  const pointer = div("pointer", oned);

  div("shape", pointer);
  div("bg", oned);

  draggable({ element: oned }, attachPointer(o.cbs, pointer));

  return {
    background: oned,
    pointer: pointer,
  };
}

function attachPointer(cbs: Callbacks, pointer: HTMLElement): Callbacks {
  const ret: Record<string, Callback> = {};

  Object.entries(cbs).forEach(([name, callback]) => {
    ret[name] = (p) => {
      callback({ ...p, pointer });
    };
  });

  return ret as Callbacks;
}

// move to elemutils lib?
function div(klass: string, p: HTMLElement) {
  return e("div", klass, p);
}

function e(type: string, klass: string, p: HTMLElement) {
  const elem = document.createElement(type);

  if (klass) {
    elem.className = klass;
  }
  p.appendChild(elem);

  return elem;
}

function dragTemplate(
  elem: HTMLElement,
  down: string,
  move: string,
  up: string,
  cbs?: Callbacks,
  handle?: HTMLElement,
  xPosition?: Position
) {
  cbs = getCbs(cbs, xPosition);

  const beginCb = cbs.begin;
  const changeCb = cbs.change;
  const endCb = cbs.end;

  on(handle || elem, down, (e) => {
    // @ts-ignore Figure out how to type this
    const moveHandler = (e: Event) => callCb(changeCb, elem, e);

    function upHandler() {
      off(document, move, moveHandler);
      off(document, up, upHandler);

      // @ts-ignore Figure out how to type this
      callCb(endCb, elem, e);
    }

    on(document, move, moveHandler);
    on(document, up, upHandler);

    // @ts-ignore Figure out how to type this
    callCb(beginCb, elem, e);
  });
}

// https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection
function on(
  elem: HTMLElement | Document,
  evt: string,
  handler: (e: Event) => void
) {
  // Test via a getter in the options object to see if the passive property is accessed
  let supportsPassive = false;
  try {
    const opts = Object.defineProperty({}, "passive", {
      get: function () {
        supportsPassive = true;

        return undefined;
      },
    });

    // @ts-ignore Deno doesn't know this
    // deno-shim-ignore
    globalThis.addEventListener("testPassive", null, opts);

    // @ts-ignore Deno doesn't know this
    // deno-shim-ignore
    globalThis.removeEventListener("testPassive", null, opts);
  } catch (err) {
    console.error(err);
  }

  elem.addEventListener(
    evt,
    handler,
    supportsPassive ? { passive: false } : false
  );
}

function off(
  elem: HTMLElement | Document,
  evt: string,
  handler: (event: Event) => void
) {
  elem.removeEventListener(evt, handler, false);
}

type Coordinate = { x: number; y: number };

function getCbs(cbs?: Callbacks, xPosition: Position = "left"): Callbacks {
  let initialOffset: Coordinate;
  let initialPos: Coordinate;

  const defaultCbs: Callbacks = {
    begin: (c) => {
      const bodyWidth = document.body.clientWidth;

      initialOffset = {
        x:
          xPosition === "left"
            ? c.elem.offsetLeft
            : bodyWidth - c.elem.offsetLeft - c.elem.clientWidth,
        y: c.elem.offsetTop,
      };
      initialPos =
        xPosition === "left"
          ? c.cursor
          : { x: bodyWidth - c.cursor.x, y: c.cursor.y };
    },
    change: (c) => {
      if (
        typeof initialOffset.x !== "number" ||
        typeof c.cursor.x !== "number" ||
        typeof initialPos.x !== "number"
      ) {
        return;
      }

      const bodyWidth = document.body.clientWidth;

      style(
        c.elem,
        xPosition,
        xPosition === "left"
          ? initialOffset.x + c.cursor.x - initialPos.x + "px"
          : initialOffset.x + (bodyWidth - c.cursor.x) - initialPos.x + "px"
      );

      if (
        typeof initialOffset.y !== "number" ||
        typeof c.cursor.y !== "number" ||
        typeof initialPos.y !== "number"
      ) {
        return;
      }

      style(c.elem, "top", initialOffset.y + c.cursor.y - initialPos.y + "px");
    },
    end: noop,
  };

  if (cbs) {
    return {
      begin: cbs.begin
        ? (args) => {
            const ret = cbs.begin && cbs.begin(args);

            if (ret) {
              // @ts-ignore This is fine
              return defaultCbs.begin(args);
            }
          }
        : defaultCbs.begin,
      change: cbs.change
        ? (args) => {
            const ret = cbs.change && cbs.change(args);

            console.log("at change", ret);

            if (ret) {
              // @ts-ignore This is fine
              return defaultCbs.change(args);
            }
          }
        : defaultCbs.change,
      end: cbs.end || defaultCbs.end,
    };
  }

  return defaultCbs;
}

function style(e: HTMLElement, prop: string, value: string) {
  // @ts-ignore https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style#setting_styles
  e.style[prop] = value;
}

function noop() {}

function callCb(
  cb: ({
    x,
    y,
    cursor,
    elem,
    e,
  }: {
    x: number;
    y: number;
    cursor: Coordinate;
    elem: HTMLElement;
    e: Event;
  }) => void,
  elem: HTMLElement,
  e: MouseEvent | TouchEvent
) {
  e.preventDefault();

  const offset = findPos(elem);
  const width = elem.clientWidth;
  const height = elem.clientHeight;
  const cursor = {
    x: cursorX(elem, e),
    y: cursorY(elem, e),
  };

  if (typeof cursor.x !== "number" || typeof cursor.y !== "number") {
    return;
  }

  const x = (cursor.x - offset.x) / width;
  const y = (cursor.y - offset.y) / height;

  cb({
    x: isNaN(x) ? 0 : x,
    y: isNaN(y) ? 0 : y,
    cursor: cursor as Coordinate,
    elem,
    e,
  });
}

// http://www.quirksmode.org/js/findpos.html
function findPos(e: HTMLElement) {
  const r = e.getBoundingClientRect();

  return {
    x: r.left,
    y: r.top,
  };
}

// http://javascript.about.com/library/blmousepos.htm
function cursorX(_elem: HTMLElement, evt: MouseEvent | TouchEvent) {
  if (evt instanceof TouchEvent) {
    return evt.touches.item(0)?.clientX;
  }

  return evt.clientX;
}
function cursorY(_elem: HTMLElement, evt: MouseEvent | TouchEvent) {
  if (evt instanceof TouchEvent) {
    return evt.touches.item(0)?.clientY;
  }

  return evt.clientY;
}

function makeDraggable($draggable: HTMLElement | null) {
  if ($draggable) {
    const $handle = $draggable.children[0] as HTMLElement;

    draggable({ element: $draggable, handle: $handle });
  }
}

export { makeDraggable, draggable, slider, xyslider };
