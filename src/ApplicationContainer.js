// @flow
import typeof Registry from './Registry'
import Container from './Container'

export default class ApplicationContainer extends Container {

  constructor (items: Registry) {
    super(items);
  }

}
