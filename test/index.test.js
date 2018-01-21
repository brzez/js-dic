// @flow

import {describe, it} from 'mocha'
import {expect} from 'chai'
import assertRejected from './assertRejected'

import boot from '../src/index'

/*
  usage:

  boot({
    // will be normalized to Bootable
    service_1: (Bootable.factory) () => 123, 
    service_2: (Bootable) {
      factory,
      dependencies
    },
  })
  
  validating service registration:
    typeof s === function -> is a factory
    typeof s === object && s.factory === func -> Bootable
      s.dependencies - optional; set to []

 */

describe('index', () => {
  describe('boot', async () => {
    const container = await boot({
      service_a: () => 'service_a',
      service_b: {
        factory: (service_c) => 1337 + service_c,
        dependencies: ['service_c']
      },
      service_c: () => 3
    });


    expect(container.get('service_a')).to.be.equal('service_a');
    expect(container.get('service_b')).to.be.equal(1337 + 3);
    expect(container.get('service_c')).to.be.equal(3);
  })
})
