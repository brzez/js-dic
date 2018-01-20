// @flow
import typeof Registry from './Registry'

export default class Container {
  items: Registry;

  constructor (items: Registry) {
    this.items = {...items};
  }

  get (name: string): any {
    return this.items[name];
  }
}
