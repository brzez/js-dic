// @flow
import ServiceContainer from './ServiceContainer'
import type {Dependency} from './Dependency.js'
import type {ServiceFactory} from './ServiceFactory.js'


export default class Service {
  name: string;
  tags: string[];

  factory: ServiceFactory;
  dependencies: Dependency[];

  ready: bool = false;
  value: any;

  constructor (name: string, tags: string[], factory: ServiceFactory, dependencies: Dependency[]) {
    this.name = name;
    this.tags = tags;
    this.factory = factory;
    this.dependencies = dependencies;
  }

  isReady () {
    return this.ready;
  }

  boot (value: any) {
    this.ready = true;
    this.value = value;
  }
}
