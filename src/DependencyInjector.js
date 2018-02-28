import {ServiceRepository} from "./ServiceRepository";
import type {ServiceDefinition} from "./types/ServiceDefinition";
import resolveBootOrder from "./resolveBootOrder";
import mapServices from "./mapServices";

export default class DependencyInjector {
  repository: ServiceRepository;
  bootOrder: ServiceDefinition[];

  constructor(services: ServiceDefinition[]) {
    this.bootOrder = resolveBootOrder(services);
    this.repository = mapServices(services);
  }

  async boot() {
    // todo: refactor
    for (const definition of this.bootOrder) {
      const dependencies = definition.dependencies || [];
      const resolved = dependencies.map(dep => this.repository.resolveDependency(dep).value);
      definition.value = await definition.factory.apply(definition.factory, resolved);
    }
  }
}
