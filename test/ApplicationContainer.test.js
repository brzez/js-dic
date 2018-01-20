// @flow

import {describe, it} from 'mocha'
import {expect} from 'chai'

import assertRejected from './assertRejected'
import ApplicationContainer from '../src/ApplicationContainer'


describe('ApplicationContainer', () => {
  describe('inject', () => {
    it('should call the method with injected services', () => {
      const container = new ApplicationContainer({
        foo: 'bar',
        baz: 'bazz',
      });

      let called = false;

      container.inject(['foo', 'baz'], (foo, baz) => {
        called = true;
        expect(foo).to.be.equal('bar')
        expect(baz).to.be.equal('bazz')
      });

      expect(called).to.be.true;
    })
    it('should throw on invalid service', () => {
      const container = new ApplicationContainer({});

      let called = false;

      const throwingfn = () => container.inject(['foo', 'baz'], (foo, baz) => {
        called = true;
      });

      expect(throwingfn).to.throw;
      expect(called).to.be.false;
    })
  })
})
