// @flow

type Registry = {[alias: string]: any};

export default class Container {
  items: Registry;

  constructor (items: Registry) {
    this.items = {...items};
  }

  get (name: string): any {
    return this.items[name];
  }
}
