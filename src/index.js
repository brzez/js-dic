// @flow
import 'babel-polyfill'
import type {ServiceDefinition} from "./types/ServiceDefinition";
import Kernel from "./Kernel";


export {tag, service} from './helpers'


export default async function boot(services: ServiceDefinition[]) {
  const kernel = new Kernel(services);
  return await kernel.boot();
}
