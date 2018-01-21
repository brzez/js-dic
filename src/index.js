// @flow
import type {ServiceRegistry} from './Kernel'
import Kernel from './Kernel'

export default async function boot (services: ServiceRegistry) {
  const kernel = new Kernel(services);
  return await kernel.boot();
}
