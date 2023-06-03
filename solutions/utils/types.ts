type Plugin = {
  init(args: PluginParameters): PluginApi | void;
};

type PluginParameters = {
  $parent: HTMLElement;
  // TODO: This should be an union of possible combinations ideally
  send: (type: string, prop: string, payload?: unknown) => number;
};

type PluginApi = {
  onMessage?({ message }: { message: string }): void;
};

export type { Plugin };
