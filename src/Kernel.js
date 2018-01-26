// @flow
import Service from './di/Service'
import type {ServiceFactory} from './di/ServiceFactory'
import type {Dependency} from './di/Dependency'
import ServiceContainer from './di/ServiceContainer'

type ServiceObjectDefinition = {
  tags?: string[];
  factory: ServiceFactory;
  dependencies?: Array<Dependency|string>;
};

type ServiceDefinition = ServiceObjectDefinition|ServiceFactory;

type ServiceDefinitions = {
  [name: string]: ServiceDefinition;
};

export default class Kernel {
  services: ServiceDefinitions;
  booted: boolean = false;

  constructor (services: ServiceDefinitions) {
    this.services = services;
  }

  createServiceFromObjectDef (name: string, def: ServiceObjectDefinition): Service {
    let dependencies = def.dependencies || [];
    dependencies = dependencies.map(dep => {
      if (typeof dep === 'string') {
        return {name: dep, type: 'service'}
      }
      return dep;
    }) 
    return new Service(name, def.tags || [], def.factory, dependencies);
  }

  normalizeService (name: string, def: ServiceDefinition): Service {
    if (typeof def === 'function') {
      return new Service(name, [], def, []);
    }

    return this.createServiceFromObjectDef(name, def);
  }

  normalizeServices (): Service[] {
    return Object.keys(this.services)
      .map(name => this.normalizeService(name, this.services[name]));
  }

  async boot (): Promise<ServiceContainer> {
    const container = new ServiceContainer();
    const normalized = this.normalizeServices();

    container.boot(normalized);
    return container;
  }
}
