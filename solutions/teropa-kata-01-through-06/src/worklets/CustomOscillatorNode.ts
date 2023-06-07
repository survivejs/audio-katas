export class CustomOscillatorNode extends AudioWorkletNode {
  static register(audioContext: AudioContext) {
    return audioContext.audioWorklet.addModule(
      new URL("./CustomOscillatorProcessor.js", import.meta.url).href
    );
  }

  constructor(audioContext) {
    super(audioContext, "custom-oscillator-processor");
  }

  get frequency() {
    return this.parameters.get("frequency")!;
  }
}
