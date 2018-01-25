// @flow

import {describe, it} from 'mocha'
import {expect} from 'chai'

describe('ServiceContainer', () => {
  describe('boot', () => {
    it('boots via DependencyInjector');
  })
  describe('service', () => {
    it('finds and returns a single service');
  })
  describe('tags', () => {
    it('finds and returns an array of tags');
    it('returns empty array when no tags found');
  })
})
