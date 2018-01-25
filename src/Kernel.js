// @flow
import type {Injectable, InjectCallback} from './ServiceContainer'
import ServiceContainer from './ServiceContainer'

type ServiceDefinition = InjectCallback|Injectable;

export type ServiceRegistry = {
  [alias: string]: ServiceDefinition;
};

export default class Kernel {
  booted: bool = false;
  services: ServiceRegistry;

  constructor (services: ServiceRegistry) {
    this.services = services;
  }

  normalizeInjectable (service: ServiceDefinition) {
    if (typeof service === 'function') {
      return {factory: service, dependencies: []};
    }
    return service;
  }

  createServiceContainer (): ServiceContainer {
    return new ServiceContainer();
  }

  async boot () {
    if (this.booted) {
      throw new Error('Kernel already booted');
    }
    
    this.booted = true;

    const normalized = {};

    Object.keys(this.services).forEach(alias => {
      normalized[alias] = this.normalizeInjectable(this.services[alias]);
    });

    const container = this.createServiceContainer();

    await container.boot(normalized);

    return container;
  }
}
