// @flow
import type {ServiceDefinitions} from './Kernel'
import Kernel from './Kernel'

export default async function boot (services: ServiceDefinitions) {
  const kernel = new Kernel(services);
  return await kernel.boot();
}
