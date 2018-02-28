import type {ServiceDefinition} from "./types/ServiceDefinition";
import type {Dependency} from "./types/Dependency";
import {TYPE_SERVICE, TYPE_TAG} from "./types/Dependency";

export class ServiceMap {
  byName: { [string]: ServiceDefinition };
  byTag: { [string]: ServiceDefinition[] };
  anonymous: ServiceDefinition[];

  constructor(byName: { string?: ServiceDefinition }, byTag: { string?: ServiceDefinition[] }, anonymous: ServiceDefinition[]) {
    this.byName = byName;
    this.byTag = byTag;
    this.anonymous = anonymous;
  }

  resolveDependency(dependency: Dependency): ServiceDefinition[] {
    const {type, name} = dependency;

    switch (type) {
      case TYPE_SERVICE:
        return this.resolveService(name);
      case TYPE_TAG:
        return this.resolveTag(name)
    }

    throw new Error(`Invalid type ${type} for dependency [${name}]`);
  }

  resolveService (name: string): ServiceDefinition {
    const service = this.byName[name];
    // todo: prettier errors
    if (service) {
      return [service];
    }

    throw new Error(`Service named ${name} not found`);
  }

  resolveTag (name: string): ServiceDefinition[] {
    const tag = this.byTag[name];
    return tag ? tag : [];
  }
}
