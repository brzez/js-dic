// @flow
import Service from './di/Service'
import type {ServiceFactory} from './di/ServiceFactory'
import type {Dependency} from './di/Dependency'
import ServiceContainer from './di/ServiceContainer'

type ServiceDefinition = {
  tags?: string[];
  factory: ServiceFactory;
  dependencies?: Dependency[]|string[];
};

type ServiceDefinitions = {
  [name: string]: ServiceDefinition;
};

export default class Kernel {
  services: ServiceDefinitions;
  booted: boolean = false;

  constructor (services: ServiceDefinitions) {
    this.services = services;
  }

  normalizeService (name: string, def: ServiceDefinition): Service {

  }

  normalizeServices (): Service[] {
    return [];
  }

  async boot (): Promise<ServiceContainer> {
    const container = new ServiceContainer();
    const normalized = this.normalizeServices();

    container.boot(normalized);
    return container;
  }
}
