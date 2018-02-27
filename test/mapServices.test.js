// @flow

import {describe, it} from 'mocha'
import {expect} from 'chai'
import mockService from "./mock/mockService";
import mapServices, {mapByName} from "../src/mapServices";

describe('mapServices', () => {
  describe('mapByName', () => {
    it('adds services to store by name', () => {
      const store = {};
      const service_foo = mockService({name: 'service_foo'});

      const result = mapByName(service_foo, store);

      expect(result).to.be.true;

      expect(store).to.have.key('service_foo');
      expect(store.service_foo).to.be.equal(service_foo);
    });
    it('returns false when name not found', () => {
      expect(mapByName(mockService({}), {})).to.be.false;
    })
    it('throws when duplicate value found', () => {
      const store = {foo: 1};
      expect(() => mapByName(mockService({name: 'foo'}), store)).to.throw(Error);
    })
  });

  it('resolves to proper object when no services provided', () => {
    const result = mapServices([]);
    expect(result).to.have.keys('services', 'tags', 'anonymous');
  });

  it('maps services via their registration type', () => {
    const service_foo = mockService({name: 'service_foo'});
    const service_bar = mockService({name: 'service_bar'});

    const tag_a = mockService({tags: 'tag_a'});
    const tag_a_2 = mockService({tags: 'tag_a'});
    const tag_b = mockService({tags: 'tag_b'});

    const anon = [mockService(), mockService()];


    const result = mapServices([
      service_foo, service_bar,
      tag_a, tag_a_2, tag_b,
      ...anon
    ]);

    expect(result.services.service_foo).to.be.equal(service_foo);
    expect(result.services.service_bar).to.be.equal(service_bar);

    expect(result.tags.tag_a).to.be.an('array').that.includes(tag_a);
    expect(result.tags.tag_a).to.be.an('array').that.includes(tag_a_2);

    expect(result.tags.tag_b).to.be.an('array').that.includes(tag_b);

    expect(result.anonymous).to.be.deep.equal(anon);
  })
});
