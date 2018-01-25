// @flow
import Service from './Service'
import type {Dependency} from './Dependency'
import ServiceRepository from './ServiceRepository'

export default class DependencyInjector {
  services: ServiceRepository;

  constructor (services: Service[]) {
    this.services = new ServiceRepository(services);
  }

  async boot () {
    // loop all services
    // inject each
    await Promise.all(this.services.all().map(service => this.inject(service)));
    // return booted services
    return this.services.all();
  }

  async resolveDependency (dependency: Dependency, chain: string[]) {
    const services = this.services.findDependency(dependency);
    // ensure deps are booted
    await Promise.all(services.map(s => this.inject(s, chain.slice())));
    // get value for each service
    const values = services.map(s => s.value);

    // ensure proper type - i.e. array for tags
    return dependency.type === 'service' ? values[0] : values;
  }

  async resolveDependencies (dependencies: Dependency[], chain: string[]): Promise<any[]> {
    let resolved = [];

    for (const dependency of dependencies) {
      resolved.push(await this.resolveDependency(dependency, chain));
    }

    return resolved;
  }

  async inject (service: Service, chain: string[] = []) {
    if (service.isReady()) {
      return
    }

    const {name} = service;

    if (chain.includes(name)) {
      throw new Error(`Circular dependency detected. Dependency chain: [${chain.join(',')}]`)
    }

    chain.push(name);

    const dependencies = await this.resolveDependencies(service.dependencies, chain);
    const value = await service.factory.apply(null, dependencies);

    service.boot(value);
  }
}
