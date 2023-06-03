async function loadSample(audioContext: AudioContext, instrument: string) {
  return fetch(instrument)
    .then((res) => res.arrayBuffer())
    .then((buf) => audioContext.decodeAudioData(buf));
}

function playSample(audioContext: AudioContext, sample: AudioBuffer) {
  const source = audioContext.createBufferSource();
  source.buffer = sample;
  source.connect(audioContext.destination);
  source.start();
}

export { loadSample, playSample };
