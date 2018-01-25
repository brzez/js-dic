// @flow

import {describe, it} from 'mocha'
import {expect} from 'chai'

import ServiceRepository from '../../src/di/ServiceRepository'
import createService from '../createService'

const createRepo = () => {
  return new ServiceRepository([
    createService('foo', ['a']),
    createService('bar', ['a']),
    createService('baz', ['b']),
  ])
}

describe('ServiceRepository', () => {
  describe('findAlias', () => {

    it('finds service by name', () => {
      const sr = createRepo();
      const result = sr.findAlias('foo');

      expect(result).to.be.an('array');
      expect(result[0].name).to.equal('foo');
    });

    it('throws when service not found (via name)', () => {
      const sr = createRepo();
      expect(() => sr.findAlias('fodzo')).to.throw();
    });
  })

  describe('findTags', () => {
    it('finds tags', () => {
      const sr = createRepo();
      const result = sr.findTags('a');

      expect(result).to.be.an('array');
      expect(result).to.have.lengthOf(2);
    });
    it('returns empty array when no tags found', () => {
      const sr = createRepo();
      const result = sr.findTags('z');

      expect(result).to.be.an('array');
      expect(result).to.have.lengthOf(0);
    });
  })

  describe('findDependency', () => {
    it('resolves dependency based on type - service', () => {
      const sr = createRepo();
      const result = sr.findDependency({name: 'foo', type: 'service'});

      expect(result).to.be.an('array');
      expect(result[0].name).to.equal('foo');
    });
    it('resolves dependency based on type - tag', () => {
      const sr = createRepo();
      const result = sr.findDependency({name: 'a', type: 'tag'});

      expect(result).to.be.an('array');
      expect(result).to.have.lengthOf(2);
    });
  })
})
