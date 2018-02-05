// @flow
import Kernel from './Kernel'
import normalizeDependencies from './normalizeDependencies'
import type {Dependency} from './di/Dependency'

export default function createInject (kernel: Kernel) {
  return () => (method: () => any, dependencies: ?Array<Dependency|string>, thisArg?: any) => {
    if (!kernel.booted) {
      throw new Error('Kernel not booted')
    }

    const {container} = kernel;
    const normalized = normalizeDependencies(dependencies);
    
    return method.apply(thisArg, normalized.map(dep => container.resolveDependency(dep)));
  }
}
