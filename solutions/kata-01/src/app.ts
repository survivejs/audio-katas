import { draggable } from "dragjs";

console.log("hello daw");

makeDraggable(document.getElementById("draggable"));

function makeDraggable(draggableElement: HTMLElement | null) {
  if (draggableElement) {
    const handleElement = draggableElement.children[0] as HTMLElement;

    draggable({ element: draggableElement, handle: handleElement });
  }
}
