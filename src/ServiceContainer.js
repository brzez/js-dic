// @flow
import typeof Registry from './Registry'
import Container from './Container'

type ServiceFactory = {
  (...args: any[]): any
};

type Dependency = {
  type: 'service'|'tag';
  name: string;
};

export class Service {
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

export default class ServiceContainer{
  services: Container<Service>;

  constructor () {
    this.services = new Container();
  }

  async boot (services: Service[]) {
    // set services
    services.forEach(service => this.services.set(service.name, service));

    await Promise.all(services.map(s => s.boot(this)));
  }

  async resolveDependency ({type, name}: Dependency) {
    const matching = this.services.all().filter(service => {
      if (type === 'service') {
        return service.name === name;
      }

      if (type === 'tag') {
        return service.tags.includes(name);
      }

      return false;
    });

    for (const service of matching) {
      // ensure booted
      await service.boot(this);
    }

    const values = matching.map(m => m.value);

    return type === 'service' ? values.shift() : values;
  }
}
