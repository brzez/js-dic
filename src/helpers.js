// @flow

export function service(name: string) {
  return {type: 'service', name};
}

export function tag(name: string) {
  return {type: 'tag', name};
}
