// This is a small abstraction over a real DOM element to make
// it easier to construct DOM trees.
type DOMElement = {
  type: string;
  class?: string;
  children?: string | DOMElement[];
  attributes?: Record<string, (() => void) | string>;
};

function elementsToDOM(elements: DOMElement[]) {
  return elements.map(elementToDOM);
}

function elementToDOM(element: DOMElement) {
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

export { type DOMElement, elementsToDOM, elementToDOM };
