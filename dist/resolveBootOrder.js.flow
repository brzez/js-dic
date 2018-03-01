// @flow

import type {Dependency} from "./types/Dependency";
import {ServiceRepository} from "./ServiceRepository/ServiceRepository";
import Service from "./ServiceRepository/Service";
import {toArray} from "./util";

function resolveBootChain (service: Service, repository: ServiceRepository, chain: Service[] = []): Service[] {
  const dependencies: Dependency[] = service.definition.dependencies || [];

  const resolved = [];

  if (chain.includes(service)) {
    throw new Error(`Circular dependency detected.\n${JSON.stringify(service, null, 2)}`);
  }

  for (const dependency of dependencies) {
    const dependencies = repository.resolveDependency(dependency);
    toArray(dependencies).forEach(def => {
      resolved.push.apply(resolved, resolveBootChain(def, repository, [service]));
    });
  }

  resolved.push(service);
  return resolved;
}

function removeDuplicates (definitions: Service[]) {
  return definitions.filter((dep, index, definitions) => {
    return definitions.indexOf(dep) === index
  })
}

export default function resolveBootOrder(repository: ServiceRepository): Service[] {
  const resolved = [];

  for (const service of repository.all) {
    resolved.push.apply(resolved, resolveBootChain(service, repository));
  }

  return removeDuplicates(resolved);
}
