// @flow
import Service from './Service'
import type {Dependency} from './Dependency'

export default class DependencyInjector {
  services: Service[];

  constructor (services: Service[]) {
    this.services = services;
  }

  async boot () {
    // loop all services
    // inject each
    await Promise.all(this.services.map(service => this.inject(service)));
    // return booted services
    return this.services;
  }

  // todo: move find* to repo

  findTags (name: string): Service[] {
    return this.services.filter((service) => service.tags.includes(name));
  }

  // todo: rename service -> alias in Dependency
  findAlias (alias: string): Service[] {
    const match = this.services.filter((service) => service.name === alias);
    if (match.length === 0) {
      throw new Error(`Service ${alias} not found`);
    }
    return match;
  }

  findDependency ({type, name}: Dependency): Service[] {
    return type === 'service' ? this.findAlias(name) : this.findTags(name);
  }

  async resolveDependency (dependency: Dependency) {
    const services = this.findDependency(dependency);
    // ensure deps are booted
    await Promise.all(services.map(s => this.inject(s)));
    // get value for each service
    const values = services.map(s => s.value);

    // ensure proper type - i.e. array for tags
    return dependency.type === 'service' ? values[0] : values;
  }

  async resolveDependencies (dependencies: Dependency[]): Promise<any[]> {
    let resolved = [];

    for (const dependency of dependencies) {
      resolved.push(await this.resolveDependency(dependency));
    }

    return resolved;
  }

  async inject (service: Service) {
    if (service.isReady()) {
      return
    }

    const dependencies = await this.resolveDependencies(service.dependencies);
    const value = await service.factory.apply(null, dependencies);

    service.boot(value);
  }
}
