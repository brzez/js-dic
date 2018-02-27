// @flow
import type {Dependency} from './di/Dependency'
import {serviceReference} from "./di/Dependency";

export function normalizeDependency (dependency: Dependency|string) {
  if (typeof dependency === 'string') {
    return serviceReference(dependency);
  }
  return dependency;
}

export default function normalizeDependencies (dependencies: ?Array<Dependency|string>) {
  dependencies = dependencies || [];

  return dependencies.map(normalizeDependency);
}
