import { plugin as debugPlugin } from "./plugins/debug";
import { initializePlugins } from "../../utils/plugin";

console.log("hello daw");

initializePlugins([debugPlugin], new AudioContext(), document.body);
