// @flow
import Service from './di/Service'
import type {ServiceFactory} from './di/ServiceFactory'
import type {Dependency} from './di/Dependency'
import ServiceContainer from './di/ServiceContainer'
import normalizeDependencies from './normalizeDependencies'

import createInject from './createInject'
import createGet from './createGet'
import createReady from "./createReady";

export type ServiceObjectDefinition = {
  tags?: string[];
  factory: ServiceFactory;
  dependencies?: Array<Dependency|string>;
};

export type ServiceDefinition = ServiceObjectDefinition|ServiceFactory;

export type ServiceDefinitions = {
  [name: string]: ServiceDefinition;
};

export type ReadyCallback = {
  (container: ServiceContainer): any
};

export default class Kernel {
  services: ServiceDefinitions;
  booted: boolean = false;
  container: ServiceContainer;
  readyListeners: Array<ReadyCallback> = [];

  constructor (services: ServiceDefinitions, appendInternals: boolean = true) {
    this.services = services;

    if (appendInternals) {
      this.appendInternals();
    }
  }

  appendInternals () {
    const internals = {
      $inject: createInject(this),
      $get: createGet(this),
      $ready: createReady(this),
    };
    Object.assign(this.services, internals);
  }

  createServiceFromObjectDef (name: string, def: ServiceObjectDefinition): Service {
    return new Service(name, def.tags || [], def.factory, normalizeDependencies(def.dependencies));
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
    this.container = new ServiceContainer();
    const normalized = this.normalizeServices();

    await this.container.boot(normalized);
    this.booted = true;
    this.readyListeners.forEach(callback => callback(this.container));
    return this.container;
  }
}
