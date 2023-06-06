// https://stackoverflow.com/a/57992178/228885
class Oscillator extends AudioWorkletProcessor {
  prevFreq = 440;
  d = 0;
  static get parameterDescriptors() {
    return [
      {
        name: "frequency",
        defaultValue: 440,
        minValue: 0,
        maxValue: 0.5 * sampleRate,
        automationRate: "a-rate",
      },
    ];
  }
  process(inputs, outputs, parameters) {
    const output = outputs[0];
    const freqs = parameters.frequency;
    output.forEach((channel) => {
      for (let i = 0; i < channel.length; i++) {
        const freq = freqs.length > 1 ? freqs[i] : freqs[0];
        const globTime = currentTime + i / sampleRate;
        this.d += globTime * (this.prevFreq - freq);
        this.prevFreq = freq;
        const time = globTime * freq + this.d;
        const vibrato = 0; // Math.sin(globTime * 2 * Math.PI * 7) * 2
        channel[i] = Math.sin(2 * Math.PI * time + vibrato);
      }
    });
    return true;
  }
}

registerProcessor("oscillator", Oscillator);
