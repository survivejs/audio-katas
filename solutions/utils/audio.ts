function createOscillator(
  audioContext: AudioContext,
  frequency: number,
  volume: number // [0, 100]
) {
  const oscillator = audioContext.createOscillator();
  oscillator.type = "sine";
  oscillator.frequency.value = frequency;

  // Volume
  const gainNode = audioContext.createGain();
  gainNode.gain.value = volume / 100;

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.start();

  return { oscillator, gainNode };
}

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

export { createOscillator, loadSample, playSample };
