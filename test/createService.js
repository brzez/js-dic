// @flow
import Service from '../src/di/Service'

export default function createService (name: any, tags: any = [], factory: any = () => {}, dependencies: any = []) {
  return new Service(name, tags, factory, dependencies);
}
