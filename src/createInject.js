// @flow
import Kernel from './Kernel'
import type {Dependency} from './di/Dependency'

export default function createInject (kernel: Kernel) {
  return () => (method: () => any, dependencies: ?Array<Dependency|string>) => {
    
  }
}
