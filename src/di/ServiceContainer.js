// @flow
import Service from './Service'
import type {Dependency} from './Dependency.js'


export default class ServiceContainer {
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
}
