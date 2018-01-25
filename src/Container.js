// @flow
type ContainerItems<T> = {
  [alias: string]: T
};

export default class Container <T> {
  items: ContainerItems<T>;

  constructor (items: ContainerItems<T> = {}) {
    this.items = {...items};
  }

  set (name: string, value: any) {
    this.items[name] = value;
  }

  get (name: string): T {
    return this.items[name];
  }

  exists (name: string): bool {
    return name in this.items;
  }

  all (): T[] {
    return Object.keys(this.items).map(name => this.items[name]);
  }
}
