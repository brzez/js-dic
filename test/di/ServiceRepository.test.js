// @flow

import {describe, it} from 'mocha'
import {expect} from 'chai'

describe('ServiceRepository', () => {
  describe('findAlias', () => {
    it('finds service by name');
    it('throws when service not found (via name)');
  })

  describe('findTags', () => {
    it('finds tags');
    it('returns empty array when no tags found');
  })

  describe('findDependency', () => {
    it('resolves dependency based on type');
  })
})
