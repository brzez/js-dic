// @flow

import {describe, it} from 'mocha'
import {expect} from 'chai'
import mockServiceDefinition from "../mock/mockServiceDefinition";
import {service, tag} from "../../src/helpers";
import {ServiceRepository} from "../../src/ServiceRepository/ServiceRepository";

describe('ServiceRepository', () => {
  it('resolves dependencies', () => {
    const fooService = mockServiceDefinition({name: 'foo'});
    const fooTag = mockServiceDefinition({tags: 'foo'});
    const sm = new ServiceRepository([fooService, fooTag]);

    expect(sm.resolveDependency(service('foo')).definition).to.be.deep.equal(fooService);
    expect(sm.resolveDependency(tag('foo')).map(s => s.definition)).to.be.deep.equal([fooTag]);

    expect(sm.resolveDependency(tag('does not exist'))).to.be.an('array').that.has.lengthOf(0);
  });

  it('throws when service doesnt exist', () => {
    const sm = new ServiceRepository([]);
    expect(() => sm.resolveService('foo')).to.throw(Error)
  })
});
