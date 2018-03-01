// @flow

import {ServiceRepository} from "./ServiceRepository/ServiceRepository";
import type {Dependency} from "./types/Dependency";

export default class Container {
  repository: ServiceRepository;

  constructor(repository: ServiceRepository) {
    this.repository = repository;
  }

  get (dependency: Dependency) {
    const service = this.repository.resolveDependency(dependency);

    return Array.isArray(service) ? service.map(s => s.value) : service.value;
  }
}
