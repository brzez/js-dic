// @flow

import type {ServiceDefinition} from "./types/ServiceDefinition";

export type ServiceMap = {
  // todo: rename services -> names (?)
  services: {[string]: ServiceDefinition};
  tags: {[string]: ServiceDefinition[]};
  anonymous: {[string]: ServiceDefinition[]};
}

// todo: check types name => string, def.tags = string|string[] etc.
export function mapByName (def: ServiceDefinition, store: {[string]: ServiceDefinition}): boolean {
  const {name} = def;

  if (!name) {
    return false;
  }

  if (store[name]) {
    throw new Error(`Service named ${name} already registered`);
  }

  store[name] = def;

  return true;
}

export default function mapServices (defs: ServiceDefinition[]): ServiceMap {
  const services: {[string]: ServiceDefinition} = {};
  const tags: {[string]: ServiceDefinition[]} = {};
  const anonymous: {[string]: ServiceDefinition[]} = {};

  defs.forEach(def => {
    const {name, tags} = def;
    // todo: check collisions on service names
    // todo: refactor
    if (name) {
      services[name] = def;
    }

    if (tags) {
      const tagArray = Array.isArray(tags) ? tags : [tags];
      tagArray.forEach(tag => {
        if (!tags[tag]) {
          tags[tag] = [];
        }
        tags[tag].push(def);
      })
    }

  });

  return ({services, tags, anonymous})
}
