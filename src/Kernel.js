// @flow
import typeof Registry from './Registry'
import Container from './Container'

type ServiceProvider = {
  (context: Context):?Promise<any>
};

type ServiceRegistry = {
  [alias: string]: ServiceProvider;
};

type Context = {
  register: (value: any) => any,
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
      register: (value: any) => {
        registry[alias] = value; 
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

    return new Container(this.registry);
  }
}
