// @flow


import type {ServiceDefinition} from "./types/ServiceDefinition";
import Container from "./Container";
import resolveBootOrder from "./resolveBootOrder";
import mapServices from "./mapServices";
import {ServiceMap} from "./ServiceMap";

export default class Kernel {
  services: ServiceDefinition[];

  constructor (services: ServiceDefinition[]) {
    this.services = services;
  }

  async boot (): Promise<Container> {
    // resolve boot order
    const resolved = resolveBootOrder(this.services);
    const map = mapServices(resolved);
    // boot all services
    resolved.forEach(def => {
      this.bootServiceDefinition(def, map);
    })
    // create container w/ booted services
  }

  bootServiceDefinition(def: ServiceDefinition, map: ServiceMap) {
    const dependencies = def.dependencies || [];
    const resolved = dependencies.map(dep => map.resolveDependency(dep));
    console.log(def, resolved)
  }
}
