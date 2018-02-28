// @flow

import type {ServiceDefinition} from "./types/ServiceDefinition";
import mapServices from "./mapServices";
import type {Dependency} from "./types/Dependency";
import {ServiceMap} from "./ServiceMap";

function resolveDependencies (definition: ServiceDefinition, mapped: ServiceMap): ServiceDefinition[] {
  const dependencies: Dependency[] = definition.dependencies || [];

  const resolved = [];

  for (const dependency of dependencies) {
    mapped.resolveDependency(dependency).forEach(def => {
      resolved.push.apply(resolved, resolveDependencies(def, mapped));
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
    resolved.push.apply(resolved, resolveDependencies(definition, mapped));
  }

  return removeDuplicates(resolved);
}
