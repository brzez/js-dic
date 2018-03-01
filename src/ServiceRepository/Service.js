// @flow

import type {ServiceDefinition} from "../types/ServiceDefinition";

export default class Service {
  definition: ServiceDefinition;

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
}
