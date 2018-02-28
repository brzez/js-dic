// @flow

import {ServiceRepository} from "./ServiceRepository";
import type {Dependency} from "./types/Dependency";

export default class Container {
  repository: ServiceRepository;

  constructor(repository: ServiceRepository) {
    this.repository = repository;
  }

  get (dependency: Dependency) {
    return this.repository.resolveDependency(dependency);
  }
}
