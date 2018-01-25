// @flow

import {describe, it} from 'mocha'
import {expect} from 'chai'

import DependencyInjector from '../../src/di/DependencyInjector'
import createService from '../createService'
import assertRejected from '../assertRejected'

describe('DependencyInjector', () => {
  describe('boot', () => {
    it('initializes all services', async () => {
      const di = new DependencyInjector([
        createService('foo', ['a']),
        createService('bar', ['a']),
        createService('baz', ['b']),
      ])

      const services = await di.boot();

      expect(services).to.be.an('array');
      expect(services).to.have.lengthOf(3);
      for (const service of services) {
        expect(service.isReady()).to.be.true;
      }
    });

    it('prevents circular dependencies', async () => {
      const di = new DependencyInjector([
        createService('a', [], () => 1, [{type: 'service', name: 'b'}]),
        createService('b', [], () => 1, [{type: 'service', name: 'a'}]),
      ])

      assertRejected(async () => await di.boot())
    });
  })
})
