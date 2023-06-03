type Plugin = {
  init(args: PluginParameters): PluginApi | void;
};

// TODO: This should be an union of possible combinations ideally
type Send = (type: string, prop: string, payload?: any) => void;

type PluginParameters = {
  audioContext: AudioContext;
  $parent: HTMLElement;
  send: Send;
};

type PluginApi = {
  onMessage: Send;
};

export type { Plugin };
