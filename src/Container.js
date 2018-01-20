// @flow

type ServiceProvider = {
  (context: Context):?Promise<any>
};

type ServiceRegistry = {
  [alias: string]: ServiceProvider;
};

type Context = {
  register: (value: any) => any,

};

export default class Container {
  providers: ServiceRegistry;
  booted: bool = false;

  constructor (providers: ServiceRegistry) {
    this.providers = providers;
  }

  createContext (alias: string): Context {
    return {
      register: (value: any) => {} // todo
    };
  }

  bootService (alias: string): ?Promise<any> {
    const provider = this.providers[alias];
    const context = this.createContext(alias);

    return provider(context);
  }

  async boot () {
    if (this.booted) {
      throw new Error('Container already booted');
    }

    const bootPromises = Object.keys(this.providers)
      .map(alias => this.bootService(alias));

    await Promise.all(bootPromises);
    
    this.booted = true;

    return this;
  }
}
