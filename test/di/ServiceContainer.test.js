// @flow

import {describe, it} from 'mocha'
import {expect} from 'chai'

import createService from '../createService'
import ServiceContainer from '../../src/di/ServiceContainer'

describe('ServiceContainer', () => {
  describe('boot', () => {
    // todo: chai spy
    it('boots via DependencyInjector');
  })
  describe('service', () => {
    it('finds and returns a single service', async () => {
      const sc = new ServiceContainer();

      await sc.boot([
        createService('a', [], () => 123),
        createService('b'),
      ]);

      expect(sc.service('a')).to.be.equal(123);
    });
  })
  describe('tags', () => {
    it('finds and returns an array of tags', async () => {
      const sc = new ServiceContainer();

      await sc.boot([
        createService('a', ['foo'], () => 123),
        createService('b'),
      ]);

      expect(sc.tags('foo')).to.be.an('array');
      expect(sc.tags('foo')).to.have.lengthOf(1)
    });
    it('returns empty array when no tags found', async () => {
      const sc = new ServiceContainer();

      await sc.boot([]);

      expect(sc.tags('bar')).to.be.an('array');
    });
  })
})
