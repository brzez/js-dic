// @flow

import {describe, it} from 'mocha'
import {expect} from 'chai'
import resolveBootOrder from "../src/resolveBootOrder";
import {service, tag} from "../src/helpers";
import mockService from "./mock/mockService";
import type {ServiceDefinition} from "../src/types/ServiceDefinition";
import {ServiceRepository} from "../src/ServiceRepository/ServiceRepository";
import Service from "../src/ServiceRepository/Service";

function repo (definitions: ServiceDefinition[]) {
  return new ServiceRepository(definitions);
}

function toDefinitions (s: Service[]) {
  return s.map(s => s.definition);
}

describe('resolveBootOrder', () => {
  describe('resolves order in which services should be booted', () => {
    it('fails when requiring self', () => {
      expect(() => resolveBootOrder(repo([
        mockService({name: 'a'}, service('a'))
      ]))).to.throw();
    });

    it('fails on circular dependency', () => {
      const fail = () => resolveBootOrder(repo([
        mockService({name: 'a'}, service('b')),
        mockService({name: 'b'}, service('c')),
        mockService({name: 'c'}, service('a')),
      ]));
      expect(fail).to.throw();
    });

    it('resolves dependencies in correct order', () => {
      const a = mockService({name: 'a'}, service('b'));
      const b = mockService({name: 'b'}, service('c'));
      const c = mockService({name: 'c'});

      const result = resolveBootOrder(repo([a, b, c]));
      expect(toDefinitions(result)).to.be.deep.equal([c, b, a]);
    });

    it('resolves islands', () => {
      const a = mockService({name: 'a'}, service('b'));
      const b = mockService({name: 'b'});
      const c = mockService({name: 'c'}, service('a'));

      const result = resolveBootOrder(repo([a, b, c]));
      expect(toDefinitions(result)).to.be.deep.equal([b, a, c]);
    });

    it('resolves tags', () => {
      const a = mockService({name: 'a'}, tag('b'));
      const tag_b1 = mockService({tags: 'b'});
      const tag_b2 = mockService({tags: 'b'});

      const result = resolveBootOrder(repo([tag_b2, a, tag_b1]));
      expect(toDefinitions(result)).to.be.deep.equal([tag_b2, tag_b1, a]);
    })
  })
});
