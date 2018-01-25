// @flow

import {describe, it} from 'mocha'
import {expect} from 'chai'

import assertRejected from './assertRejected'
import ServiceContainer from '../src/ServiceContainer'
import Service from '../src/ServiceContainer/Service'

const service = (name: any, factory: any, dependencies: any = [], tags: any = []) => {
  return new Service(name, tags, factory, dependencies);
}

const dependency = (name: string, type: string = 'service') => {
  return ({name, type});
}

describe('ServiceContainer', () => {
  describe('getters', () => {
    describe('service', () => {
      it('gets a (single) service by name', async () => {
        const c = new ServiceContainer();
        await c.boot([
          service('a', () => 222)
        ]);

        expect(c.service('a')).to.be.equal(222);
      });
      it('throws when service doesnt exist', async () => {
        const c = new ServiceContainer();
        await c.boot([]);

        expect(() => c.service('a')).to.throw(Error);
      });
    })
    describe('tags', () => {
      it('gets an array of tagged services', async () => {
        const c = new ServiceContainer();
        await c.boot([
          service('a', () => 222, [], ['foo']),
          service('b', () => 333, [], ['foo'])
        ])

        expect(c.tags('foo')).to.be.an('array');
        expect(c.tags('foo')).to.have.lengthOf(2);
        expect(c.tags('foo')).to.include(222);
        expect(c.tags('foo')).to.include(333);
      });
      it('returns empty array when no tags found', async () => {
        const c = new ServiceContainer();
        await c.boot([]);

        expect(c.tags('foo')).to.be.an('array');
        expect(c.tags('foo')).to.have.lengthOf(0);
      });
    })
  })

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

      expect(container.service('foobarbaz')).to.be.equal('foo/bar/baz');
    });

    it('resolves tagged services', async () => {
      const container = new ServiceContainer();

      await container.boot([
        service('foobarbaz', (group_a, group_b) => {
          expect(group_a).to.be.an('array');
          expect(group_a).to.have.lengthOf(2);

          expect(group_b).to.be.an('array');
          expect(group_b).to.have.lengthOf(1);

          return [group_a.join('/'), group_b.join('/')]
        }, [
          dependency('group_a', 'tag'),
          dependency('group_b', 'tag')
        ]),
        service('foo', () => 'foo', [], ['group_a']),
        service('bar', () => 'bar', [], ['group_a']),
        service('baz', () => 'baz', [], ['group_b']),
      ])

      const foobarbaz = container.service('foobarbaz');

      expect(foobarbaz).to.be.an('array');
      expect(foobarbaz[0]).to.be.equal('foo/bar');
      expect(foobarbaz[1]).to.be.equal('baz');
    });

    it('throws on non-existent dependency', async () => {
      const container = new ServiceContainer();
      
      const error = await assertRejected(async () => await container.boot([
        service('foo', () => 1, [dependency('non existent dependency')])
      ]))

      expect(error).to.be.instanceof(Error);
    });
    
    it('does not throw on empty tags', async () => {
      const container = new ServiceContainer();
      
      await container.boot([
        service('foo', (a) => a, [dependency('a', 'tag')])
      ])

      const foo = container.service('foo');
      expect(foo).to.be.an('array');
      expect(foo).to.have.lengthOf(0);
    });

    it('throws on circular dependency', async () => {
      const container = new ServiceContainer();
      
      const error = await assertRejected(async () => await container.boot([
        service('a', () => 1, dependency('b')),
        service('b', () => 1, dependency('a')),
      ]))

      expect(error).to.be.instanceof(Error);

    });
  })
})
