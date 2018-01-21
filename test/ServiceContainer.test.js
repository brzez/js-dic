// @flow

import {describe, it} from 'mocha'
import {expect} from 'chai'

import assertRejected from './assertRejected'
import ServiceContainer from '../src/ServiceContainer'

const service = (factory, dependencies = []) => ({factory, dependencies});

describe('ServiceContainer', () => {
  describe('boot', () => {
    it('resolves dependencies in correct order', async () => {
      const container = new ServiceContainer();

      await container.boot({
        a: service((b, c) => `a ${b} ${c}`,['b', 'c']),
        b: service((c) => `b ${c}`, ['c']),
        c: service(() => `c`),
      })

      expect(container.get('a')).to.be.equal('a b c c');
      expect(container.get('b')).to.be.equal('b c');
      expect(container.get('c')).to.be.equal('c');
    })
    it('fails on circular dependency', async () => {
      const container = new ServiceContainer();

      const error = await assertRejected(() => {
        return container.boot({
          a: service((b, c) => 1,['b']),
          b: service((c) => 2, ['a']),
        })
      });

      expect(error).to.be.instanceof(Error);
    })
  })

  describe('inject', () => {
    it('should call the method with injected services', async () => {
      const container = new ServiceContainer();

      await container.boot({
        foo: service(() => 'bar'),
        baz: service(() => 'bazz'),
      })

      let called = false;

      container.inject({
        dependencies:['foo', 'baz'], 
        factory: (foo, baz) => {
          called = true;
          expect(foo).to.be.equal('bar')
          expect(baz).to.be.equal('bazz')
        }
      });

      expect(called).to.be.true;
    })
    it('should throw on invalid service', () => {
      const container = new ServiceContainer();

      let called = false;

      const throwingfn = () => container.inject({
        dependencies: ['foo', 'baz'],
        factory: (foo, baz) => {
          called = true;
        }
      });

      expect(throwingfn).to.throw;
      expect(called).to.be.false;
    })
  })
})
