// @flow

import {describe, it} from 'mocha'
import {expect} from 'chai'
import {toArray} from "../src/util";

describe('util', () => {
  describe('toArray', () => {
    it('creates an array if value is not array', () => {
      expect(toArray('e')).to.be.an('array').that.is.deep.equal(['e'])
    })
    it('returns array if array passed', () => {
      expect(toArray(['e'])).to.be.an('array').that.is.deep.equal(['e'])
    })
  })
});
