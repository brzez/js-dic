// @flow

import {ServiceRepository} from "./ServiceRepository/ServiceRepository";
import type {Dependency} from "./types/Dependency";
import type {Injectable} from "./types/Injectable";

export default class Container {
  repository: ServiceRepository;

  constructor(repository: ServiceRepository) {
    this.repository = repository;
  }

  get (dependency: Dependency) {
    const service = this.repository.resolveDependency(dependency);

    return Array.isArray(service) ? service.map(s => s.value) : service.value;
  }

  inject (injectable: Injectable, thisArg: any = null): any {
    const {factory, dependencies} = injectable;

    const resolved = (dependencies || []).map(dep => this.get(dep));

    return factory.apply(thisArg, resolved);
  }
}
