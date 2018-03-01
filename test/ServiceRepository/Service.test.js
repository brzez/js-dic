// @flow

import {describe, it} from 'mocha'
import {expect} from 'chai'
import mockServiceDefinition from "../mock/mockServiceDefinition";
import Service from "../../src/ServiceRepository/Service";

describe('Service', () => {
  describe('name', () => {
    it('resolves name from definition', () => {
      const s = new Service(mockServiceDefinition({name: 'foo'}));
      expect(s.name).to.be.equal('foo');
    });

    it('resolves name from definition - unnamed', () => {
      const s = new Service(mockServiceDefinition());
      expect(s.name).to.be.undefined;
    });
  });

  describe('tags', () => {
    it('resolves tags from definition', () => {
      const s = new Service(mockServiceDefinition({tags: 'foo'}));
      expect(s.tags).to.be.an('array').that.includes('foo');
    });

    it('resolves tags from definition - untagsd', () => {
      const s = new Service(mockServiceDefinition());
      expect(s.tags).to.be.an('array').that.has.lengthOf(0)
    });
  })
});
