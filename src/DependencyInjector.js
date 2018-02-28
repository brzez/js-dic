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
      const resolved = dependencies.map(dep => {
        const resolved = this.repository.resolveDependency(dep);
        if (dep.type === 'service') {
          return resolved[0].value
        }
        return resolved.map(s => s.value)
      });
      definition.value = await definition.factory.apply(definition.factory, resolved);
    }

    return this.repository;
  }
}
