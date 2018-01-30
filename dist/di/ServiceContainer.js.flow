// @flow
import Service from './Service'
import type {Dependency} from './Dependency.js'
import DependencyInjector from './DependencyInjector'
import ServiceRepository from './ServiceRepository'

export default class ServiceContainer {
  services: ServiceRepository;
  // todo: move services to ctor
  async boot (services: Service[]) {
    this.services = new ServiceRepository(services);
    const di = new DependencyInjector(services);

    return await di.boot();
  }

  service (name: string): any {
    return this.services.findAlias(name)[0].value;
  }

  tags (name: string): any[] {
    return this.services.findTags(name).map(s => s.value);
  }
}
