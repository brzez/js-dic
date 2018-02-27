// @flow

export type Dependency = {
  type: 'service'|'tag';
  name: string;
};

export function serviceReference (name: string): Dependency {
  return {name, type: 'service'};
}

export function tagReference (name: string): Dependency {
  return {name, type: 'tag'};
}
