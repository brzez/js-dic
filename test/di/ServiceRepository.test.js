// @flow

import {describe, it} from 'mocha'
import {expect} from 'chai'

import ServiceRepository from '../../src/di/ServiceRepository'
import Service from '../../src/di/Service'

const service = (name, tags = [], factory = () => {}, dependencies = []) => new Service(name, tags, factory, dependencies);

describe('ServiceRepository', () => {
  describe('findAlias', () => {

    it('finds service by name', () => {
      const sr = new ServiceRepository([
        service('foo'),
        service('bar'),
      ]);
      const found = sr.findAlias('foo');

      expect(found).to.be.an('array');
      expect(found[0].name).to.equal('foo');
    });

    it('throws when service not found (via name)', () => {
      const sr = new ServiceRepository([]);
      expect(() => sr.findAlias('foo')).to.throw();
    });
  })

  describe('findTags', () => {
    it('finds tags', () => {
      const sr = new ServiceRepository([
        service('foo', ['a']),
        service('bar', ['a']),
        service('baz', ['b']),
      ]);

      const found = sr.findTags('a');

      expect(found).to.be.an('array');
      expect(found).to.have.lengthOf(2);
    });
    it('returns empty array when no tags found', () => {
      const sr = new ServiceRepository([
        service('foo', ['a']),
        service('bar', ['a']),
        service('baz', ['b']),
      ]);
      const found = sr.findTags('z');

      expect(found).to.be.an('array');
      expect(found).to.have.lengthOf(0);
    });
  })

  describe('findDependency', () => {
    it('resolves dependency based on type - service', () => {
      const sr = new ServiceRepository([
        service('foo', ['a']),
        service('bar', ['a']),
        service('baz', ['b']),
      ]);

      const result = sr.findDependency({name: 'foo', type: 'service'});

      expect(result).to.be.an('array');
      expect(result[0].name).to.equal('foo');
    });
    it('resolves dependency based on type - tag', () => {
      const sr = new ServiceRepository([
        service('foo', ['a']),
        service('bar', ['a']),
        service('baz', ['b']),
      ]);

      const result = sr.findDependency({name: 'a', type: 'tag'});

      expect(result).to.be.an('array');
      expect(result).to.have.lengthOf(2);
    });
  })
})
