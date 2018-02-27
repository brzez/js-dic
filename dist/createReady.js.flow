// @flow
import Kernel from './Kernel'
import type {ReadyCallback} from "./Kernel";

export default function createReady (kernel: Kernel) {
  return () => (callback: ReadyCallback) => {
    kernel.readyListeners.push(callback);
  }
}
