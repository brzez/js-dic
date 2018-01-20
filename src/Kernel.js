// @flow
import typeof Registry from './Registry'
import type {Bootable} from './ServiceContainer'

import ServiceContainer from './ServiceContainer'

type ServiceProvider = {
  (context: Context):?Promise<any>
};

type ServiceRegistry = {
  [alias: string]: ServiceProvider;
};

type Context = {
  register: (bootable: Bootable) => any,
};

export default class Kernel {
  booted: bool = false;

  providers: ServiceRegistry;
  registry: Registry = {};

  constructor (providers: ServiceRegistry) {
    this.providers = providers;
  }

  createContext (registry: Registry, alias: string): Context {
    return {
      register: (bootable: Bootable) => {
        return registry[alias] = bootable;
      }
    };
  }

  bootService (alias: string): ?Promise<any> {
    const provider = this.providers[alias];
    const context = this.createContext(this.registry, alias);

    return provider(context);
  }

  async boot () {
    if (this.booted) {
      throw new Error('Kernel already booted');
    }

    const bootPromises = Object.keys(this.providers)
      .map(alias => this.bootService(alias));

    await Promise.all(bootPromises);
    
    this.booted = true;

    return new ServiceContainer(this.registry);
  }
}
