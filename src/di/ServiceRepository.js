// @flow
import Service from './Service'
import type {Dependency} from './Dependency'

export default class ServiceRepository {
  services: Service[];

  constructor (services: Service[]) {
    this.services = services;
  }

  all (): Service[] {
    return this.services;
  }

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
}
