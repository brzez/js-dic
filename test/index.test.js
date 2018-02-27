// @flow

import {describe, it} from 'mocha'
import {expect} from 'chai'

import boot from '../src/index'
import {serviceReference, tagReference} from '../src/index'
import ServiceContainer from '../src/di/ServiceContainer'

describe('index', () => {
  describe('boot', () => {
    it('boots a service container', async () => {
      const sc = await boot({});
      expect(sc).to.be.instanceof(ServiceContainer);
    })
  });

  describe('serviceReference', () => {
    it('casts string to Dependency service', async () => {
      expect(serviceReference('foo')).to.be.deep.equal({name: 'foo', type: 'service'});
    })
  });
  describe('tagReference', () => {
    it('casts string to Dependency tag', async () => {
      expect(tagReference('bar')).to.be.deep.equal({name: 'bar', type: 'tag'});
    })
  });
});
