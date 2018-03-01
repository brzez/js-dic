import {ServiceRepository} from "./ServiceRepository/ServiceRepository";
import type {ServiceDefinition} from "./types/ServiceDefinition";
import resolveBootOrder from "./resolveBootOrder";
import Service from "./ServiceRepository/Service";

export default class DependencyInjector {
  repository: ServiceRepository;
  bootOrder: Service[];

  constructor(services: ServiceDefinition[]) {
    this.repository = new ServiceRepository(services);
    this.bootOrder = resolveBootOrder(this.repository);
  }

  async boot() {
    // todo: refactor
    for (const service of this.bootOrder) {
      const {definition} = service;
      const dependencies = definition.dependencies || [];
      const resolved = dependencies.map(dep => {
        const resolved = this.repository.resolveDependency(dep);
        return Array.isArray(resolved) ? resolved.map(s => s.value) : resolved.value;
      });
      service.boot(await definition.factory.apply(definition.factory, resolved))
    }

    return this.repository;
  }
}
