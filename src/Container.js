// @flow

type ServiceProvider = {
  ():?Promise<any>
};

type ServiceRegistry = {
  [alias: string]: ServiceProvider;
};

export default class Container {
  providers: ServiceRegistry;

  constructor (providers: ServiceRegistry) {
    this.providers = providers;
  }

  async boot () {
    const providers: ServiceProvider[] = Object.keys(this.providers)
      .map(alias => this.providers[alias]);

    const bootPromises = providers.map(provider => provider());

    await Promise.all(bootPromises);
  }
}
