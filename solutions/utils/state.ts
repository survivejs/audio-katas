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

  if (Array.isArray(payload)) {
    // no-op: Ignore for now (sequencer init case), this needs some generic solution
    // based on a type check.
  }
  // @ts-expect-error This is fine, maybe check object in a better way, though
  else if (payload.hasOwnProperty("x") && payload.hasOwnProperty("y")) {
    const $xyMatch = $propMatches.filter(
      (e) =>
        // @ts-expect-error This is fine (wrong type after filtering)
        e.dataset.x === String(payload.x) && e.dataset.y === String(payload.y)
    );

    // The assumption is that there is only one match
    if ($xyMatch.length) {
      // @ts-expect-error This is fine as the type is wrong
      $xyMatch[0].dataset.value = payload.value.toString();
    }
  } else {
    $propMatches.forEach(
      ($listener) => ($listener.innerHTML = String(payload))
    );
  }
}

export { updateStateListeners };
