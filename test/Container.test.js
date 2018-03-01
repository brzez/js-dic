// @flow

import {describe, it} from 'mocha'
import {expect} from 'chai'
import Container from "../src/Container";
import {service} from "../src/helpers";

describe('Container', () => {
  describe('get', () => {
    it('returns services & tags', () => {
      const foo = service('foo');
      const c = new Container({
        resolveDependency (dep) {
          expect(dep).to.be.equal(foo);
          return {value: 1}
        }
      });

      expect(c.get(foo)).to.be.equal(1)
    })
  })

  describe('inject', () => {
    it('injects resolved services into Injectable', () => {
      const foo = service('foo');
      const c = new Container({
        resolveDependency (dep) {
          return {value: dep.name}
        }
      });

      const result = c.inject({
        factory (foo, bar) {
          return foo + bar;
        },
        dependencies: [service('foo'), service('bar')],
      });

      expect(result).to.be.equal('foobar');
    })
  })
});
