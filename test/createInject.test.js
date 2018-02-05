// @flow

import {describe, it} from 'mocha'
import {expect} from 'chai'

import createInject from '../src/createInject'

describe('createInject', () => {
  it('throws when kernel not booted', () => {
    const i = createInject(({booted: false}: any))()
    expect(() => i(() => {})).to.throw();
  })
  it('injects services', () => {
    const i = createInject(({
      booted: true,
      container: {
        resolveDependency: (dep) => {
          expect(dep).to.be.deep.equal({name: 'a', type: 'service'})
          return 1
        }
      }
    }: any))()

    expect(i((a) => a, ['a'])).to.be.equal(1);
  })
});
