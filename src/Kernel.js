// @flow
import type {ServiceDefinition} from "./types/ServiceDefinition";
import Container from "./Container";
import DependencyInjector from "./DependencyInjector";

export default class Kernel {
  services: ServiceDefinition[];

  constructor (services: ServiceDefinition[]) {
    this.services = services;
  }

  async boot (): Promise<Container> {
    const di = new DependencyInjector(this.services);
    const repository = await di.boot();

    return new Container(repository);
  }
}
