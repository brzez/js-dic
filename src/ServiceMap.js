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

  resolveDependency(dependency: Dependency) {
    switch (dependency.type) {
      case TYPE_SERVICE:
        return this.resolveService(dependency.name);
      case TYPE_TAG:
        return this.resolveTag(dependency.name)
    }
  }
}
