// @flow
import typeof Registry from './Registry'
import Container from './Container'

export type InjectCallback = {
  (...args: any[]): any
};

export type Injectable = {
  factory: InjectCallback;
  dependencies: string[];
};

export default class ServiceContainer extends Container {

  constructor (bootables: {[string]: Injectable}) {
    super();

    const boot = (alias: string) => {
      const bootable = bootables[alias];
      const {dependencies}: Injectable = bootables[alias];
      // 1. get unregistered deps
      const notBooted = (dependencies || []).filter(dep => !this.exists(dep));
      // 2. boot them
      notBooted.forEach(alias => boot(alias));
      // 3. boot this service
      if (this.exists(alias)) {
        return
      }
      const instance = this.inject(bootable);
      // 4. register it
      this.items[alias] = instance;
    }

    Object.keys(bootables).forEach(alias => boot(alias));
  }

  inject ({factory, dependencies}: Injectable) {
    // resolve dependencies
    const resolvedServices = (dependencies||[]).map(alias => {
      if (this.exists(alias)) {
        return this.get(alias);
      }
      throw new Error(`Service [${alias}] is not registered`); 
    })

    return factory.apply(undefined, resolvedServices);
  }
}
