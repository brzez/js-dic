// @flow

import {describe, it} from 'mocha'
import {expect} from 'chai'
import Container from "../src/Container";
import {service} from "../src/helpers";

describe('Container', () => {
  it('stores booted services & tags', () => {
    const foo = service('foo');
    const c = new Container({
      resolveDependency (dep) {
        expect(dep).to.be.equal(foo);
        return {value: 1}
      }
    });

    expect(c.get(foo)).to.be.equal(1)
  })
});
