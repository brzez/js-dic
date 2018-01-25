// @flow
import Service from './Service'
import type {Dependency} from './Dependency'

export default class ServiceRepository {
  services: Service[];

  constructor (services: Service[]) {
    this.services = services;
  }
}
