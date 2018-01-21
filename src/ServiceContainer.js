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

  async boot (services: {[string]: Injectable}) {
    const bootService = async (alias: string) => {
      const bootable = services[alias];
      const {dependencies}: Injectable = services[alias];
      // 1. get unregistered deps
      const notBooted = dependencies.filter(dep => !this.exists(dep));
      // 2. boot them
      for (let dependency of notBooted) {
        await bootService(dependency);
      }
      // 3. boot this service
      if (this.exists(alias)) {
        return
      }
      const instance = await this.inject(bootable);
      // 4. register it
      this.items[alias] = instance;
    }

    for (const alias in services) {
      await bootService(alias);
    }
  }

  async inject ({factory, dependencies}: Injectable) {
    // resolve dependencies
    const resolvedServices = (dependencies||[]).map(alias => {
      if (this.exists(alias)) {
        return this.get(alias);
      }
      throw new Error(`Service [${alias}] is not registered`); 
    })

    return await factory.apply(undefined, resolvedServices);
  }
}
