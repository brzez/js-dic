// @flow

import type {ServiceDefinition} from "../types/ServiceDefinition";

export default class Service {
  definition: ServiceDefinition;
  booted: boolean = false;
  value: any;

  constructor(definition: ServiceDefinition) {
    this.definition = definition;
  }

  get name (): ?string {
    return this.definition.name;
  }

  get tags (): string[] {
    const {tags} = this.definition;

    if (!tags) {
      return [];
    }

    return Array.isArray(tags) ? tags : [tags];
  }

  boot (value: any) {
    this.booted = true;
    this.value = value;
  }
}
