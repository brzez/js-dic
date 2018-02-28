// @flow

import type {ServiceDefinition} from "./types/ServiceDefinition";
import mapServices from "./mapServices";
import type {Dependency} from "./types/Dependency";
import {ServiceRepository} from "./ServiceRepository";

function resolveBootChain (definition: ServiceDefinition, mapped: ServiceRepository, chain: ServiceDefinition[] = []): ServiceDefinition[] {
  const dependencies: Dependency[] = definition.dependencies || [];

  const resolved = [];

  if (chain.includes(definition)) {
    throw new Error(`Circular dependency detected.\n${JSON.stringify(definition, null, 2)}`);
  }

  chain.push(definition);

  for (const dependency of dependencies) {
    mapped.resolveDependency(dependency).forEach(def => {
      resolved.push.apply(resolved, resolveBootChain(def, mapped, chain));
    });
  }

  resolved.push(definition);
  return resolved;
}

function removeDuplicates (definitions: ServiceDefinition[]) {
  return definitions.filter((dep, index, definitions) => {
    return definitions.indexOf(dep) === index
  })
}

export default function resolveBootOrder(definitions: ServiceDefinition[]) {
  const mapped = mapServices(definitions);

  const resolved = [];
  for (const definition of definitions) {
    resolved.push.apply(resolved, resolveBootChain(definition, mapped));
  }

  return removeDuplicates(resolved);
}
