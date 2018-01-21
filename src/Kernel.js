// @flow
import typeof Registry from './Registry'
import type {Injectable} from './ServiceContainer'
import type {InjectSignature, InjectCallback} from './ServiceContainer'
import ServiceContainer from './ServiceContainer'

type ServiceProvider = {
  (context: Context):?Promise<any>
};

type ServiceDefinition = ServiceProvider|Injectable;

type ServiceRegistry = {
  [alias: string]: ServiceDefinition;
};

type Context = {
  register: (Injectable: Injectable) => any,
  ready: InjectSignature,
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

  async boot () {
    if (this.booted) {
      throw new Error('Kernel already booted');
    }
    
    this.booted = true;

    const normalized = {};

    Object.keys(this.services).forEach(alias => {
      normalized[alias] = this.services[alias];
    });

    const container = new ServiceContainer(normalized);
    return container;
  }
}
