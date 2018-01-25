// @flow
import Service from './Service'
import type {Dependency} from './Dependency.js'


export default class ServiceContainer{
  services: Service[];

  constructor () {
    this.services = [];
  }

  async boot (services: Service[]) {
    // set services
    services.forEach(service => this.services.push(service));
    await Promise.all(services.map(s => s.boot(this)));
  }

  service (name: string): any {
    const filtered = this.services.filter(service => service.name === name);
    if (filtered.length === 0) {
      throw new Error(`Service ${name} not found`);
    }
    return filtered.shift().value;
  }

  tags (name: string): any[] {
    return this.services
      .filter(service => service.tags.includes(name))
      .map(s => s.value);
  }

  async resolveDependency ({type, name}: Dependency) {
    const matching = this.services.filter(service => {
      if (type === 'service') {
        return service.name === name;
      }

      if (type === 'tag') {
        return service.tags.includes(name);
      }

      return false;
    });

    for (const service of matching) {
      // ensure booted
      await service.boot(this);
    }

    const values = matching.map(m => m.value);
    
    if (type === 'service') {
      if (values.length === 0) {
        throw new Error(`Service ${name} not found.`);
      }
      return values.shift();
    }

    return values; 
  }
}
