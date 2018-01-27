// @flow
import Service from './di/Service'
import type {ServiceFactory} from './di/ServiceFactory'
import type {Dependency} from './di/Dependency'
import ServiceContainer from './di/ServiceContainer'

export type ServiceObjectDefinition = {
  tags?: string[];
  factory: ServiceFactory;
  dependencies?: Array<Dependency|string>;
};

export type ServiceDefinition = ServiceObjectDefinition|ServiceFactory;

export type ServiceDefinitions = {
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

    return this.createServiceFromObjectDef(name, (def: any));
  }

  normalizeServices (): Service[] {
    return Object.keys(this.services)
      .map(name => this.normalizeService(name, this.services[name]));
  }

  async boot (): Promise<ServiceContainer> {
    if (this.booted) {
      throw new Error('Kernel already booted');
    }
    const container = new ServiceContainer();
    const normalized = this.normalizeServices();

    await container.boot(normalized);
    this.booted = true;
    return container;
  }
}
