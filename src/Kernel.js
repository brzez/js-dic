// @flow
import type {ServiceDefinition} from "./types/ServiceDefinition";
import Container from "./Container";
import DependencyInjector from "./DependencyInjector";
import type {ReadyCallback} from "./types/ReadyCallback";

export default class Kernel {
  services: ServiceDefinition[];
  readyCallbacks: ReadyCallback[] = [];

  constructor (services: ServiceDefinition[], applyInternals: boolean = true) {
    this.services = services;

    if (applyInternals) {
      this.applyInternals()
    }
  }

  applyInternals () {
    this.services.push({
      name: '$ready',
      factory: () => {
        return (callback: ReadyCallback) => {
          this.readyCallbacks.push(callback);
        }
      }
    })
  }

  async boot (): Promise<Container> {
    const di = new DependencyInjector(this.services);
    const repository = await di.boot();

    const container = new Container(repository);

    this.readyCallbacks.forEach(callback => callback(container));

    return container;
  }
}
