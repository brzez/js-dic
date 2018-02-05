// @flow

import {describe, it} from 'mocha'
import {expect} from 'chai'

import normalizeDependencies from '../src/normalizeDependencies'

describe('normalizeDependencies', () => {
  it('normalizes dependencies', () => {
    const d = normalizeDependencies([
      'foo', 
      {type: 'service', name: 'bar'},
      {type: 'tag', name: 'baz'},
    ]);
    expect(d).to.be.an('array');
    expect(d).to.be.deep.equal([
      {type: 'service', name: 'foo'},
      {type: 'service', name: 'bar'},
      {type: 'tag', name: 'baz'},
    ]);
  })

  it('changes undefined to empty array', () => {
    const d = normalizeDependencies();
    expect(d).to.be.an('array');
    expect(d).to.have.lengthOf(0);
  })
});
