// @flow
import type {ServiceDefinition} from "./types/ServiceDefinition";
import Container from "./Container";
import resolveBootOrder from "./resolveBootOrder";
import mapServices from "./mapServices";
import {ServiceRepository} from "./ServiceRepository";

class DependencyInjector {
  repository: ServiceRepository;
  bootOrder: ServiceDefinition[];

  constructor(services: ServiceDefinition[]) {
    this.bootOrder = resolveBootOrder(services);
    this.repository = mapServices(services);
  }

  async boot () {
    for (const definition of this.bootOrder) {
      const dependencies = definition.dependencies || [];
      const resolved = dependencies.map(dep => this.repository.resolveDependency(dep).value);
      definition.value = await definition.factory.apply(definition.factory, resolved);
    }
  }
}

export default class Kernel {
  services: ServiceDefinition[];

  constructor (services: ServiceDefinition[]) {
    this.services = services;
  }

  async boot (): Promise<Container> {
    const di = new DependencyInjector(this.services);
    await di.boot();

    return new Container()
  }
}
