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

    this.booting = true;

    const dependencyServices = this.dependencies.map(d => container.resolveDependency(d));
    // ensure dependencies are booted
    for (const dependency of dependencyServices) {
      await dependency.boot(container);
    }
    this.value = this.factory.apply(null, dependencyServices.map(s => s.value));

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
    // resolve boot order
    //  [throw if cicrular dependency]
    await Promise.all(services.map(s => s.boot(this)));
    
    // boot according to boot order
  }

  resolveDependency ({type, name}: Dependency): Service {
    const service = this.services.all().filter(service => {
      if (type === 'service') {
        return service.name === name;
      }

      if (type === 'tag') {
        return service.tags.includes(name);
      }

      return false;
    }).shift();

    return service;
  }
}
