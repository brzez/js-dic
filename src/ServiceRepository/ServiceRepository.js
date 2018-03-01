import type {ServiceDefinition} from "../types/ServiceDefinition";
import type {Dependency} from "../types/Dependency";
import {TYPE_SERVICE, TYPE_TAG} from "../types/Dependency";
import Service from "./Service";

export class ServiceRepository {
  all: Service[];

  constructor(definitions: ServiceDefinition[]) {
    this.all = definitions.map(def => new Service(def));
  }

  resolveDependency(dependency: Dependency): Service[] {
    const {type, name} = dependency;

    switch (type) {
      case TYPE_SERVICE:
        return this.resolveService(name);
      case TYPE_TAG:
        return this.resolveTag(name)
    }

    throw new Error(`Invalid type ${type} for dependency [${name}]`);
  }

  resolveService (name: string): Service {
    for (const service of this.all) {
      if (service.definition.name === name) {
        return service;
      }
    }

    throw new Error(`Service named ${name} not found`);
  }

  resolveTag (name: string): Service[] {
    return this.all.filter(service => service.tags.includes(name));
  }
}
