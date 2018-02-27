// @flow


import type {ServiceDefinition} from "./types/ServiceDefinition";
import Container from "./Container";

export default class Kernel {
  services: ServiceDefinition[];

  constructor (services: ServiceDefinition[]) {
    this.services = services;
  }

  async boot (): Promise<Container> {

  }
}
