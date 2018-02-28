// @flow

import type {ServiceDefinition} from "./types/ServiceDefinition";
import mapServices from "./mapServices";
import type {Dependency} from "./types/Dependency";
import {ServiceMap} from "./ServiceMap";

function resolveDependencies (definition: ServiceDefinition, mapped: ServiceMap) {
  const dependencies: Dependency[] = definition.dependencies || [];

  for (const dependency of dependencies) {

  }
}

export default function resolveBootOrder(definitions: ServiceDefinition[]) {
  const mapped = mapServices(definitions);

  for (const definition of definitions) {
    resolveDependencies(definition, mapped);
  }
}
