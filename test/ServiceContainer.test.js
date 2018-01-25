// @flow

import {describe, it} from 'mocha'
import {expect} from 'chai'

import assertRejected from './assertRejected'
import ServiceContainer from '../src/ServiceContainer'
import {Service} from '../src/ServiceContainer'

const service = (name: any, factory: any, dependencies: any = [], tags: any = []) => {
  return new Service(name, tags, factory, dependencies);
}

const dependency = (name: string, type: string = 'service') => {
  return ({name, type});
}

describe('ServiceContainer', () => {
  describe('boot', () => {
    it('resolves dependencies in correct order', async () => {
      const container = new ServiceContainer();

      await container.boot([
        service('foobarbaz', (foo, bar, baz) => [foo, bar, baz].join('/'), [
          dependency('foo'),
          dependency('bar'),
          dependency('baz')
        ]),
        service('foo', () => 'foo'),
        service('bar', () => 'bar'),
        service('baz', () => 'baz'),
      ])

      expect(container.services.get('foobarbaz').value).to.be.equal('foo/bar/baz');
    })
    // todo:
    it('throws on non-existent dependency');

    it('supports tags on bootable', async () => {
      const container = new ServiceContainer();
      // todo: support objects
      // 'dep name' -> shorthand for {dependency: 'dep name'}
      // {tag: 'tag name'}
      // tags should be passed in as []
      // should default to empty []
      
      await container.boot({
        a: service((middlewares) => middlewares, [{tag: 'middleware'}]),
        config: service(() => ({foo: 'bar'})),
        middleware_a: service(() => 'middleware_a', ['config'], ['middleware']), 
        middleware_b: service(() => 'middleware_b', ['config'], ['middleware']), 
        middleware_c: service(() => 'middleware_c', ['config'], ['middleware']),
      })

      expect(container.get('a')).to.include('middleware_a')
      expect(container.get('a')).to.include('middleware_b')
      expect(container.get('a')).to.include('middleware_c')
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
