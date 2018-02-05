// @flow
import type {Dependency} from './di/Dependency'

export default function normalizeDependencies (dependencies: ?Array<Dependency|string>) {
  dependencies = dependencies || [];

  return dependencies.map(dep => {
    if (typeof dep === 'string') {
      return {name: dep, type: 'service'}
    }
    return dep;
  });
}
