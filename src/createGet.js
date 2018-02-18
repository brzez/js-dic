// @flow
import Kernel from './Kernel'
import {normalizeDependency} from './normalizeDependencies'
import type {Dependency} from './di/Dependency'

export default function createGet (kernel: Kernel) {
  return () => (dependency: Dependency|string) => {
    if (!kernel.booted) {
      throw new Error('Kernel not booted')
    }

    const {container} = kernel;
    const dep = normalizeDependency(dependency);
    
    return container.resolveDependency(dep);
  }
}
