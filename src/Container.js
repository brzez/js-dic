// @flow

import {ServiceRepository} from "./ServiceRepository";
import type {Dependency} from "./types/Dependency";
import {TYPE_SERVICE, TYPE_TAG} from "./types/Dependency";

export default class Container {
  repository: ServiceRepository;

  constructor(repository: ServiceRepository) {
    this.repository = repository;
  }

  get (dependency: Dependency) {
    const service = this.repository.resolveDependency(dependency);

    switch (dependency.type) {
      case TYPE_SERVICE:
        return service[0].value;
      case TYPE_TAG:
        return service.map(s => s.value)
    }

    throw new Error(`Invalid type ${dependency.type}`)
  }
}
