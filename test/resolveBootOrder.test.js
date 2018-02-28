// @flow

import {describe, it} from 'mocha'
import {expect} from 'chai'
import resolveBootOrder from "../src/resolveBootOrder";
import {service} from "../src/helpers";
import mockService from "./mock/mockService";


describe('resolveBootOrder', () => {
  describe('resolves order in which services should be booted', () => {
    it('fails when requiring self', () => {
      expect(() => resolveBootOrder([
        mockService({name: 'a'}, service('a'))
      ])).to.throw();
    });

    it('fails on circular dependency', () => {
      const fail = () => resolveBootOrder([
        mockService({name: 'a'}, service('b')),
        mockService({name: 'b'}, service('c')),
        mockService({name: 'c'}, service('a')),
      ]);
      expect(fail).to.throw();
    });

    it('resolves dependencies in correct order', () => {
      const a = mockService({name: 'a'}, service('b'));
      const b = mockService({name: 'b'}, service('c'));
      const c = mockService({name: 'c'});

      const result = resolveBootOrder([a, b, c]);
      expect(result).to.have.members([c, b, a]);
    });

    it('resolves islands', () => {
      const a = mockService({name: 'a'}, service('b'));
      const b = mockService({name: 'b'});
      const c = mockService({name: 'c'}, service('a'));

      const result = resolveBootOrder([a, b, c]);
      expect(result).to.have.members([c, b, a]);
    })
  })
});
