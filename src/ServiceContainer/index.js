// @flow
import Container from '../Container'
import Service from './Service'
import type {Dependency} from './Dependency.js'


export default class ServiceContainer{
  services: Container<Service>;

  constructor () {
    this.services = new Container();
  }

  async boot (services: Service[]) {
    // set services
    services.forEach(service => this.services.set(service.name, service));

    await Promise.all(services.map(s => s.boot(this)));
  }

  service (name: string): any {
    const filtered = this.services.all().filter(service => service.name === name);
    if (filtered.length === 0) {
      throw new Error(`Service ${name} not found`);
    }
    return filtered.shift().value;
  }

  tags (name: string): any[] {
    return this.services
      .all()
      .filter(service => service.tags.includes(name))
      .map(s => s.value);
  }

  async resolveDependency ({type, name}: Dependency) {
    const matching = this.services.all().filter(service => {
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
