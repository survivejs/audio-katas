// The idea of this function is to update contents of HTML elements
// that have data-key attribute set to propagate values to the UI.
//
// As a special case, for payload { x, y } data-value is updated.
//
// Most likely the design of this function can still be improved
// and maybe it should be split into two separate ones to address
// the special case better.
function updateStateListeners(prop: string, payload: unknown) {
  const $keyListeners = document.querySelectorAll("[data-key]");
  const $propMatches = Array.from($keyListeners).filter(
    // @ts-expect-error This is fine (wrong type after filtering)
    (e) => e.dataset.key === prop
  );

  $propMatches.forEach(($listener) => ($listener.innerHTML = String(payload)));
}

export { updateStateListeners };
