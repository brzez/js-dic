// @flow
import ServiceContainer from './index'
import type {Dependency} from './Dependency.js'
import type {ServiceFactory} from './ServiceFactory.js'


export default class Service {
  name: string;
  tags: string[];

  factory: ServiceFactory;
  dependencies: Dependency[];

  booting: bool = false;
  ready: bool = false;

  value: any;

  constructor (name: string, tags: string[], factory: ServiceFactory, dependencies: Dependency[]) {
    this.name = name;
    this.tags = tags;
    this.factory = factory;
    this.dependencies = dependencies;
  }

  /**
   * boot this service & dependencies
   */
  async boot (container: ServiceContainer) {
    if (this.ready) {
      return true;
    }
    
    if (this.booting) {
      // circular dependency
      throw new Error(`Circular dependency detected in service ${this.name}`);
    }

    this.booting = true;

    const dependencyServices = [];

    for (const dependency of this.dependencies) {
      dependencyServices.push(await container.resolveDependency(dependency));
    }

    this.value = this.factory.apply(null, dependencyServices);

    this.ready = true;
    this.booting = false;
  }
}
