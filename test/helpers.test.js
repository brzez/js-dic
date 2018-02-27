// @flow

import {describe, it} from 'mocha'
import {expect} from 'chai'
import {service, tag} from "../src/helpers";

describe('helpers', () => {
  describe('service', () => {
    it('converts a string to service dependency', () => {
      expect(service('foo')).to.be.deep.equal({type: 'service', name: 'foo'})
    })
  });

  describe('tag', () => {
    it('converts a string to tag dependency', () => {
      expect(tag('foo')).to.be.deep.equal({type: 'tag', name: 'foo'})
    })
  });
});
