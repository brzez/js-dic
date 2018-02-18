// @flow
import type {Dependency} from './di/Dependency'

export function normalizeDependency (dependency: Dependency|string) {
  if (typeof dependency === 'string') {
    return {name: dependency, type: 'service'}
  }
  return dependency;
}

export default function normalizeDependencies (dependencies: ?Array<Dependency|string>) {
  dependencies = dependencies || [];

  return dependencies.map(normalizeDependency);
}
