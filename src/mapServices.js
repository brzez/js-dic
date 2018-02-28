// @flow

import type {ServiceDefinition} from "./types/ServiceDefinition";
import {ServiceRepository} from "./ServiceRepository";

// todo: check types name => string, def.tags = string|string[] etc.
// todo: merge with service repo
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

export function mapByTags (def: ServiceDefinition, store: {[string]: ServiceDefinition[]}): boolean {
  const {tags} = def;

  if (!tags) {
    return false;
  }

  const tagArray = Array.isArray(tags) ? tags : [tags];

  tagArray.forEach(tag => {
    if (!store[tag]) {
      store[tag] = [];
    }

    store[tag].push(def);
  });

  return tagArray.length !== 0;
}

export default function mapServices (defs: ServiceDefinition[]): ServiceRepository {
  const byName: {[string]: ServiceDefinition} = {};
  const byTag: {[string]: ServiceDefinition[]} = {};
  const anonymous: ServiceDefinition[] = [];

  defs.forEach(def => {
    if (mapByName(def, byName) || mapByTags(def, byTag)) {
      return;
    }
    anonymous.push(def);
  });

  return new ServiceRepository(byName, byTag, anonymous);
}
