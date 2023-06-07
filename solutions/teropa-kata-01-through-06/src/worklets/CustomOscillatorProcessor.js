class CustomOscillatorProcessor extends AudioWorkletProcessor {
  static get parameterDescriptors() {
    return [
      {
        name: "frequency",
        defaultValue: 440,
        minValue: 20,
        maxValue: 22000,
      },
    ];
  }

  phase = 0;

  process(inputs, outputs, parameters) {
    for (let s = 0; s < 128; s++) {
      const freqParam = parameters.frequency;
      const instFreq = freqParam.length === 1 ? freqParam[0] : freqParam[s];
      const phaseIncrement = instFreq / sampleRate;

      const sample = Math.sin(2 * Math.PI * this.phase);
      for (const output of outputs) {
        for (const channel of output) {
          channel[s] = sample;
        }
      }
      this.phase += phaseIncrement;
      this.phase %= 1;
    }
    return true;
  }
}

registerProcessor("custom-oscillator-processor", CustomOscillatorProcessor);
