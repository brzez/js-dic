// @flow
import 'babel-polyfill'


type Dependency = {
  type: 'service'|'tag',
  name: string,
};

type ServiceFactory = {
  (...args: any[]): any;
};

type ServiceDefinition = Injectable & {
  name?: string,
  tags?: string|string[],
};

type Injectable = {
  factory: ServiceFactory,
  requires?: Dependency|Dependency[],
};

export function service(name: string) {
  return {type: 'service', name};
}

export function tag(name: string) {
  return {type: 'tag', name};
}
