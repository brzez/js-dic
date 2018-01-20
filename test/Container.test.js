// @flow

import {describe, it} from 'mocha'
import {expect} from 'chai'

import assertRejected from './assertRejected'
import Container from '../src/Container'


describe('Container', () => {
  it('should store key->value', () => {
    const container = new Container({
      foo: 'bar',
      baz: 'bazz',
    });
    
    expect(container.get('foo')).to.be.equal('bar');
    expect(container.get('baz')).to.be.equal('bazz');
  })
})
