// @flow

import {describe, it} from 'mocha'
import {expect} from 'chai'

import Kernel from '../src/Kernel'
import ServiceContainer from '../src/di/ServiceContainer'
import Service from '../src/di/Service'
import assertRejected from './assertRejected'

describe('Kernel', () => {
  describe('boot', () => {
    it('cannot be booted more than once', async () => {
      const k = new Kernel({});
      await k.boot();
      await assertRejected(() => k.boot());
    })
    it('creates ServiceContainer', async () => {
      const k = new Kernel({});
      const sc = await k.boot();
      expect(sc).to.be.instanceof(ServiceContainer)
    })
  })
  describe('normalizeService', () => {
    const kernel = new Kernel({});
    it('normalizes single service definition', async () => {
      const s = kernel.normalizeService('foo', {
        factory: () => 1
      });

      expect(s).to.be.instanceof(Service);
      expect(s.name).to.be.equal('foo');
      expect(s.dependencies).to.be.an('array');
      expect(s.tags).to.be.an('array');
    })
    it('normalizes single service definition', async () => {
      const s = kernel.normalizeService('foo', () => 123);

      expect(s).to.be.instanceof(Service);
      expect(s.name).to.be.equal('foo');
      expect(s.dependencies).to.be.an('array');
      expect(s.tags).to.be.an('array');
      expect(s.factory()).to.be.equal(123);
    })
  })
});
