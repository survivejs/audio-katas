import { draggable } from "dragjs";

console.log("hello daw");

const $body = document.body;

createWindow({ $parent: $body, title: "Playback", body: "body" });

function createWindow({
  $parent,
  title,
  body,
}: {
  $parent: HTMLElement;
  title: string;
  body: string;
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
  $body.innerHTML = body;
  $window.appendChild($body);

  $parent.appendChild($window);

  makeDraggable($window);
}

function makeDraggable($draggable: HTMLElement | null) {
  if ($draggable) {
    const $handle = $draggable.children[0] as HTMLElement;

    draggable({ element: $draggable, handle: $handle });
  }
}
