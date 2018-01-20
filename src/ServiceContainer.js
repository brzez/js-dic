// @flow
import typeof Registry from './Registry'
import Container from './Container'

type InjectCallback = {
  (...args: any[]): any
};

export default class ServiceContainer extends Container {

  constructor (items: Registry) {
    super(items);
  }

  inject (services: string[], callback: InjectCallback) {
    // resolve services
    const resolvedServices = services.map(alias => {
      if (this.exists(alias)) {
        return this.get(alias);
      }
      throw new Error(`Service [${alias}] is not registered`); 
    })

    callback.apply(undefined, resolvedServices);
  }
}
