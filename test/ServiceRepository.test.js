// @flow

import {describe, it} from 'mocha'
import {expect} from 'chai'
import mockService from "./mock/mockService";
import {ServiceMap} from "../src/ServiceMap";
import {service, tag} from "../src/helpers";

describe('ServiceRepository', () => {
  it('resolves dependencies', () => {
    const fooService = mockService({name: 'foo'});
    const fooTag = mockService({tags: 'foo'});
    const sm = new ServiceMap({
        foo: fooService
      },
      {
        foo: [fooTag]
      }, []);

    expect(sm.resolveDependency(service('foo'))).to.be.deep.equal([fooService]);
    expect(sm.resolveDependency(tag('foo'))).to.be.deep.equal([fooTag]);

    expect(sm.resolveDependency(tag('does not exist'))).to.be.an('array').that.has.lengthOf(0);
  });

  it('throws when service doesnt exist', () => {
    const sm = new ServiceMap({}, {}, []);
    expect(() => sm.resolveService('foo')).to.throw(Error)
  })
});
