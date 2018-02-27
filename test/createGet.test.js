// @flow

import {describe, it} from 'mocha'
import {expect} from 'chai'

import createGet from '../src/createGet'

describe('createGet', () => {
  it('throws when kernel not booted', () => {
    const i = createGet(({booted: false}: any))()
    expect(() => i('a')).to.throw();
  });

  it('injects a single service', () => {
    const i = createGet(({
      booted: true,
      container: {
        resolveDependency: (dep) => {
          expect(dep).to.be.deep.equal({name: 'a', type: 'service'})
          return 1
        }
      }
    }: any))();

    expect(i('a')).to.be.equal(1);
  })
});
