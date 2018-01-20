// @flow

type ServiceProvider = {
  ():?Promise<any>
};

type ServiceRegistry = {
  [alias: string]: ServiceProvider;
};

export default class Container {
  providers: ServiceRegistry;
  booted: bool = false;

  constructor (providers: ServiceRegistry) {
    this.providers = providers;
  }

  async boot () {
    if (this.booted) {
      throw new Error('Container already booted');
    }

    const providers: ServiceProvider[] = Object.keys(this.providers)
      .map(alias => this.providers[alias]);

    const bootPromises = providers.map(provider => provider());

    await Promise.all(bootPromises);
    
    this.booted = true;

    return this;
  }
}
